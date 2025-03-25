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

    let fakeUrl = 'asdfasdfasdf.com';
    fakeUrl = `

tfaianime.com
`;
    fakeUrl = fakeUrl.trim();
    let fakeCompany = `

    深圳市悦美境商贸有限公司

    `
    fakeCompany = fakeCompany.trim();

    let fakeSn = generateRandomSn()
    let fakeMoney = generateRandomMoney()
    let element = $('.ellipsis')

    function generateRandomSn() {
        // 生成时间戳毫秒
        return Date.now();
    }

    function generateRandomMoney() {
        // 生成最小值为100.00，最大值为10000的随机数
        var min = 10.00;
        var max = 100;
        var randomNumber = Math.random() * (max - min) + min;
        // 保留两位小数
        return '$' + randomNumber.toFixed(2);
    }

    function pageBilling() {
        setInterval(function () {
            element = $('.ellipsis')
            if (element.length > 0 && element.text()) {
                element.text(fakeCompany);
            }

            element = $('table > tbody > tr > td').eq(0).find('span').eq(0)
            if (element.length > 0) {
                element.text(fakeUrl)
            }

            element = $('table > tbody > tr > td').eq(0).find('span').eq(1)
            if (element.length > 0) {
                element.text(fakeSn)
            }

            element = $('table > tbody > tr').last()
            if (element.length > 0) {
                element.hide()
            }

            element = $('div[aria-level=4]').eq(4)
            if (element.length > 0) {
                element.text(fakeMoney)
            }

        }, 500); // 每 3 秒执行一次
    }

    function pageDomain() {
        setInterval(function () {
            element = $('div[aria-haspopup="listbox"][tabindex="0"]').find('div').eq(13)
            if (element.length > 0 && element.text()) {
                element.text(fakeCompany);
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(12)
            if (element.length > 0) {
                element.hide()
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(0).find('div.ellipsis').eq(0)
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]')
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]').parent().next().find('span:first')
            if (element.length > 0) {
                element.text('所有者：' + fakeCompany);
            }

            element = $('span > span[tooltipsuccess="已复制到剪贴板"] > div > span')
            if (element.length > 0) {
                element.text(fakeSn);
            }
        }, 500); // 每 3 秒执行一次
    }

    function pagePixel() {
        setInterval(function () {
            element = $('div[aria-haspopup="listbox"][tabindex="0"]').find('div').eq(13)
            if (element.length > 0 && element.text()) {
                element.text(fakeCompany);
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(12)
            if (element.length > 0) {
                element.hide()
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(0).find('div.ellipsis').eq(0)
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]')
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]').parent().next().find('span:first')
            if (element.length > 0) {
                element.text('所有者：' + fakeCompany);
            }

            element = $('span > span[tooltipsuccess="已复制到剪贴板"] > div > span')
            if (element.length > 0) {
                element.text(fakeSn);
            }
        }, 500); // 每 3 秒执行一次
    }

    function pageWhatsapp() {
        setInterval(function () {
            element = $('div[aria-haspopup="listbox"][tabindex="0"]').find('div').eq(13)
            if (element.length > 0 && element.text()) {
                element.text(fakeCompany);
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(12)
            if (element.length > 0) {
                element.hide()
            }

            element = $('.uiScrollableAreaContent').eq(0).find('div > div').eq(0).find('div.ellipsis').eq(0)
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]')
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[role="heading"][aria-level="3"]').parent().next().find('span:first')
            if (element.length > 0) {
                element.text('所有者：' + fakeCompany);
            }

            element = $('span > span[tooltipsuccess="已复制到剪贴板"] > div > span')
            if (element.length > 0) {
                element.text(fakeSn);
            }
        }, 1000); // 每 3 秒执行一次
    }


    function pageDataset() {
        setTimeout(function () {
            element = $('div > div[aria-disabled="false"][tabindex="0"] > span > span > span')
            if (element.length > 0 && element.text()) {
                element.text(fakeCompany);
                element.text(`${fakeCompany}（${fakeSn}）`);
            }

            $('div > div[role="row"]').hide()
            $('div > div[role="row"]').eq(0).show()
            element = $('div > div[role="row"]').eq(0).find('div > div > div > div > div > div > div > div > div').eq(2)
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > div[role="row"]').eq(0).find('div > div > div > div > div > div > div > div > div').eq(3)
            if (element.length > 0) {
                element.text(fakeSn);
            }

            element = $('div > div[aria-level="2"][role="heading"]').eq(0)
            if (element.length > 0) {
                element.text(fakeUrl);
            }


            element = $('#data_source_name_dropdown > div > div > span > div').find('span')
            if (element.length > 0) {
                element.text(`ID ${fakeSn}`);
            }

            element = $('#data_source_name_dropdown > div > div > span > div').find('span').prev()
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('span[data-surface="/events_manager/WORKSPACE/DATA_SOURCES/DETAILS/OVERVIEW/SUMMARY/INFO"]').find('a').eq(1).parent()
            if (element.length > 0) {
                element.text(fakeUrl);
            }

            element = $('div > span[tooltipsuccess="已复制到剪贴板"] > div')
            if (element.length > 0) {
                element.text(fakeSn);
            }

        }, 5000);
    }

    if (window.location.pathname.indexOf('/settings/owned-domains') >= 0) {
        pageDomain();
    } else if (window.location.pathname.indexOf('/events_manager2/list/dataset') >= 0) {
        pageDataset();
    } else if (window.location.pathname.indexOf('/settings/pixels') >= 0) {
        pagePixel();
    } else if (window.location.pathname.indexOf('/settings/whatsapp') >= 0) {
        pageWhatsapp();
    } else if (window.location.pathname === '/billing_hub/accounts') {
        pageBilling();
    }
})();
