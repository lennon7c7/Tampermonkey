// ==UserScript==
// @name         cmcm.com
// @namespace    http://tampermonkey.net/
// @version      2024-12-11
// @description  easy work
// @author       lennon
// @match        https://advertiser.cheetahgo.cmcm.com/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://fastly.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js
// @grant        none
// ==/UserScript==

console.log('init', new Date())

let pageIndexData = [];
let minDailyMoney = 50;
let maxDailyMoney = 100;
let currentDomainKey = 0;
let companyName = '深圳市顺风顺水科技有限公司';
// 随机生成的，无实际意义
let companyId = '1739065024005';
let domainArr = $.trim(`
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
`).split("\n");
let idArr = $.trim(`
1619540982244697
1619540982244698
1619540982244699
1619540982244700
1619540982244701
1619540982244702
1619540982244703
1619540982244704
1619540982244705
1619540982244706
`).split("\n");
let domainMoneyArr = {};

/**
 * 部分已推广
 * @type {string}
 */
companyName = '深圳市蓓赫科技有限公司';
companyId = '53112444'
domainArr = $.trim(`
neonpunkartgenerator.com
expertenglishtranslations.com
interviewmasterpro.com
musicsprite.com
melodyprompt.com
caloriedetect.com
fitjourneyplanner.com
speechcraftgen.com
mathsolvehub.com
chatbothaven.com
`).split("\n");
idArr = $.trim(`
1619540982244707
1619540982244708
1619540982244709
1619540982244710
1619540982244711
1619540982244712
1619540982244713
1619540982244714
1619540982244715
1619540982244716
`).split("\n");
domainMoneyArr = {
    'speechcraftgen.com': 500,
    'mathsolvehub.com': 1400,
    'neonpunkartgenerator.com': 191000,
    'expertenglishtranslations.com': 228000,
    'interviewmasterpro.com': 96000,
    'fitjourneyplanner.com': 9000,
}

companyName = '深圳白羽千翎科技有限公司';
companyId = '1739933528455'
domainArr = $.trim(`
vectorprompt.cc
cryptonotes.cc
aiwriterhub.cc
lyricgenie.cc
blessinggenie.cc
postpartummeals.cc
planai.cc
lyriccomposer.cc
lyricgenius.cc
iamchefextraordinaire.cc
`).split("\n");
idArr = $.trim(`
1619540982244717
1619540982244718
1619540982244719
1619540982244720
1619540982244721
1619540982244722
1619540982244723
1619540982244724
1619540982244725
1619540982244726
`).split("\n");
domainMoneyArr = {}

/**
 * 根据营业额计算推广费
 * @param revenue 营业额
 * @returns {number|number}
 */
function calculateAdFee(revenue) {
    let randomAdFee = (Number)((Math.random() * (maxDailyMoney - minDailyMoney) + minDailyMoney).toFixed(2))

    // 如果营业额为 0，则推广费固定为 2~10
    if (!revenue || revenue <= 0) {
        return randomAdFee;
    }

    let baseFee = revenue * 0.01 / formatDate().length;  // 计算营业额的 1%
    if (baseFee < minDailyMoney) {
        return randomAdFee;
    }

    baseFee += randomAdFee;
    baseFee = (Number)(baseFee.toFixed(2));

    return baseFee;
}

function generateRandomMoney() {
    // 生成最小值为 x，最大值为 y 的随机数
    let min = 100;
    let max = 1000;

    return (Number)((Math.random() * (max - min) + min).toFixed(2));
}

function formatDate() {
    let dateArr = []
    for (let i = 4; i >= 1; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        dateArr.push(`${year}-${month}-${day}`)
    }


    return dateArr;
}

function pageIndex() {
    $('span.etctitle').first().text(companyName)
    $('span.userinfo-id').first().text('ID:' + companyId)
    $('.ant-statistic-content-value-int').eq(1).text('10')
    $('span.ant-select-selection-item[title="昨天"]').text('近7天')


    // FB账户可用余额
    let balanceFB = generateRandomMoney()
    $("#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(3) > div.flexbetwee > div:nth-child(2) > div.ant-statistic-content").text(`$${balanceFB}`)

    // TT账户可用余额
    let balanceTT = 50


    // 总可用余额
    let balanceAll = balanceFB + balanceTT
    balanceAll = Number(balanceAll.toFixed(2))
    $('#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(7) > div.ant-statistic > div.ant-statistic-content').text(`$${balanceAll}`)

    let myElement = $('ul.cost-rank').last()
    myElement.css('height', '370px')
    myElement.parent().css('height', '370px')
    myElement.html('')

    // 以 pageIndexData.money 为升序排序
    pageIndexData = pageIndexData.sort(function (a, b) {
        return b.money - a.money
    });
    for (let i = 0, len = pageIndexData.length; i < len; i++) {
        let topText = `TOP${i + 1}`
        let domainText = pageIndexData[i].domain
        let moneyText = `$${pageIndexData[i].money}`
        myElement.append(`<li><label class="list-tip">${topText}</label><span class="ml20 pointer">${domainText}</span><label class="fr">${moneyText}</label></li>`)
    }

    document.title = 'home'
    $('.addata-box').remove()

    myElement = $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(2)');
    if (myElement.text().indexOf('账户消耗排名') === -1) {
        myElement.remove()
    }
    $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(5)').remove()
}

