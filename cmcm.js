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
const CONFIG = {
    MIN_DAILY_MONEY: 200,
    MAX_DAILY_MONEY: 300,
    MIN_RANDOM_MONEY: 100,
    MAX_RANDOM_MONEY: 1000,
    CHART_HEIGHT: 300,
    TABLE_HEIGHT: 370,
    INITIAL_DELAY: 10000,
    CHART_DELAY: 500
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
    pageIndexData: [],
    currentDomainKey: 0,
    currentCompany: COMPANIES.BAIYU
};

// Utility functions
const utils = {
    formatDate() {
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
    },

    generateRandomMoney(min = CONFIG.MIN_RANDOM_MONEY, max = CONFIG.MAX_RANDOM_MONEY) {
        return Number((Math.random() * (max - min) + min).toFixed(2));
    },

    calculateAdFee(revenue) {
        const randomAdFee = Number((Math.random() * (CONFIG.MAX_DAILY_MONEY - CONFIG.MIN_DAILY_MONEY) + CONFIG.MIN_DAILY_MONEY).toFixed(2));

        if (!revenue || revenue <= 0) {
            return randomAdFee;
        }

        let baseFee = revenue * 0.01 / this.formatDate().length;
        if (baseFee < CONFIG.MIN_DAILY_MONEY) {
            return randomAdFee;
        }

        baseFee += randomAdFee;
        return Number(baseFee.toFixed(2));
    }
};

// Page handlers
const pageHandlers = {
    pageIndex() {
        try {
            $('span.etctitle').first().text(state.currentCompany.name);
            $('span.userinfo-id').first().text('ID:' + state.currentCompany.id);
            $('.ant-statistic-content-value-int').eq(1).text('10');
            $('span.ant-select-selection-item[title="昨天"]').text('近7天');

            const balanceFB = utils.generateRandomMoney();
            $("#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(3) > div.flexbetwee > div:nth-child(2) > div.ant-statistic-content").text(`$${balanceFB}`);

            const balanceTT = 50;
            const balanceAll = Number((balanceFB + balanceTT).toFixed(2));
            $('#root > section.ant-layout.ant-layout-has-sider > section > section > div.ant-spin-nested-loading > div > div > div.avatar-box.ml-4 > div > div:nth-child(7) > div.ant-statistic > div.ant-statistic-content').text(`$${balanceAll}`);

            const myElement = $('ul.cost-rank').last();
            myElement.css('height', CONFIG.TABLE_HEIGHT + 'px');
            myElement.parent().css('height', CONFIG.TABLE_HEIGHT + 'px');
            myElement.html('');

            state.pageIndexData.sort((a, b) => b.money - a.money);
            state.pageIndexData.forEach((item, index) => {
                myElement.append(`<li><label class="list-tip">TOP${index + 1}</label><span class="ml20 pointer">${item.domain}</span><label class="fr">$${item.money}</label></li>`);
            });

            document.title = 'home';
            $('.addata-box').remove();

            const element = $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(2)');
            if (element.text().indexOf('账户消耗排名') === -1) {
                element.remove();
            }
            $('#root > section.ant-layout.ant-layout-has-sider > section > section > div:nth-child(5)').remove();
        } catch (error) {
            console.error('Error in pageIndex:', error);
        }
    },

    pageChart() {
        try {
            const domain = state.currentCompany.domains[state.currentDomainKey];
            if (!domain) return;

            document.title = state.currentDomainKey + 1;

            $('#rc-tabs-0-panel-1').css('height', CONFIG.CHART_HEIGHT + 'px');
            $('input[placeholder="开始日期"]').val(utils.formatDate()[0]);
            $('input[placeholder="结束日期"]').val(utils.formatDate()[3]);
            $('.ant-pagination-total-text').text(`总共 ${utils.formatDate().length} 条`);

            const moneyArr = [];
            let moneySum = 0;
            utils.formatDate().forEach(() => {
                const currentMoney = utils.calculateAdFee(state.currentCompany.domainMoney[domain]);
                moneySum += currentMoney;
                moneyArr.push(currentMoney);
            });
            moneySum = Number(moneySum.toFixed(2));

            state.pageIndexData.push({
                domain: domain,
                money: moneySum
            });

            const trID = state.currentCompany.ids[state.currentDomainKey];
            const trHtml = utils.formatDate().map((date, i) => {
                const trClickRate = Number((Math.random() * (4 - 1) + 1).toFixed(2));
                const trClickCount = Number((trClickRate * moneyArr[i]).toFixed(0));
                const trDisplayCount = Number((trClickCount / (trClickRate / 100)).toFixed(0));
                const trPeopleCount = Number((trDisplayCount * 0.8).toFixed(0));

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

            setTimeout(() => {
                const dom = document.getElementById('rc-tabs-0-panel-1');
                const myChart = echarts.init(dom, null, {renderer: 'canvas', useDirtyRect: false});
                const option = {
                    xAxis: {type: 'category', data: utils.formatDate()},
                    yAxis: {type: 'value'},
                    series: [{data: moneyArr, type: 'line'}]
                };
                if (option && typeof option === 'object') {
                    myChart.setOption(option);
                }
                window.addEventListener('resize', myChart.resize);
                console.log('done', new Date());
            }, CONFIG.CHART_DELAY);
        } catch (error) {
            console.error('Error in pageChart:', error);
        }
    }
};

// URL change handler
function handleURLChange() {
    if (window.location.pathname.indexOf('/index/workplat') >= 0) {
        setTimeout(() => pageHandlers.pageIndex(), CONFIG.INITIAL_DELAY);
    } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
        pageHandlers.pageChart();
    }
}

// Global functions for console commands
window.nextDomain = function () {
    state.currentDomainKey++;
    pageHandlers.pageChart();
};

window.resetIndex = function () {
    pageHandlers.pageIndex();
};

// Initialize
console.log('init', new Date());

$(document).ready(() => {
    let currentURL = window.location.href;

    $(window).on('popstate', () => {
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    });

    const _pushState = history.pushState;
    const _replaceState = history.replaceState;

    history.pushState = function() {
        _pushState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    history.replaceState = function() {
        _replaceState.apply(history, arguments);
        if (currentURL !== window.location.href) {
            currentURL = window.location.href;
            handleURLChange();
        }
    };

    setTimeout(() => {
        if (window.location.pathname.indexOf('/index/workplat') >= 0) {
            pageHandlers.pageIndex();
        } else if (window.location.pathname.indexOf('/datamanage/account') >= 0) {
            pageHandlers.pageChart();
        }
    }, CONFIG.INITIAL_DELAY);
});

/**
 * 控制台命令说明：
 *
 * 1. 切换到下一个域名并更新图表：
 * nextDomain()
 *
 * 2. 重置首页数据：
 * resetIndex()
 *
 * 注意：这些命令只能在控制台中执行
 */
