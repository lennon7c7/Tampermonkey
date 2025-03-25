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

// Constants
const CONSTANTS = {
    MIN_DAILY_MONEY: 200,
    MAX_DAILY_MONEY: 300,
    MIN_RANDOM_MONEY: 100,
    MAX_RANDOM_MONEY: 1000,
    CHART_HEIGHT: 300,
    RANK_HEIGHT: 370,
    DELAY_TIME: 10000,
    TT_BALANCE: 50
};

// Company configurations
const COMPANIES = {
    SHUNFENG: {
        name: '深圳市顺风顺水科技有限公司',
        id: '1739065024005',
        domains: `resumerefine.top
promptwizard.top
backgroundremoverpro.top
plantaficionado.top
storycraftai.top
autovision.top
promptpic.cloud
adcrafted.org
backdropswap.org
colorsize.org`.split('\n'),
        ids: `1619540982244697
1619540982244698
1619540982244699
1619540982244700
1619540982244701
1619540982244702
1619540982244703
1619540982244704
1619540982244705
1619540982244706`.split('\n'),
        domainMoney: {}
    },
    BEIHE: {
        name: '深圳市蓓赫科技有限公司',
        id: '53112444',
        domains: `neonpunkartgenerator.com
expertenglishtranslations.com
interviewmasterpro.com
musicsprite.com
melodyprompt.com
caloriedetect.com
fitjourneyplanner.com
speechcraftgen.com
mathsolvehub.com
chatbothaven.com`.split('\n'),
        ids: `1619540982244707
1619540982244708
1619540982244709
1619540982244710
1619540982244711
1619540982244712
1619540982244713
1619540982244714
1619540982244715
1619540982244716`.split('\n'),
        domainMoney: {
            'speechcraftgen.com': 500,
            'mathsolvehub.com': 1400,
            'neonpunkartgenerator.com': 191000,
            'expertenglishtranslations.com': 228000,
            'interviewmasterpro.com': 96000,
            'fitjourneyplanner.com': 9000,
        }
    },
    BAIYU: {
        name: '深圳白羽千翎科技有限公司',
        id: '1739933528455',
        domains: `vectorprompt.cc
cryptonotes.cc
aiwriterhub.cc
lyricgenie.cc
blessinggenie.cc
postpartummeals.cc
planai.cc
lyriccomposer.cc
lyricgenius.cc
iamchefextraordinaire.cc`.split('\n'),
        ids: `1619540982244717
1619540982244718
1619540982244719
1619540982244720
1619540982244721
1619540982244722
1619540982244723
1619540982244724
1619540982244725
1619540982244726`.split('\n'),
        domainMoney: {}
    }
};

// State management
let state = {
    currentCompany: COMPANIES.BEIHE,
    currentDomainKey: 0,
    pageIndexData: []
};

// Utility functions
function formatDate() {
    const dateArr = [];
    for (let i = 7; i >= 1; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        dateArr.push(`${year}-${month}-${day}`);
    }
    return dateArr;
}

