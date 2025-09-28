// ==UserScript==
// @name         feishu email remove
// @version      1.0
// @description  fix something or make some operations fast
// @author       lennonandjune@gmail.com
// @match        https://ha4rxhcsndn.feishu.cn/admin/email/accountManagement/sharedEmail
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

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

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 通用重试逻辑
const fetchWithRetry = async (func, email, respData, retries = 2, delayTime = 2000) => {
    let attempt = 0;
    while (attempt < retries) {
        try {
            await func(email, respData);
            return true;
        } catch (error) {
            attempt++;
            console.error(`Error on attempt ${attempt} for ${email}: ${error}`);
            if (attempt < retries) {
                console.debug(`Retrying in ${delayTime}ms...`);
                await delay(delayTime);
            }
        }
    }
    return false;
};

// 删除共享邮箱
const step0RemoveShareEmail = async (email, respData) => {
    try {
        const body = JSON.stringify({
            email_address: email,
            resource_process_type: 2,
            to_user_id: "0"
        });

        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/shared_email/remove_shared_email", {
            method: "DELETE",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
                "x-lgw-app-id": "1161",
                "x-lgw-os-type": "1",
                "x-lgw-terminal-type": "2",
                "x-request-version": "v2",
                "x-requested-with": "XMLHttpRequest",
            },
            body,
            credentials: "include",
            referrer: "https://ha4rxhcsndn.feishu.cn/admin/email/accountManagement/sharedEmail",
            mode: "cors"
        });

        const result = await response.json();
        const code = result?.data?.code ?? result?.code ?? "未知返回";
        respData.push(`${email} -> code: ${code}`);
        console.debug(`${email} -> code: ${code}`);
    } catch (error) {
        throw new Error(`Failed to delete: ${email}, ${error.message}`);
    }
};

// 主逻辑
const processEmails = async () => {
    let emails = `



    `.trim().split('\n').filter(d => d.trim() !== '');

    for (let i = 0; i < emails.length; i++) {
        emails[i] = emails[i].trim().replace(/^https?:\/\//, '');
    }

    let respData = [];
    console.debug("Step 1: remove shared emails...");
    for (let i = 0; i < emails.length; i++) {
        const success = await fetchWithRetry(step0RemoveShareEmail, emails[i], respData);
        if (!success) {
            console.debug(`Step 1 failed for email: ${emails[i]}. Skipping.`);
        }
    }

    let respMsg = `已删除邮箱（请到飞书后台检查）:\n${respData.join("\n")}`;
    console.debug(respMsg);

    console.debug("Process completed successfully.");
};

processEmails();
