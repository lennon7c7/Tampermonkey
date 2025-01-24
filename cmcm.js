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
let minDailyMoney = 2;
let maxDailyMoney = 10;
let currentDomainKey = 0;
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
`)
domainArr = domainArr.split("\n");

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
`)
idArr = idArr.split("\n");

function generateRandomMoney() {
    // 生成最小值为 x，最大值为 y 的随机数
    var min = maxDailyMoney * 7;
    var max = maxDailyMoney * 2 * 7;

    var moneyArr = []
    for (var i = 0, len = 10; i < len; i++) {
        moneyArr.push((Number)((Math.random() * (max - min) + min).toFixed(2)))
    }

    // 排序
    moneyArr = moneyArr.sort(function (a, b) {
        return b - a
    });

    return moneyArr;
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
    $('span.etctitle').first().text('深圳市顺风顺水科技有限公司')
    $('span.userinfo-id').first().text('ID:' + Date.now())
    $('.ant-statistic-content-value-int').eq(1).text('10')
    $('span.ant-select-selection-item[title="昨天"]').text('近7天')
    let myElement = $('ul.cost-rank').eq(1)
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
    $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(2)').remove()
    $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(5)').remove()
}

function pageChart() {
    document.title = currentDomainKey + 1

    // let bgDiv = `<div id="bg" style="width: 200px;height: 100px;position: absolute;top: 259px;right: 50px;background: white;"></div>`
    // $('body').append(bgDiv);
    $('#rc-tabs-0-panel-1').css('height', '300px')
    $('input[placeholder="开始日期"]').val(formatDate()[0])
    $('input[placeholder="结束日期"]').val(formatDate()[3])
    $('.ant-pagination-total-text').text(`总共 ${formatDate().length} 条`)

    let domain = domainArr[currentDomainKey]
    // 生成最小值为 x，最大值为 y 的随机数
    let moneyArr = []
    let moneySum = 0;
    for (let i = 0, len = formatDate().length; i < len; i++) {
        let currentMoney = (Number)((Math.random() * (maxDailyMoney - minDailyMoney) + minDailyMoney).toFixed(2))
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
    }, 1000)
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
 currentDomainKey++;pageChart();
 */
