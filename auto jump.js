// ==UserScript==
// @name         auto jump
// @description  jump something or make some operations fast
// @namespace    Lennon Scripts
// @match        https://link.csdn.net/?target=*
// @match        https://link.zhihu.com/?target=*
// @match        https://www.youtube.com/*
// @grant        Any
// @version      1.0
// @author       Lennon
// @run-at       document-start
// ==/UserScript==
'use strict';

const params = new URLSearchParams(window.location.search)
const paramTarget = params.get('target')

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
