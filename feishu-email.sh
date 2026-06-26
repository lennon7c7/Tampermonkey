#!/bin/bash

# 飞书邮箱批量创建脚本
# 从 feishu-email.user.js 转换而来
# 不能直接使用 document.cookie，出来的是缺少信息的不完整的
# FEISHU_COOKIE='xxxxxx' ./feishu-email.sh silkkaze.com marbreeze.com florweave.com

set -e

# 检查 jq 是否安装
if ! command -v jq &> /dev/null; then
    echo "错误: 需要安装 jq 来解析 JSON"
    echo "安装: yum install -y jq  或  apt install -y jq"
    exit 1
fi

FEISHU_URL="https://tcnvs1zw0mbh.feishu.cn"
CFFS_URL=""
COOKIE_FILE="/tmp/feishu_cookie_$$.txt"

# 清理临时文件
cleanup() {
    rm -f "$COOKIE_FILE"
}
trap cleanup EXIT

# 用户ID列表（用于创建邮箱时添加成员）
USERS='["7554950945455489052", "7554959639437934595", "7581428165948574906"]'

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 从 Cookie 中提取 csrf_token
extract_csrf_token() {
    if [ -z "$FEISHU_COOKIE" ]; then
        echo ""
        return
    fi
    # 仅提取 csrf_token，避免误匹配 swp_csrf_token
    echo "$FEISHU_COOKIE" | tr ';' '\n' | sed -n 's/^[[:space:]]*csrf_token=\(.*\)$/\1/p' | head -n 1
}

CSRF_TOKEN=""

# 生成请求时间ID
generate_request_time_id() {
    echo "_t$(date +%s)000"
}

# 通用函数：发送API请求
feishu_api() {
    local endpoint="$1"
    local body="$2"
    local description="$3"

    echo -e "${YELLOW}→ $description${NC}" >&2

    local curl_args=(
        -s -X POST "${FEISHU_URL}${endpoint}"
        -H "accept: application/json, text/plain, */*"
        -H "accept-language: en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7"
        -H "cache-control: no-cache"
        -H "pragma: no-cache"
        -H "priority: u=1, i"
        -H "content-type: application/json;charset=UTF-8"
        -H "credentials: same-origin"
        -H "origin: ${FEISHU_URL}"
        -H "referer: ${FEISHU_URL}/admin/email/accountManagement/sharedEmail"
        -H "rpc-persist-lane-c-lark-uid: 0"
        -H "sec-ch-ua: \"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\""
        -H "sec-ch-ua-mobile: ?0"
        -H "sec-ch-ua-platform: \"Windows\""
        -H "sec-fetch-dest: empty"
        -H "sec-fetch-mode: cors"
        -H "sec-fetch-site: same-origin"
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
        -H "x-requested-with: XMLHttpRequest"
        -H "x-csrf-token: ${CSRF_TOKEN}"
        -H "x-lgw-app-id: 1161"
        -H "x-lgw-os-type: 1"
        -H "x-lgw-terminal-type: 2"
        -H "x-lsc-bizid: 13"
        -H "x-lsc-terminal: web"
        -H "x-lsc-version: 1"
        -H "x-request-version: v2"
        -H "x-timezone-offset: -480"
        -H "device-platform: TerminalType_WEB"
        -H "x-admin-user: 7554950945455489052"
        -d "$body"
    )

    if [ -n "$FEISHU_COOKIE" ]; then
        curl_args+=(-b "$FEISHU_COOKIE")
    fi

    local response
    response=$(curl "${curl_args[@]}" 2>&1)
    local curl_code=$?
    if [ $curl_code -ne 0 ]; then
        echo "{\"code\":\"CURL_ERROR\",\"message\":\"$response\"}"
        return 0
    fi
    echo "$response"
}

