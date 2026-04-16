#!/bin/bash

# 飞书邮箱批量创建脚本
# 从 feishu-email.user.js 转换而来

set -e

# 检查 jq 是否安装
if ! command -v jq &> /dev/null; then
    echo "错误: 需要安装 jq 来解析 JSON"
    echo "安装: yum install -y jq  或  apt install -y jq"
    exit 1
fi

FEISHU_URL="https://tcnvs1zw0mbh.feishu.cn"
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
    echo "$FEISHU_COOKIE" | grep -o 'csrf_token=[^;]*' | cut -d'=' -f2
}

CSRF_TOKEN="${FEISHU_CSRF_TOKEN:-$(extract_csrf_token)}"

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
        -H "content-type: application/json;charset=UTF-8"
        -H "x-csrf-token: ${CSRF_TOKEN}"
        -H "x-lgw-app-id: 1161"
        -H "x-request-version: v2"
        -H "device-platform: TerminalType_WEB"
        -H "x-admin-user: 7554950945455489052"
        -d "$body"
    )

    if [ -n "$FEISHU_COOKIE" ]; then
        curl_args+=(-b "$FEISHU_COOKIE")
    fi

    curl "${curl_args[@]}"
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

# Step 3: 验证域名所有权
step2_verify() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"domain_name\":\"${domain}\",\"request_time_id\":\"${request_time_id}\"}"

    local result=$(feishu_api "/suite/admin/email/verify/gaia_verify_ownership" "$body" "验证域名: $domain")
    echo "$result"
}

# Step 4: 创建共享邮箱
step3_create_email() {
    local domain="$1"
    local request_time_id=$(generate_request_time_id)
    local body="{\"name\":\"support\",\"prefix\":\"support\",\"domain\":\"${domain}\",\"users\":${USERS},\"request_time_id\":\"${request_time_id}\"}"

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
    local test_result=$(feishu_api "/suite/admin/shared_email/get_shared_emails_v2" '{"search_word":"test","page":1,"page_size":1,"request_time_id":"_t1"}' "检查登录状态")
    local code=$(echo "$test_result" | jq -r '.code // 0' 2>/dev/null)

    if [ "$code" = "10003" ] || [ "$code" = "10009" ]; then
        echo -e "${RED}登录已失效，请重新获取 Cookie${NC}"
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

        # 使用jq提取验证码
        code=$(echo "$result" | jq -r '.data.code // empty' 2>/dev/null)

        VERIFY_CODES[$domain]="$code"
        echo -e "验证码: ${GREEN}$code${NC}"
        echo ""
    done

    # 显示TXT记录提示
    echo -e "${YELLOW}━━━ 请添加以下TXT记录 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        echo -e "$domain: ${GREEN}${VERIFY_CODES[$domain]}${NC}"
    done
    echo ""
    echo -e "${YELLOW}等待3秒后继续验证...${NC}"
    sleep 3

    # Step 2: 验证域名
    echo -e "${GREEN}━━━ Step 2: 验证域名 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step2_verify "$domain")

        # 使用jq提取is_verified
        is_verified=$(echo "$result" | jq -r '.data.is_verified // false' 2>/dev/null)

        echo -e "$domain: ${GREEN}is_verified=$is_verified${NC}"
        echo ""
    done

    # Step 3: 创建邮箱
    echo -e "${GREEN}━━━ Step 3: 创建共享邮箱 ━━━${NC}"
    for domain in "${DOMAINS[@]}"; do
        domain=$(echo "$domain" | sed 's|https://||' | sed 's|/$||')
        result=$(step3_create_email "$domain")

        # 检查创建结果
        local code=$(echo "$result" | jq -r '.code // 0' 2>/dev/null)
        if [ "$code" = "0" ]; then
            echo -e "$domain: ${GREEN}邮箱创建成功${NC}"
        else
            local msg=$(echo "$result" | jq -r '.msg // empty' 2>/dev/null)
            echo -e "$domain: ${RED}创建失败: $msg${NC}"
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
    FEISHU_COOKIE=$(cat ~/.feishu_cookie | tr -d '\n')
fi

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
