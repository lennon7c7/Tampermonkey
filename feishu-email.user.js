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
                console.log(`Retrying in ${delayTime}ms...`);
                await delay(delayTime);
            }
        }
    }
    return false; // Failed after retries
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
        console.log(`${domain} ${result.data.code}\n\n`);
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
        console.log(`${domain}\n${result.data.is_verified}\n\n`);
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
        console.log(`${domain}\n${result.data.message}\n\n`);
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
        console.log(`${domain} ${result.data.list[0].email}\n\n`);
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
        domains[i] = domains[i].trim()
    }

    // Step 1: Verify each domain
    let respData = [];
    console.log("Step 1: Verifying domains...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step1GetVerify, domains[i], respData);
        if (!success) {
            console.log(`Step 1 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }
    let respMsg = `需要给以下域名加TXT记录\n`
    let respDataMsg = respData.join("\n").trim()
    console.log(respMsg, respDataMsg)

    // Step 2: Check if domains are verified
    respData = [];
    console.log("Step 2: Checking domain verification...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step2IsVerify, domains[i], respData);
        if (!success) {
            console.log(`Step 2 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }

    // Step 3: Create email for each domain
    respData = [];
    console.log("Step 3: Creating emails...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step3CreateEmail, domains[i], respData);
        if (!success) {
            console.log(`Step 3 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }

    // Step 4: Get created emails
    respData = [];
    console.log("Step 4: Fetching created emails...");
    for (let i = 0; i < domains.length; i++) {
        const success = await fetchWithRetry(step4GetEmail, domains[i], respData);
        if (!success) {
            console.log(`Step 4 failed for domain: ${domains[i]}. Skipping.`);
            break;
        }
    }
    respMsg = `已开通邮箱, 在你的xxx, yyy里能看到\n`
    respDataMsg = respData.join("\n").trim()
    console.log(respMsg, respDataMsg)

    // Final summary
    console.log("Process completed successfully.");
};

processDomains();