# Step 1: 创建域名
step1_create_domain() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"domain_name\":\"${domain}\",\"setup_type\":1,\"setup_domain_type\":1,\"request_time_id\":\"${request_time_id}\"}"

    local result=$(feishu_api "/suite/admin/domain/gaia_create_primary_domain" "$body" "创建域名: $domain")
    echo "$result"
}

# Step 2: 获取验证码（TXT记录）
step1_get_verify() {
    local domain="$1"
    local body="{\"domain\":\"${domain}\"}"

    local result=$(feishu_api "/suite/admin/domain/get_verify_code" "$body" "获取验证码: $domain")
    echo "$result"
}

# 判断飞书接口是否成功（code=0）
is_feishu_success() {
    local json="$1"
    local code
    code=$(echo "$json" | jq -r '.code // empty' 2>/dev/null)
    [ "$code" = "0" ]
}

# 打印飞书接口错误详情，便于排查
print_feishu_error() {
    local action="$1"
    local json="$2"
    local code msg
    code=$(echo "$json" | jq -r '.code // "unknown"' 2>/dev/null)
    msg=$(echo "$json" | jq -r '.message // .msg // "unknown error"' 2>/dev/null)
    if [ -z "$json" ]; then
        echo -e "  ${RED}${action}失败: 空响应${NC}"
        return
    fi
    echo -e "  ${RED}${action}失败: code=${code}, message=${msg}${NC}"
    echo -e "  ${YELLOW}接口返回: $json${NC}"
}

# Step 1.5: 调用外部接口自动添加 TXT 记录
step1_submit_txt() {
    local domain="$1"
    local txt="$2"

    echo -e "${YELLOW}→ 提交 TXT 到外部接口: ${domain}${NC}" >&2
    echo -e "  ${YELLOW}TXT 提交参数: domain=${domain}, txt=${txt}${NC}" >&2

    curl -s --insecure "${CFFS_URL}" \
        -H "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7" \
        -H "accept-language: en,zh-CN;q=0.9,zh;q=0.8" \
        -H "cache-control: max-age=0" \
        -H "connection: keep-alive" \
        -H "content-type: application/x-www-form-urlencoded" \
        -H "origin: http://45.77.169.228" \
        -H "referer: http://45.77.169.228/bbak/cffsmail.php" \
        -H "upgrade-insecure-requests: 1" \
        -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36" \
        --data-urlencode "domain=${domain}" \
        --data-urlencode "txt=${txt}"
}

# Step 3: 验证域名所有权
step2_verify() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"domain_name\":\"${domain}\",\"request_time_id\":\"${request_time_id}\"}"
    echo -e "  ${YELLOW}验证参数: $body${NC}" >&2

    local result=$(feishu_api "/suite/admin/email/verify/gaia_verify_ownership" "$body" "验证域名: $domain")
    echo "$result"
}

# Step 4: 创建共享邮箱
step3_create_email() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"name\":\"support\",\"prefix\":\"support\",\"domain\":\"${domain}\",\"users\":${USERS},\"request_time_id\":\"${request_time_id}\"}"
    echo -e "  ${YELLOW}创建邮箱参数: $body${NC}" >&2

    local result=$(feishu_api "/suite/admin/shared_email/create_shared_email_v2" "$body" "创建邮箱: support@${domain}")
    echo "$result"
}

# Step 5: 获取创建的邮箱
step4_get_email() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"search_word\":\"${domain}\",\"page\":1,\"page_size\":20,\"request_time_id\":\"${request_time_id}\"}"

    local result=$(feishu_api "/suite/admin/shared_email/get_shared_emails_v2" "$body" "查询邮箱: $domain")
    echo "$result"
}

# 从JSON中提取字段 (使用jq)
json_extract() {
    local json="$1"
    local key="$2"
    echo "$json" | jq -r ".data.${key} // empty" 2>/dev/null || echo ""
}

# 从JSON中提取嵌套字段
json_extract_nested() {
    local json="$1"
    local path="$2"
    echo "$json" | jq -r "$path // empty" 2>/dev/null || echo ""
}

