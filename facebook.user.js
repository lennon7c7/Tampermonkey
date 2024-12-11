// ==UserScript==
// @name         FB fake
// @namespace    http://tampermonkey.net/
// @version      2024-12-11
// @description  easy work
// @author       lennon
// @match        *.facebook.com/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log('init', new Date())

    setInterval(function () {
        let fakeUrl = 'asdfasdfasdf.com';
        fakeUrl = 'plantaficionado.top';
        let element = $('.ellipsis')
        // 如果元素的内容不是  fakeUrl，则改为  fakeUrl
        if (element && element.text() !== fakeUrl) {
            element.text(fakeUrl);
        }

        element = $('table > tbody > tr.xb9moi8.xfth1om.x21b0me.xmls85d.xso031l.x1q0q8m5.x9f619.x1ypdohk > td:nth-child(1) > div > div > div > div > div.x78zum5.xdt5ytf.x2lwn1j.xeuugli > span.x8t9es0.x1fvot60.xxio538.xjnfcd9.xq9mrsl.x1h4wwuj.x117nqv4.xeuugli');
        // 如果元素的内容不是  fakeUrl，则改为  fakeUrl
        if (element && element.text() !== fakeUrl) {
            element.text(fakeUrl);
        }
    }, 50); // 每 3 秒执行一次
})();