function generateRandomMoney(min = CONSTANTS.MIN_RANDOM_MONEY, max = CONSTANTS.MAX_RANDOM_MONEY) {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

function calculateAdFee(revenue) {
    const randomAdFee = Number((Math.random() * (CONSTANTS.MAX_DAILY_MONEY - CONSTANTS.MIN_DAILY_MONEY) + CONSTANTS.MIN_DAILY_MONEY).toFixed(2));

    if (!revenue || revenue <= 0) {
        return randomAdFee;
    }

    let baseFee = revenue * 0.01 / formatDate().length;
    if (baseFee < CONSTANTS.MIN_DAILY_MONEY) {
        return randomAdFee;
    }

    baseFee += randomAdFee;
    return Number(baseFee.toFixed(2));
}

// Page handlers
function handlePageIndex() {
    try {
        $('span.etctitle').first().text(state.currentCompany.name);
        $('span.userinfo-id').first().text('ID:' + state.currentCompany.id);
        $('.ant-statistic-content-value-int').eq(1).text('10');
        $('span.ant-select-selection-item[title="昨天"]').text('近7天');

        const balanceFB = generateRandomMoney();
        $("#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(3) > div.flexbetwee > div:nth-child(2) > div.ant-statistic-content").text(`$${balanceFB}`);

        const balanceAll = Number((balanceFB + CONSTANTS.TT_BALANCE).toFixed(2));
        $('#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(7) > div.ant-statistic > div.ant-statistic-content').text(`$${balanceAll}`);

        updateRankList();
        cleanupPage();

        document.title = 'home';
    } catch (error) {
        console.error('Error in handlePageIndex:', error);
    }
}

function updateRankList() {
    const myElement = $('ul.cost-rank').last();
    myElement.css('height', `${CONSTANTS.RANK_HEIGHT}px`);
    myElement.parent().css('height', `${CONSTANTS.RANK_HEIGHT}px`);
    myElement.html('');

    state.pageIndexData.sort((a, b) => b.money - a.money);
    
    state.pageIndexData.forEach((item, index) => {
        const topText = `TOP${index + 1}`;
        const domainText = item.domain;
        const moneyText = `$${item.money}`;
        myElement.append(`<li><label class="list-tip">${topText}</label><span class="ml20 pointer">${domainText}</span><label class="fr">${moneyText}</label></li>`);
    });
}

function cleanupPage() {
    $('.addata-box').remove();
    
    const myElement = $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(2)');
    if (myElement.text().indexOf('账户消耗排名') === -1) {
        myElement.remove();
    }
    $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(5)').remove();
}

function handlePageChart() {
    try {
        const domain = state.currentCompany.domains[state.currentDomainKey];
        if (!domain) return;

        document.title = state.currentDomainKey + 1;

        $('#rc-tabs-0-panel-1').css('height', `${CONSTANTS.CHART_HEIGHT}px`);
        $('input[placeholder="开始日期"]').val(formatDate()[0]);
        $('input[placeholder="结束日期"]').val(formatDate()[3]);
        $('.ant-pagination-total-text').text(`总共 ${formatDate().length} 条`);

        const { moneyArr, moneySum } = generateChartData(domain);
        updateTableData(domain, moneyArr);
        initializeChart(moneyArr);
    } catch (error) {
        console.error('Error in handlePageChart:', error);
    }
}

function generateChartData(domain) {
    const moneyArr = [];
    let moneySum = 0;
    
    for (let i = 0; i < formatDate().length; i++) {
        const currentMoney = calculateAdFee(state.currentCompany.domainMoney[domain]);
        moneySum += currentMoney;
        moneyArr.push(currentMoney);
    }
    
    moneySum = Number(moneySum.toFixed(2));
    state.pageIndexData.push({ domain, money: moneySum });
    
    return { moneyArr, moneySum };
}

function updateTableData(domain, moneyArr) {
    const trHtml = formatDate().map((date, i) => {
        const trClickRate = Number((Math.random() * (4 - 1) + 1).toFixed(2));
        const trClickCount = Number((trClickRate * moneyArr[i]).toFixed(0));
        const trDisplayCount = Number((trClickCount / (trClickRate / 100)).toFixed(0));
        const trPeopleCount = Number((trDisplayCount * 0.8).toFixed(0));
        const trID = state.currentCompany.ids[state.currentDomainKey];

        return `<tr class="ant-table-row ant-table-row-level-0">
            <td class="ant-table-cell ant-table-cell-fix-left" style="text-align: center; position: sticky; left: 0;">${date}</td>
            <td class="ant-table-cell ant-table-cell-fix-left" style="text-align: center; position: sticky; left: 150px;"><div class="limitlong">${domain}</div></td>
            <td class="ant-table-cell ant-table-cell-fix-left ant-table-cell-fix-left-last" style="text-align: center; position: sticky; left: 300px;"><div class="limitlong">${trID}</div></td>
            <td class="ant-table-cell" style="text-align: center;">${trDisplayCount}</td>
            <td class="ant-table-cell" style="text-align: center;">${trPeopleCount}</td>
            <td class="ant-table-cell" style="text-align: center;">${trClickCount}</td>
            <td class="ant-table-cell" style="text-align: center;">${trClickRate}%</td>
            <td class="ant-table-cell" style="text-align: center;">$${moneyArr[i]}</td>
        </tr>`;
    }).join('');

    $('table > tbody').html(trHtml);
}

function initializeChart(moneyArr) {
    setTimeout(() => {
        const dom = document.getElementById('rc-tabs-0-panel-1');
        const myChart = echarts.init(dom, null, { renderer: 'canvas', useDirtyRect: false });
        
        const option = {
            xAxis: { type: 'category', data: formatDate() },
            yAxis: { type: 'value' },
            series: [{ data: moneyArr, type: 'line' }]
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }
        
        window.addEventListener('resize', myChart.resize);
        console.log('Chart initialized', new Date());
    }, 500);
}

// URL change handler
function handleURLChange() {
    if (window.location.pathname.indexOf('/index/workplat') >= 0) {
        setTimeout(handlePageIndex, CONSTANTS.DELAY_TIME);
    } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
        handlePageChart();
    }
}

// Initialize
$(document).ready(() => {
    let currentURL = window.location.href;

    // Handle browser navigation
    $(window).on('popstate', () => {
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    });

    // Handle programmatic navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
        originalPushState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    // Initial page load
    handleURLChange();
});

/**
 第二次以后执行的命令
 currentDomainKey++;pageChart();

 首页数据加载失败后执行的命令
 pageIndex();
 */
