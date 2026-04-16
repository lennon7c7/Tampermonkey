// 在浏览器控制台运行此代码来测试 API
// 1. 打开 https://tcnvs1zw0mbh.feishu.cn
// 2. F12 打开控制台
// 3. 粘贴此代码运行

const feishuUrl = 'https://tcnvs1zw0mbh.feishu.cn';

// 获取 csrf_token
function getCsrfToken() {
    const name = 'csrf_token=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

// 查询邮箱
async function queryEmail(domain) {
    const request_time_id = '_t' + Date.now();
    const body = JSON.stringify({
        search_word: domain,
        page: 1,
        page_size: 20,
        request_time_id: request_time_id
    });

    try {
        const response = await fetch(feishuUrl + '/suite/admin/shared_email/get_shared_emails_v2', {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json;charset=UTF-8',
                'x-csrf-token': getCsrfToken(),
            },
            body: body,
            credentials: 'include'
        });

        const result = await response.json();
        console.log(`${domain}:`, result);

        if (result.code === 0 && result.data) {
            console.log(`总记录数: ${result.data.total}`);
            if (result.data.list && result.data.list.length > 0) {
                result.data.list.forEach(item => {
                    console.log(`邮箱: ${item.email}`);
                });
            } else {
                console.log('未找到邮箱');
            }
        } else {
            console.log(`错误: ${result.code} - ${result.message}`);
        }
    } catch (error) {
        console.error(`请求失败: ${error}`);
    }
}

// 测试查询
console.log('=== 查询 sinnriket.com ===');
await queryEmail('sinnriket.com');

console.log('\n=== 查询 wifcyme.com ===');
await queryEmail('wifcyme.com');

// 显示当前 cookie
console.log('\n=== 当前 Cookie 中的 csrf_token ===');
console.log('_csrf_token:', document.cookie.split(';').find(c => c.includes('_csrf_token')));
console.log('csrf_token:', document.cookie.split(';').find(c => c.match(/\bcross_origin_csrf_token=|csrf_token=/)));