# 检查登录状态
check_login() {
    local request_time_id=$(generate_request_time_id)
    local body="{\"search_word\":\"test\",\"page\":1,\"page_size\":1,\"request_time_id\":\"${request_time_id}\"}"
    local test_result=$(feishu_api "/suite/admin/shared_email/get_shared_emails_v2" "$body" "检查登录状态")
    local code=$(echo "$test_result" | jq -r '.code // 0' 2>/dev/null)

    if [ "$code" = "10003" ] || [ "$code" = "10009" ]; then
        local msg=$(echo "$test_result" | jq -r '.message // .msg // "unknown error"' 2>/dev/null)
        echo -e "${RED}登录校验失败(code=${code}): ${msg}${NC}"
        echo -e "${YELLOW}提示: 这通常不是纯 Cookie 过期，也可能是请求头不完整或 csrf_token 不匹配${NC}"
        return 1
    fi
    return 0
}

# 仅查询邮箱（用于测试）
query_emails_only() {
    echo -e "${GREEN}━━━ 查询邮箱 ━━━${NC}"

    if [ -z "$FEISHU_COOKIE" ]; then
        echo -e "${RED}错误: 请设置 FEISHU_COOKIE 环境变量${NC}"
        return 1
    fi

    check_login || return 1

    for domain in "$@"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step4_get_email "$domain")

        # 检查是否是错误响应
        local code=$(echo "$result" | jq -r '.code // empty' 2>/dev/null)
        if [ "$code" = "10003" ] || [ "$code" = "10009" ]; then
            local msg=$(echo "$result" | jq -r '.msg // empty' 2>/dev/null)
            echo -e "$domain: ${RED}登录失效: $msg${NC}"
            continue
        fi

        # 使用jq提取邮箱列表
        local total=$(echo "$result" | jq -r '.data.total // 0' 2>/dev/null)
        if ! [[ "$total" =~ ^[0-9]+$ ]]; then
            total=0
        fi
        echo -e "$domain: ${YELLOW}总记录数: $total${NC}"

        if [ "$total" -gt 0 ]; then
            echo "$result" | jq -r '.data.list[]?.email' 2>/dev/null | while read -r email; do
                if [ -n "$email" ]; then
                    echo -e "  ${GREEN}✓ $email${NC}"
                fi
            done
        else
            echo -e "  ${RED}未找到邮箱${NC}"
        fi
    done
}

