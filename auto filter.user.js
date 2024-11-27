// ==UserScript==
// @name         auto filter
// @version      1.0
// @description  filter something you don't need or make some operation easy
// @author       Lennon
// @match        https://www.tapd.cn/*
// @match        https://oms2.yunexpress.cn/*
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.tapd.cn']) >= 0) {
        siteTapd();
    } else if ($.inArray(location.hostname, ['oms2.yunexpress.cn']) >= 0) {
        siteYunExpress();
    }
}, 3000);

function siteTapd() {
    let element = $('#svn_keyword_new')
    if (!element) {
        return false;
    }

    let clipboardTextOld = element.attr('data-clipboard-text')
    if (!clipboardTextOld) {
        return false;
    }

    let clipboardTextNew = clipboardTextOld.split(' ')
    clipboardTextNew[1] = ''
    clipboardTextNew = clipboardTextNew.join(' ')
    clipboardTextNew = clipboardTextNew.replace('  ', ' ')
    element.attr('data-clipboard-text', clipboardTextNew)
}

function siteYunExpress() {
    document.getElementsByClassName('user-name').innerHTML = '欧阳'
}
