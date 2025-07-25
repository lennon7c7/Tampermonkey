// ==UserScript==
// @name         HK CR
// @version      1.0.0
// @description  Pause auto logout
// @author       lennon
// @license      MIT
// @match        https://www.e-services.cr.gov.hk/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://unpkg.com/swiper@8/swiper-bundle.min.js
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==
'use strict';

// 发送请求到本地服务器以执行系统命令
function runLocalCommand(command) {
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://localhost:3000/run-command',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({command: command}),
        onload: function (response) {
            // 请求成功
            try {
                const data = JSON.parse(response.responseText);
                if (data.output) {
                    console.log('命令输出：', data.output);
                } else if (data.error) {
                    console.error('命令错误：', data.error);
                }
            } catch (error) {
                console.error('解析响应错误：', error);
            }
        },
        onerror: function (error) {
            // 请求失败
            console.error('请求错误：', error);
        }
    });
}

// 调用本地命令
runLocalCommand('echo Hello World');

// 监控 DOM 变化，删除 disable-devtool.min.js 脚本
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.tagName === 'SCRIPT' && node.src && node.src.includes('disable-devtool.min.js')) {
                console.debug('删除 disable-devtool.min.js 脚本');
                node.parentNode.removeChild(node);  // 删除该脚本
            }
        });
    });
});

// 开始监听 <head> 标签中的变化
observer.observe(document.head, {childList: true, subtree: true});

function clickAccountServiceButton() {
    const $button = $("button.primary.wFull.ant-btn:contains('无帐户使用者服务')");
    if ($button.length > 0) {
        $button.click();
        console.debug("无帐户使用者服务按钮已点击");
    } else {
        console.debug("无帐户使用者服务按钮未找到");
    }
}

// 延迟 500ms 执行
setTimeout(clickAccountServiceButton, 500);

function clickCancelButton() {
    const $button = $("button[aria-label='取消']");
    if ($button.length > 0) {
        $button.click();
        console.debug("取消按钮已点击");
    } else {
        console.debug("取消按钮未找到");
    }
}

setTimeout(clickCancelButton, 500);  // 延迟 500ms 点击

// Hook XHR
const open = XMLHttpRequest.prototype.open;
const send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function (method, url, ...args) {
    this._method = method;
    this._url = url;
    return open.call(this, method, url, ...args);
};
XMLHttpRequest.prototype.send = function (...args) {
    const xhr = this;
    const payload = args[0];
    xhr.addEventListener('load', function () {
        console.log('[🐵XHR]', xhr._method, xhr._url, {
            request: payload,
            response: xhr.response,
            status: xhr.status,
        });

        if (xhr._url === '/ICRIS3EP/system/common/captcha.do') {
// console.log('[2]', xhr.response);
            runLocalCommand(xhr.response)
        }
    });
    return send.apply(this, args);
};

function delayedFillForm() {
    const steps = [
        // () => $(".ant-checkbox-input[value='1']").click(),
        // () => $(".ant-radio-input[value='1']").click(),
        // () => $("#issuePlace").val("HKG").trigger("change"),
        // () => $("#chiName").val("测试"),
        // () => $("#engSurname").val("test"),
        // () => $("#engOtherNames").val("test2"),
        () => $("#passportNum").val("a123456"),

        () => $("a.audioBtn").click(),
        () => $("a.refreshBtn").click(),
        // () => $("#captchaCode").val("12345"),
    ];

    steps.forEach((fn, index) => {
        setTimeout(fn, index * 100); // 每步延迟 100ms
    });

    // const $button = $("button.primary.ant-btn:contains('接受及提交')");
    // if ($button.length > 0) {
    //     $button.click();
    //     console.debug("接受及提交按钮已点击");
    // } else {
    //     console.debug("接受及提交按钮未找到");
    // }
}

function main() {
    // 检查当前页面是否是指定的 URL
    if (window.location.href === "https://www.e-services.cr.gov.hk/ICRIS3EP/system/dashboard/information.do") {
        // 跳转到新的 URL
        window.location.href = "https://www.e-services.cr.gov.hk/ICRIS3EP/system/dashboard/e-search.do";
        console.debug("页面已跳转");
    } else if (window.location.href === "https://www.e-services.cr.gov.hk/ICRIS3EP/system/dashboard/e-search.do") {
        delayedFillForm();
    } else {
        console.debug("当前页面不是目标页面");
    }

    setInterval(function () {
        if ($("button.btn:contains('延续')").length > 0) {
            $("button.btn:contains('延续')").click()
        }
    }, 1 * 20000);
}

setTimeout(function () {
    main()
}, 5000)