# 主函数
main() {
    # 检查 Cookie
    if [ -z "$FEISHU_COOKIE" ]; then
        echo -e "${RED}错误: 请设置 FEISHU_COOKIE 环境变量${NC}"
        echo ""
        echo -e "${BLUE}使用方法：${NC}"
        echo "1. 打开浏览器，登录飞书: $FEISHU_URL"
        echo "2. 打开开发者工具 (F12) -> Network"
        echo "3. 刷新页面，点击任意请求"
        echo "4. 复制 Request Headers 中的完整 Cookie"
        echo "5. 运行: FEISHU_COOKIE='xxx' $0 domain1.com domain2.com"
        echo ""
        echo -e "${BLUE}或者使用配置文件：${NC}"
        echo "1. 创建 ~/.feishu_cookie 文件，内容为你的 Cookie"
        echo "2. 运行: $0 domain1.com domain2.com"
        echo ""
        exit 1
    fi

    # 从参数或环境变量获取域名列表
    if [ -n "$1" ]; then
        DOMAINS=("$@")
    elif [ -n "$FEISHU_DOMAINS" ]; then
        IFS=',' read -ra DOMAINS <<< "$FEISHU_DOMAINS"
    else
        # 默认测试域名
        DOMAINS=("sinnriket.com" "wifcyme.com")
    fi

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}飞书邮箱批量创建脚本${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo -e "域名列表: ${DOMAINS[*]}"
    echo ""

    # 检查登录状态
    check_login || exit 1

    # 存储TXT验证记录
    declare -A VERIFY_CODES

    # Step 1: 创建域名
    echo -e "${GREEN}━━━ Step 1: 创建域名 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        echo -e "${YELLOW}处理域名: $domain${NC}"
        result=$(step1_create_domain "$domain")
        if ! is_feishu_success "$result"; then
            print_feishu_error "创建域名" "$result"
        fi

        # 使用jq提取验证码
        code=$(echo "$result" | jq -r '.data.code // .data.verify_code // .data.txt // empty' 2>/dev/null)

        VERIFY_CODES[$domain]="$code"
        echo -e "验证码: ${GREEN}$code${NC}"
        if [ -z "$code" ]; then
            echo -e "  ${YELLOW}提示: 创建域名返回中未找到验证码字段${NC}"
            echo -e "  ${YELLOW}接口返回: $result${NC}"
        fi
        echo ""
    done

    # Step 1.5: 通过飞书接口获取 TXT 记录并推送到外部服务
    echo -e "${GREEN}━━━ Step 1.5: 获取并提交 TXT 记录 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        verify_result=$(step1_get_verify "$domain")
        if ! is_feishu_success "$verify_result"; then
            print_feishu_error "获取验证码" "$verify_result"
        fi

        # 兼容不同返回字段，优先使用 get_verify_code 的值
        txt_code=$(echo "$verify_result" | jq -r '.data.code // .data.verify_code // .data.txt // empty' 2>/dev/null)
        if [ -z "$txt_code" ] || [ "$txt_code" = "null" ]; then
            # 回退到创建域名时返回的验证码
            txt_code="${VERIFY_CODES[$domain]}"
        fi

        # 外部接口仅需要 "=" 后的后缀值
        if [[ "$txt_code" == *"="* ]]; then
            txt_code="${txt_code#*=}"
        fi

        if [ -z "$txt_code" ]; then
            echo -e "$domain: ${RED}未获取到 TXT 记录，跳过外部提交${NC}"
            echo -e "  ${YELLOW}调试: $verify_result${NC}"
            continue
        fi

        submit_result=$(step1_submit_txt "$domain" "$txt_code")
        echo -e "  ${YELLOW}TXT 接口返回: $submit_result${NC}"
        submit_status=$(echo "$submit_result" | jq -r '.status // empty' 2>/dev/null)
        if [ "$submit_status" = "success" ]; then
            echo -e "$domain: ${GREEN}TXT 提交成功${NC} (${txt_code})"
        else
            echo -e "$domain: ${RED}TXT 提交失败${NC}"
            echo -e "  ${YELLOW}返回: $submit_result${NC}"
        fi
    done
    echo ""
    echo -e "${YELLOW}等待60秒让 DNS 记录生效后继续验证...${NC}"
    sleep 60

    # Step 2: 验证域名
    echo -e "${GREEN}━━━ Step 2: 验证域名 ━━━${NC}"
    local verify_failed=0
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step2_verify "$domain")
        if ! is_feishu_success "$result"; then
            print_feishu_error "验证域名" "$result"
            verify_failed=1
        fi

        # 使用jq提取is_verified
        is_verified=$(echo "$result" | jq -r '.data.is_verified // false' 2>/dev/null)

        echo -e "$domain: ${GREEN}is_verified=$is_verified${NC}"
        if [ "$is_verified" != "true" ]; then
            verify_failed=1
            echo -e "  ${YELLOW}提示: 域名尚未验证通过，后续创建邮箱会失败${NC}"
        fi
        echo ""
    done

    if [ $verify_failed -ne 0 ]; then
        echo -e "${RED}Step 2 未全部通过，流程中断。${NC}"
        echo -e "${YELLOW}排查建议:${NC}"
        echo -e "1) 检查 TXT 是否已在权威 DNS 生效（可能需要 5-30 分钟）"
        echo -e "2) 核对 TXT 值是否完整且无多余空格"
        echo -e "3) 稍后重试: $0 --query ${DOMAINS[*]}"
        exit 1
    fi

    # Step 3: 创建邮箱
    echo -e "${GREEN}━━━ Step 3: 创建共享邮箱 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step3_create_email "$domain")

        # 检查创建结果
        local code=$(echo "$result" | jq -r '.code // 0' 2>/dev/null)
        if [ "$code" = "0" ]; then
            created_email=$(echo "$result" | jq -r '.data.email // .data.account // empty' 2>/dev/null)
            if [ -n "$created_email" ]; then
                echo -e "$domain: ${GREEN}邮箱创建成功${NC} (${created_email})"
            else
                echo -e "$domain: ${GREEN}邮箱创建成功${NC}"
            fi
        else
            local msg=$(echo "$result" | jq -r '.message // .msg // "unknown error"' 2>/dev/null)
            echo -e "$domain: ${RED}创建失败: $msg${NC}"
            echo -e "  ${YELLOW}接口返回: $result${NC}"
        fi
        echo ""
    done

    # 等待邮箱创建完成
    echo -e "${YELLOW}等待2秒后查询...${NC}"
    sleep 2

    # Step 4: 获取创建的邮箱
    echo -e "${GREEN}━━━ Step 4: 查询邮箱 ━━━${NC}"
    declare -A CREATED_EMAILS
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step4_get_email "$domain")

        # 使用jq提取email字段
        email=$(echo "$result" | jq -r '.data.list[0].email // empty' 2>/dev/null | tr -d ' ')

        if [ -n "$email" ] && [ "$email" != "null" ]; then
            CREATED_EMAILS[$domain]="$email"
            echo -e "$domain: ${GREEN}$email${NC}"
        else
            echo -e "$domain: ${RED}未找到邮箱${NC}"
            # 显示完整响应用于调试
            echo -e "  ${YELLOW}调试: $result${NC}"
        fi
        echo ""
    done

    # 最终结果
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}完成！已创建以下邮箱：${NC}"
    echo -e "${GREEN}========================================${NC}"
    for domain in "${!CREATED_EMAILS[@]}"; do
        echo -e "$domain: ${GREEN}${CREATED_EMAILS[$domain]}${NC}"
    done
}

