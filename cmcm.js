// ==UserScript==
// @name         cmcm.com
// @namespace    http://tampermonkey.net/
// @version      2024-12-11
// @description  easy work
// @author       lennon
// @match        https://advertiser.cheetahgo.cmcm.com/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log('init', new Date())

    function pageIndex() {
        setTimeout(function () {
            let domainArr = `
            
resumerefine.top
promptwizard.top
backgroundremoverpro.top
plantaficionado.top
storycraftai.top
autovision.top
promptpic.cloud
adcrafted.org
backdropswap.org
colorsize.org

`
            domainArr = $.trim(domainArr)
            domainArr = domainArr.split("\n");

            function generateRandomMoney() {
                // 生成最小值为 x，最大值为 y 的随机数
                var min = 14;
                var max = 40;

                var moneyArr = []
                for (var i = 0, len = 10; i < len; i++) {
                    moneyArr[i] = (Math.random() * (max - min) + min).toFixed(2)
                }

                // 排序
                moneyArr = moneyArr.sort(function (a, b) {
                    return b - a
                });

                return moneyArr;
            }

            $('span.etctitle').first().text('深圳市顺风顺水科技有限公司')
            $('span.userinfo-id').first().text('ID:' + Date.now())
            $('.ant-statistic-content-value-int').first().text('10')
            $('span.ant-select-selection-item[title="昨天"]').text('近7天')
            let myElement = $('ul.cost-rank').eq(1)
            myElement.css('height', '370px')
            myElement.parent().css('height', '370px')
            myElement.html('')
            let moneyArr = generateRandomMoney()
            for (var i = 0, len = 10; i < len; i++) {
                let topText = `TOP${i + 1}`
                let domainText = domainArr[i]
                let moneyText = `$${moneyArr[i]}`
                myElement.append(`<li><label class="list-tip">${topText}</label><span class="ml20 pointer">${domainText}</span><label class="fr">${moneyText}</label></li>`)
            }
        }, 5000)
    }


    function pageChart() {
        setTimeout(function () {
            $('main > div').first().hide()
            let bgDiv = `<div id="bg" style="width: 200px;height: 100px;position: absolute;top: 259px;right: 50px;background: white;"></div>`
            $('body').append(bgDiv);

            let fakeUrl = `
          
resumerefine.top
promptwizard.top
backgroundremoverpro.top
plantaficionado.top
storycraftai.top
autovision.top
promptpic.cloud
adcrafted.org
backdropswap.org
colorsize.org

            `;
            fakeUrl = fakeUrl.trim();
            fakeUrl = fakeUrl.split("\n")[0];

            let element = $('table > tbody > tr > td.ant-table-cell:nth-child(2) > div')
            if (element.length > 0 && element.text()) {
                element.text(fakeUrl);
            }

            element = $('table > tbody > tr > td.ant-table-cell:nth-child(3) > div')
            if (element.length > 0 && element.text()) {
                element.text(Date.now());
            }
        }, 10000)
    }

    if (window.location.pathname.indexOf('/index/workplat') >= 0) {
        pageIndex();
    } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
        pageChart();
    }
})();
