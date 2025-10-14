// ==UserScript==
// @name         auto jump
// @description  jump something or make some operations fast
// @namespace    Lennon Scripts
// @match        https://link.csdn.net/*
// @match        https://link.zhihu.com/?target=*
// @match        https://docs.qq.com/scenario/link.html?url=*
// @match        https://www.youtube.com/*
// @match        https://chatgpt.com/*
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @grant        Any
// @version      1.0
// @author       Lennon
// @run-at       document-start
// ==/UserScript==
'use strict';

// Initialize
console.log('init', new Date());

const params = new URLSearchParams(window.location.search)
let paramTarget = params.get('target')
if (!paramTarget) {
    paramTarget = params.get('url')
}

switch (location.hostname) {
    case 'link.csdn.net':
        siteCsdn();
        break;
    case 'link.zhihu.com':
        siteZhihu();
        break;
    case 'www.youtube.com':
        siteYoutube();
        break;
    case 'docs.qq.com':
        siteDocsQq();
        break;
    case 'chatgpt.com':
        siteChatgpt();
        break;
}


function siteChatgpt() {
    setTimeout(function () {
        $('button > div:contains("ChatGPT")').text('ChatGPT 5 Fast')
        $('.trailing').hide()
        $('div.truncate[dir="auto"]').text('Plus')
        $("#page-header > div.absolute").hide()
    }, 10000);

    setInterval(function () {
        var $btn = $('button[data-testid="close-button"]');
        if ($btn.length > 0) {
            $btn.click();
            console.log("按钮已点击");
        }
    }, 1000);
}

function siteCsdn() {
    // auto jump
    if (paramTarget) {
        window.location.href = paramTarget
    }
}

function siteZhihu() {
    // auto jump
    if (paramTarget) {
        window.location.href = paramTarget
    }
}

function siteYoutube() {
    // playback speed
    sessionStorage.setItem('yt-player-playback-rate', JSON.stringify({
        'data': '2',
        'creation': Date.now(),
    }));
}

function siteDocsQq() {
    // auto jump
    if (paramTarget) {
        window.location.href = paramTarget
    }
}

console.log('done', new Date());