function pageChart() {
    let domain = domainArr[currentDomainKey]
    if (!domain) {
        return
    }

    document.title = currentDomainKey + 1

    // let bgDiv = `<div id="bg" style="width: 200px;height: 100px;position: absolute;top: 259px;right: 50px;background: white;"></div>`
    // $('body').append(bgDiv);
    $('#rc-tabs-0-panel-1').css('height', '300px')
    $('input[placeholder="开始日期"]').val(formatDate()[0])
    $('input[placeholder="结束日期"]').val(formatDate()[3])
    $('.ant-pagination-total-text').text(`总共 ${formatDate().length} 条`)

    // 生成最小值为 x，最大值为 y 的随机数
    let moneyArr = []
    let moneySum = 0;
    for (let i = 0, len = formatDate().length; i < len; i++) {
        let currentMoney = calculateAdFee(domainMoneyArr[domain])
        moneySum += currentMoney
        moneyArr.push(currentMoney)
    }
    moneySum = moneySum.toFixed(2)
    pageIndexData.push({
        domain: domain,
        money: moneySum
    })

    let trHtml = '';
    let trID = idArr[currentDomainKey]
    for (let i = 0, len = formatDate().length; i < len; i++) {
        let trClickRate = ((Math.random() * (4 - 1) + 1)).toFixed(2)
        let trClickCount = ((trClickRate) * moneyArr[i]).toFixed(0)
        let trDate = formatDate()[i]
        let trDisplayCount = (trClickCount / (trClickRate / 100)).toFixed(0)
        let trPeopleCount = (trDisplayCount * 0.8).toFixed(0)
        trHtml += `<tr class="ant-table-row ant-table-row-level-0"><td class="ant-table-cell ant-table-cell-fix-left" style="text-align: center; position: sticky; left: 0;">${trDate}</td><td class="ant-table-cell ant-table-cell-fix-left" style="text-align: center; position: sticky; left: 150px;"><div class="limitlong">${domain}</div></td><td class="ant-table-cell ant-table-cell-fix-left ant-table-cell-fix-left-last" style="text-align: center; position: sticky; left: 300px;"><div class="limitlong">${trID}</div></td><td class="ant-table-cell" style="text-align: center;">${trDisplayCount}</td><td class="ant-table-cell" style="text-align: center;">${trPeopleCount}</td><td class="ant-table-cell" style="text-align: center;">${trClickCount}</td><td class="ant-table-cell" style="text-align: center;">${trClickRate}%</td><td class="ant-table-cell" style="text-align: center;">$${moneyArr[i]}</td></tr>`
    }
    $('table > tbody').html(trHtml)

    setTimeout(function () {
        var dom = document.getElementById('rc-tabs-0-panel-1');
        var myChart = echarts.init(dom, null, {renderer: 'canvas', useDirtyRect: false});
        var option;
        option = {
            xAxis: {type: 'category', data: formatDate()},
            yAxis: {type: 'value'},
            series: [{data: moneyArr, type: 'line'}]
        };
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }
        window.addEventListener('resize', myChart.resize);
        console.log('done', new Date())
    }, 500)
}

setTimeout(function () {
    if (window.location.pathname.indexOf('/index/workplat') >= 0) {
        pageIndex();
    } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
        pageChart();
    }
}, 10000)

$(document).ready(function () {
    // 保存当前的 URL
    var currentURL = window.location.href;

    // 监听 popstate 事件（用户点击浏览器的前进/后退按钮）
    $(window).on('popstate', function () {
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    });

    // 监听 pushState 和 replaceState 事件
    var _pushState = history.pushState;
    var _replaceState = history.replaceState;

    history.pushState = function () {
        _pushState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    history.replaceState = function () {
        _replaceState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    // 处理 URL 变化的函数
    function handleURLChange() {
        // 在这里添加你希望在 URL 变化时执行的代码
        if (window.location.pathname.indexOf('/index/workplat') >= 0) {
            setTimeout(function () {
                pageIndex();
            }, 10000)
        } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
            pageChart();
        }
    }
});

/**
 第二次以后执行的命令
 currentDomainKey++;pageChart();

 首页数据加载失败后执行的命令
 pageIndex();
 */
