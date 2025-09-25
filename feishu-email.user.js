// ==UserScript==
// @name         feishu email
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

const generateRequestTimeId = () => {
    const timestamp = Date.now();  // Get current timestamp in milliseconds
    return `_t${timestamp}`;  // Combine them to form a unique request_time_id
};

// Function to get csrf_token from cookies
function getCsrfToken() {
    const name = 'csrf_token=';  // Cookie name (it might be different in your case)
    const cookies = document.cookie.split(';');

    // Loop through the cookies to find csrf_token
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;  // Return null if the csrf_token cookie is not found
}

// Delay function to wait between steps
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Common function to handle retries
const fetchWithRetry = async (func, domain, respData, retries = 3, delayTime = 2000) => {
    let attempt = 0;
    while (attempt < retries) {
        try {
            await func(domain, respData);  // Call the step function
            return true; // Success
        } catch (error) {
            attempt++;
            console.error(`Error on attempt ${attempt} for ${domain}: ${error}`);
            if (attempt < retries) {
                console.debug(`Retrying in ${delayTime}ms...`);
                await delay(delayTime);
            }
        }
    }
    return false; // Failed after retries
};

const step1CreateDomain = async (domain, respData) => {
    try {
        const request_time_id = generateRequestTimeId();
        const body = "{\"domain_name\":\"" + domain + "\",\"setup_type\":1,\"setup_domain_type\":1,\"request_time_id\":\"" + request_time_id + "\"}";
        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/domain/gaia_create_primary_domain", {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/json;charset=UTF-8",
                "credentials": "same-origin",
                "device-platform": "TerminalType_WEB",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "rpc-persist-lane-c-lark-uid": "0",
                "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": getCsrfToken(),
                "x-lgw-app-id": "1161",
                "x-lgw-os-type": "1",
                "x-lgw-terminal-type": "2",
                "x-request-version": "v2",
                "x-requested-with": "XMLHttpRequest",
                "x-timezone-offset": "-480"
            },
            "referrer": "https://ha4rxhcsndn.feishu.cn/admin/email/setup/domainManagement/editSetupV2",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": body,
            method: "POST",
            "mode": "cors",
            credentials: "include"
        });

        const result = await response.json();
        respData.push(`${domain}\n${result.data.code}\n\n`);
        console.debug(`${domain} ${result.data.code}\n\n`);
    } catch (error) {
        throw new Error(`Failed to get verify code for domain: ${domain}`);
    }
};

// Step 1: Verify the domain
const step1GetVerify = async (domain, respData) => {
    try {
        const body = `{"domain":"${domain}"}`;
        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/domain/get_verify_code", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
            },
            body: body,
            credentials: "include"
        });

        const result = await response.json();
        respData.push(`${domain}\n${result.data.code}\n\n`);
        console.debug(`${domain} ${result.data.code}\n\n`);
    } catch (error) {
        throw new Error(`Failed to get verify code for domain: ${domain}`);
    }
};

// Step 2: Check if domain is verified
const step2IsVerify = async (domain, respData) => {
    try {
        const request_time_id = generateRequestTimeId();
        const body = `{"domain_name":"${domain}","request_time_id":"${request_time_id}"}`;
        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/email/verify/gaia_verify_ownership", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
            },
            body: body,
            credentials: "include"
        });

        const result = await response.json();
        respData.push(`${domain}\n${result.data.is_verified}\n`);
        console.debug(`${domain}\n${result.data.is_verified}\n\n`);
    } catch (error) {
        throw new Error(`Failed to verify ownership for domain: ${domain}`);
    }
};

// Step 3: Create Email
const step3CreateEmail = async (domain, respData) => {
    try {
        const request_time_id = generateRequestTimeId();
        const body = `{"name":"support","prefix":"support","domain":"${domain}","users":["7504969306624212995"],"request_time_id":"${request_time_id}"}`;
        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/shared_email/create_shared_email_v2", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
            },
            body: body,
            credentials: "include"
        });

        const result = await response.json();
        respData.push(`${domain}\n${result.data.message}\n`);
        console.debug(`${domain}\n${result.data.message}\n\n`);
    } catch (error) {
        throw new Error(`Failed to create email for domain: ${domain}`);
    }
};

// Step 4: Get the created email
const step4GetEmail = async (domain, respData) => {
    try {
        const request_time_id = generateRequestTimeId();
        const body = `{"search_word":"${domain}","page":1,"page_size":20,"request_time_id":"${request_time_id}"}`;
        const response = await fetch("https://ha4rxhcsndn.feishu.cn/suite/admin/shared_email/get_shared_emails_v2", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
            },
            body: body,
            credentials: "include"
        });

        const result = await response.json();
        respData.push(result.data.list[0].email.trim());
        console.debug(`${domain} ${result.data.list[0].email}\n\n`);
    } catch (error) {
        throw new Error(`Failed to get email for domain: ${domain}`);
    }
};

// Main function to process steps sequentially
const processDomains = async () => {
    let domains = `aaa.com
                    bbb.com
                    ccc.com`.trim().split('\n');
    for (var i = 0, len = domains.length; i < len; i++) {
        domains[i] = domains[i].trim().replaceAll('https://', '')
    }

    // Step 0: create each domain
    let respData = [];
    console.debug("Step 1: create domains...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step1CreateDomain, domains[i], respData);
        if (!success) {
            console.debug(`Step 1 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }

    // Step 1: Verify each domain
    respData = [];
    console.debug("Step 1: Verifying domains...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step1GetVerify, domains[i], respData);
        if (!success) {
            console.debug(`Step 1 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }
    let respMsg = `需要给以下域名加TXT记录\n`
    let respDataMsg = respData.join("\n").trim()
    respMsg += respDataMsg
    console.debug(respMsg)

    // Step 2: Check if domains are verified
    respData = [];
    console.debug("Step 2: Checking domain verification...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step2IsVerify, domains[i], respData);
        if (!success) {
            console.debug(`Step 2 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }

    // Step 3: Create email for each domain
    respData = [];
    console.debug("Step 3: Creating emails...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step3CreateEmail, domains[i], respData);
        if (!success) {
            console.debug(`Step 3 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }

    // Step 4: Get created emails
    respData = [];
    console.debug("Step 4: Fetching created emails...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step4GetEmail, domains[i], respData);
        if (!success) {
            console.debug(`Step 4 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }
    respMsg = `已开通邮箱, 在你的xxx, yyy里能看到\n`
    respDataMsg = respData.join("\n").trim()
    respMsg += respDataMsg
    console.debug(respMsg)

    // Final summary
    console.debug("Process completed successfully.");
};

processDomains();