# 加载 Cookie 配置文件
if [ -f ~/.feishu_cookie ] && [ -z "$FEISHU_COOKIE" ]; then
    FEISHU_COOKIE=$(cat ~/.feishu_cookie | tr -d '\r\n')
fi

# 在所有 Cookie 来源都加载完成后再计算 CSRF，避免先计算为空
CSRF_TOKEN="${FEISHU_CSRF_TOKEN:-$(extract_csrf_token)}"

# 运行主函数
# 支持两种模式：
# 1. 完整模式: ./script.sh domain1.com domain2.com
# 2. 仅查询模式: ./script.sh --query domain1.com domain2.com

if [ "$1" = "--query" ]; then
    shift
    query_emails_only "$@"
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "飞书邮箱批量创建脚本"
    echo ""
    echo "用法:"
    echo "  $0 [选项] [域名...]"
    echo ""
    echo "选项:"
    echo "  --query DOMAIN...   仅查询邮箱"
    echo "  --help              显示帮助"
    echo ""
    echo "环境变量:"
    echo "  FEISHU_COOKIE       飞书登录 Cookie"
    echo "  FEISHU_DOMAINS      逗号分隔的域名列表"
    echo ""
    echo "配置文件:"
    echo "  ~/.feishu_cookie    存放 Cookie 的文件"
    echo ""
    echo "示例:"
    echo "  FEISHU_COOKIE='xxx' $0 sinnriket.com wifcyme.com"
    echo "  $0 --query sinnriket.com wifcyme.com"
else
    main "$@"
fi
