// ==UserScript==
// @name         feishu email
// @version      1.0
// @description  fix something or make some operations fast
// @author       lennonandjune@gmail.com
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

let feishuUrl = 'https://ha4rxhcsndn.feishu.cn';
feishuUrl = 'https://tcnvs1zw0mbh.feishu.cn';

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

// Add user to shared email (公共邮箱添加成员)
const addUserToSharedEmail = async ({user_id, domain, userID, action = 1}) => {
    try {
        const request_time_id = generateRequestTimeId();
        const body = JSON.stringify({
            user_id: user_id,
            name: "support",
            prefix: "support",
            domain: domain,
            users: [{userID: userID, action: action}],
            departments: [],
            user_groups: [],
            smtp_op_type: 0,
            request_time_id: request_time_id
        });
        const response = await fetch(feishuUrl + "/suite/admin/shared_email/edit_shared_email_v2", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCsrfToken(),
                // Add other headers if needed
            },
            body: body,
            credentials: "include"
        });
        const result = await response.json();
        console.debug(`Add user to shared email: ${domain} - ${userID} => ${result.data?.message || JSON.stringify(result)}`);
        return result;
    } catch (error) {
        throw new Error(`Failed to add user to shared email for domain: ${domain}`);
    }
};

// Get shared emails for a domain, returns list of shared email objects
const getSharedEmails = async (search_word) => {
    const request_time_id = generateRequestTimeId();
    const body = JSON.stringify({
        search_word: search_word,
        page: 1,
        page_size: 100,
        request_time_id: request_time_id
    });
    const response = await fetch(feishuUrl + "/suite/admin/shared_email/get_shared_emails_v2", {
        method: "POST",
        headers: {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8",
            "x-csrf-token": getCsrfToken(),
            // ...other headers if needed...
        },
        body: body,
        credentials: "include"
    });
    const result = await response.json();
    if (result.code === 0 && result.data && Array.isArray(result.data.list)) {
        return result.data.list;
    }
    throw new Error("Failed to get shared emails: " + (result.message || JSON.stringify(result)));
};

// Main function to process steps sequentially
const processDomains = async () => {
    let domains = `

abc.com

`.trim().split('\n').filter(d => d.trim() !== '');
    for (var i = 0, len = domains.length; i < len; i++) {
        domains[i] = domains[i].trim().replaceAll('https://', '');
    }

    let respData = [];
    console.debug("Step 1: Verifying domains...");
    for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        let sharedEmails;
        try {
            // Use prefix "support" for search_word, or domain if needed
            sharedEmails = await getSharedEmails("support");
        } catch (err) {
            console.debug(`Failed to get shared emails for domain: ${domain}. Skipping.`);
            continue;
        }
        // Find the shared email for this domain
        const sharedEmail = sharedEmails.find(e => e.email.endsWith("@" + domain));
        if (!sharedEmail) {
            console.debug(`No shared email found for domain: ${domain}. Skipping.`);
            continue;
        }
        let req = {
            user_id: sharedEmail.user_id,
            domain: domain,
            // xie
            userID: "7581428165948574906",
            action: 1
        };
        const success = await fetchWithRetry(addUserToSharedEmail, req, respData);
        if (!success) {
            console.debug(`Step 1 failed for domain: ${domain}. Skipping.`);
            break;
        }
    }
    let respMsg = `需要给以下域名的公共邮箱添加成员\n`
    let respDataMsg = respData.join("\n").trim();
    respMsg += respDataMsg;
    console.debug(respMsg);

    respMsg = `已添加成员到邮箱, 在你的飞书, 中付2组织里能看到\n`
    respDataMsg = respData.join("\n").trim();
    respMsg += respDataMsg;
    console.debug(respMsg);

    // Final summary
    console.debug("Process completed successfully.");
};

processDomains();

