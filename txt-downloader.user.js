// ==UserScript==
// @name         文本下载
// @namespace    https://boxnovel.baidu.com/
// @version      1.0
// @description  访问页面，自动导出TXT文件
// @author       Lennon
// @match        https://boxnovel.baidu.com/boxnovel/*
// @match        https://m.baidu.com/tcx*
// @match        http://m.zhangyue.com/readbook/*/*
// @match        https://wenxue.m.iqiyi.com/book/reader-*
// @match        https://www.bbiquge.com/book_*
// @match        https://www.bqzw789.org/*/*/*.html
// @match        https://www.qqxsnew.com/*/*/*.html
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @require      https://js.zapjs.com/js/download.js
// @run-at       document-end
// @icon         https://s.cn.bing.net/th?id=OJ.F0zB41fAcHvL1g&pid=MsnJVFeeds&w=16&h=16
// ==/UserScript==
'use strict';

let novelUrl = '';
let novelBookid = '';
let novelChapterid = '';
let novelChaptername = '';
let novelFilename = '';
let novelTitle = '';
let novelContent = '';
let novelContentReplace = {};
let bqgFontMap = {
    "㟦": "一",
    "㟧": "二",
    "㠫": "十",
    "㠬": "丁",
    "㠭": "厂",
    "㡭": "七",
    "㣇": "八",
    "㣈": "人",
    "㣉": "入",
    "㣊": "儿",
    "㤗": "九",
    "㤙": "几",
    "㤚": "了",
    "㥕": "刀",
    "㥖": "力",
    "㥧": "又",
    "㥨": "三",
    "㥫": "干",
    "㥯": "亏",
    "㦁": "土",
    "㦂": "工",
    "㦃": "才",
    "㦄": "寸",
    "㦅": "丈",
    "㦆": "大",
    "㦇": "与",
    "㦦": "万",
    "㦧": "上",
    "㦨": "小",
    "㦩": "口",
    "㦪": "山",
    "㦫": "巾",
    "㦬": "千",
    "㦱": "亡",
    "㦲": "义",
    "㦳": "之",
    "㦴": "尸",
    "㦵": "已",
    "㦶": "弓",
    "㦷": "己",
    "㦹": "也",
    "㦺": "飞",
    "㧖": "乞",
    "㧗": "川",
    "㧘": "亿",
    "㧙": "个",
    "㧚": "么",
    "㧛": "久",
    "㧜": "勺",
    "㧝": "丸",
    "㧞": "凡",
    "㧠": "及",
    "㨦": "习",
    "㨧": "叉",
    "㨩": "马",
    "㨪": "乡",
    "㨫": "丰",
    "㨬": "开",
    "㨼": "夫",
    "㨽": "天",
    "㨾": "元",
    "㨿": "无",
    "㩀": "云",
    "㩁": "扎",
    "㩘": "艺",
    "㩙": "五",
    "㩚": "支",
    "㩛": "厅",
    "㩶": "犬",
    "㩷": "区",
    "㩸": "尤",
    "㩹": "匹",
    "㩺": "车",
    "㩻": "巨",
    "㩼": "牙",
    "㩽": "屯",
    "㩾": "互",
    "㪏": "切",
    "㪐": "止",
    "㪑": "少",
    "㪒": "日",
    "㪧": "中",
    "㪨": "贝",
    "㪩": "冈",
    "㪪": "见",
    "㪫": "手",
    "㪲": "午",
    "㪳": "气",
    "㪴": "升",
    "㪵": "长",
    "㪶": "仁",
    "㪷": "片",
    "㪸": "化",
    "㪹": "仇",
    "㪺": "币",
    "㪻": "仍",
    "㪼": "仅",
    "㪽": "斤",
    "㪾": "爪",
    "㪿": "反",
    "㫀": "介",
    "㫅": "父",
    "㫆": "从",
    "㫇": "今",
    "㫈": "凶",
    "㫉": "乏",
    "㫊": "仓",
    "㫋": "氏",
    "㫌": "风",
    "㫠": "欠",
    "㫡": "丹",
    "㫢": "匀",
    "㫣": "乌",
    "㫤": "勾",
    "㫥": "凤",
    "㫦": "六",
    "㫧": "文",
    "㫨": "方",
    "㫩": "火",
    "㫪": "忆",
    "㫫": "订",
    "㫬": "户",
    "㫭": "认",
    "㫮": "心",
    "㫯": "尺",
    "㫷": "巴",
    "㫸": "队",
    "㫹": "办",
    "㫺": "以",
    "㫻": "允",
    "㫼": "予",
    "㮺": "幻",
    "㮻": "玉",
    "㮼": "末",
    "㮽": "未",
    "㮾": "击",
    "㰘": "打",
    "㰙": "巧",
    "㰚": "正",
    "㰛": "扑",
    "㰜": "功",
    "㰝": "扔",
    "㰰": "甘",
    "㰱": "世",
    "㰲": "古",
    "㰳": "节",
    "㰴": "本",
    "㰵": "术",
    "㰶": "可",
    "㰷": "丙",
    "㰸": "左",
    "㰹": "厉",
    "㰺": "石",
    "㱏": "右",
    "㱐": "布",
    "㱑": "龙",
    "㱒": "平",
    "㱓": "轧",
    "㱔": "东",
    "㱕": "的",
    "㱖": "是",
    "㱗": "在",
    "㱚": "不",
    "㱛": "有",
    "㱜": "和",
    "㱝": "这",
    "㱞": "为",
    "㱟": "国",
    "㱦": "我",
    "㱧": "电",
    "㱨": "由",
    "㱩": "只",
    "㱪": "要",
    "㱫": "他",
    "㲤": "时",
    "㲥": "来",
    "㳍": "叫",
    "㳎": "用",
    "㳏": "们",
    "㳐": "叹",
    "㳑": "四",
    "㳒": "失",
    "㳓": "生",
    "㳔": "到",
    "㳡": "代",
    "㳢": "作",
    "㳣": "地",
    "㳤": "于",
    "㳥": "出",
    "㵐": "就",
    "㵑": "分",
    "㵒": "乎",
    "㵓": "对",
    "㵔": "令",
    "㵕": "成",
    "㵖": "会",
    "㵗": "乐",
    "㵙": "句",
    "㵛": "册",
    "㵜": "外",
    "㶂": "处",
    "㶃": "冬",
    "㶄": "鸟",
    "㶅": "包",
    "㹏": "主",
    "㹐": "市",
    "㹑": "闪",
    "㹒": "发",
    "㹓": "年",
    "㹔": "动",
    "㹕": "头",
    "㹖": "汉",
    "㹗": "宁",
    "㺧": "它",
    "䀱": "百",
    "䀲": "同",
    "䀳": "能",
    "䀴": "而",
    "䁨": "下",
    "䁩": "过",
    "䁪": "子",
    "䁫": "说",
    "䁬": "产",
    "䁭": "种",
    "䁯": "面",
    "䁰": "后",
    "䁱": "多",
    "䁲": "定",
    "䃃": "学",
    "䃄": "法",
    "䃢": "行",
    "䃣": "至",
    "䃤": "此",
    "䋁": "所",
    "䋂": "民",
    "䋃": "得",
    "䋄": "光",
    "䋅": "经",
    "䋆": "进",
    "䋇": "虫",
    "䋝": "着",
    "䋞": "等",
    "䋟": "部",
    "䋠": "度",
    "䋡": "家",
    "䋢": "里",
    "䋣": "如",
    "䋤": "回",
    "䋥": "水",
    "䋦": "高",
    "䋧": "自",
    "䋨": "理",
    "䋩": "起",
    "䋪": "物",
    "䌞": "现",
    "䌟": "实",
    "䌠": "加",
    "䌡": "量",
    "䑓": "都",
    "䑔": "两",
    "䑕": "体",
    "䑖": "制",
    "䑗": "机",
    "䗕": "当",
    "䗖": "使",
    "䗗": "点",
    "䗘": "业",
    "䗙": "去",
    "䗻": "把",
    "䗼": "性",
    "䗽": "好",
    "䗾": "应",
    "䗿": "合",
    "䘂": "还",
    "䘓": "因",
    "䘔": "其",
    "䘘": "些",
    "䛈": "然",
    "䛉": "前",
    "䛊": "政",
    "䛋": "那",
    "䛌": "社",
    "䛍": "事",
    "䛎": "形",
    "䛏": "相",
    "䛐": "全",
    "䛑": "表",
    "䛒": "间",
    "䛓": "样",
    "䛔": "色",
    "䛕": "关",
    "䛖": "各",
    "䛗": "重",
    "䜥": "新",
    "䜧": "线",
    "䜨": "内",
    "䜪": "数",
    "䜬": "你",
    "䜭": "明",
    "䜮": "看",
    "䥉": "原",
    "䥊": "利",
    "䥋": "比",
    "䥌": "或",
    "䥍": "但",
    "䦡": "质",
    "䦢": "第",
    "䦣": "向",
    "䦤": "道",
    "䦥": "命",
    "䨈": "变",
    "䨉": "条",
    "䨊": "污",
    "䪟": "没",
    "䪠": "结",
    "䭴": "解",
    "䭵": "问",
    "䭶": "意",
    "䭷": "建",
    "䭸": "月",
    "䭹": "公",
    "䭺": "军",
    "䭻": "系",
    "䭼": "很",
    "䭽": "情",
    "䭾": "者",
    "䭿": "最",
    "䮀": "立",
    "䮁": "想",
    "䮊": "通",
    "䮋": "并",
    "䮌": "提",
    "䮍": "直",
    "䮎": "题",
    "䮏": "党",
    "䮷": "阶",
    "䮸": "阴",
    "䮹": "程",
    "䮺": "奸",
    "䮻": "展",
    "䯩": "妇",
    "䯪": "妈",
    "䯫": "戏",
    "䯬": "果",
    "䯭": "料",
    "䯮": "象",
    "䯯": "员",
    "䯰": "革",
    "䰂": "位",
    "䰃": "常",
    "䰄": "总",
    "䰅": "痉",
    "䲅": "茎",
    "䲆": "筑",
    "䲇": "弄",
    "䲈": "战",
    "䲉": "婴",
    "䲖": "轮",
    "䲗": "泽",
    "䲘": "胡",
    "䲙": "锦",
    "䲺": "涛",
    "䲻": "毛",
    "䲼": "林",
    "䲽": "湿",
    "䲾": "白",
    "䲿": "医",
    "䳀": "痹",
    "䶏": "疱",
    "䶐": "批",
    "䶑": "扯",
    "䶒": "疣",
    "䶓": "走",
    "丳": "抄",
    "丵": "坝",
    "丷": "贡",
    "乀": "裸",
    "乁": "赤",
    "乄": "枪",
    "乆": "抓",
    "乊": "女",
    "乕": "美",
    "僾": "罪",
    "噷": "交",
    "噸": "密",
    "噹": "宫",
    "嚠": "啊",
    "嚡": "爱",
    "嚢": "痒",
    "團": "她",
    "圙": "娼",
    "圚": "娈",
    "圛": "嫖",
    "圝": "媾",
    "堨": "屌",
    "塨": "残",
    "塺": "智",
    "塿": "共",
    "墵": "亲",
    "墷": "活",
    "墺": "克",
    "壄": "神",
    "壜": "丽",
    "夌": "李",
    "复": "独",
    "奫": "暴",
    "婈": "游",
    "婖": "集",
    "婤": "男",
    "婺": "死",
    "媐": "套",
    "媩": "骚",
    "媱": "操",
    "嫀": "足",
    "嫳": "插",
    "嬨": "圆",
    "嬮": "假",
    "嵗": "幼",
    "嵙": "弟",
    "嵚": "盗",
    "嵜": "货",
    "嵞": "芽",
    "嵟": "花",
    "巪": "爹",
    "巬": "跌",
    "巭": "劳",
    "櫿": "魔",
    "欇": "鬼",
    "欛": "殖",
    "欜": "器",
    "欝": "领",
    "鼲": "屁",
    "鼳": "逼",
    "鼴": "菊",
    "鼵": "婊",
    "鼶": "棒",
    "鼷": "极",
    "鼸": "消",
    "齀": "妹",
    "齂": "母",
    "훒": "卫"
};

/**
 * 网站-千千小说
 * 质量一般，偶尔会有错误章节
 * @param novelUrl
 */
function siteQqxs(novelUrl) {
    if (!novelUrl) {
        return;
    }

    $.ajax({
        url: novelUrl,
        async: false,
        type: 'GET',
        success: function (res) {
            let novelChapterName = $(res).find('.bookname > h1').text().trim();

            let tempContent = $(res).find('#content').text();
            $.each(novelContentReplace, function (key, value) {
                tempContent = tempContent.replace(value.searchValue, value.replaceValue);
            });
            tempContent = tempContent.trim();

            novelContent += `${novelChapterName}\r\n${tempContent}\r\n\r\n`;

            setTimeout(function () {
                let elementNextChapter = $($(res).find('.bottem1 > a.next'));
                if (elementNextChapter.attr('href').includes('.html') === false) {
                    if (novelContent) {
                        novelFilename = `${novelTitle}.txt`;
                        download(novelContent, novelFilename, 'text/plain');
                    }

                    return;
                }

                novelUrl = elementNextChapter.attr('href');

                siteQqxs(novelUrl);
            }, 100);
        }
    });
}

async function siteBiquge(novelUrl) {
    if (!novelUrl) {
        return;
    }
    await sleep(2000);

    novelUrl.split('/').forEach((val, index) => {
        if (index === 4) {
            novelBookid = val;
        } else if (index === 5) {
            novelChapterid = val.replace('.html', '').trim();
        }
    });

    let resp = await $.ajax({
        url: novelUrl,
        type: 'GET',
        success: function (res) {
            novelChaptername = $(res).find('.bookname > h1').text();
        }
    });

    try {
        let settings = {
            "url": "https://www.bqzw789.org/ajaxChapter.php?time=" + Date.now(),
            "method": "POST",
            "timeout": 0,
            dataType: "json",
            "headers": {
                "accept": "application/json, text/javascript, */*",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "priority": "u=1, i",
                "x-requested-with": "XMLHttpRequest"
            },
            "data": {
                "aid": novelBookid,
                "cid": novelChapterid
            },
        };
        let resp2 = await $.ajax(settings);
        let tempContent = resp2.content;
        tempContent = tempContent.replaceAll('<br/>', '\r\n');
        tempContent = tempContent.replaceAll('&nbsp;', ' ');
        let fixedContent = ''
        for (let i = 0; i < tempContent.length; i++) {
            if (bqgFontMap[tempContent[i]]) {
                fixedContent += bqgFontMap[tempContent[i]]
            } else {
                fixedContent += tempContent[i]
            }
        }

        if (novelChaptername && fixedContent) {
            novelContent += `${novelChaptername}\r\n${fixedContent}\r\n\r\n`;
        }
    } catch (error) {
        // Handle any errors
        // console.error(error);
    }

    let elementNextChapter = $($(resp).find('.bottem1 > a')[3]).attr('href');
    if (elementNextChapter) {
        elementNextChapter.split('/').forEach((val, index) => {
            if (index === 3) {
                novelChapterid = val.replace('.html', '').trim();
            }
        });
    }

    if (novelChaptername) {
        await siteBiquge(elementNextChapter);
    } else {
        if (novelContent) {
            novelFilename = `${novelTitle}.txt`;
            download(novelContent, novelFilename, 'text/plain');
        }
    }
}

function siteIqiyi(novelUrl) {
    if (!novelUrl) {
        return;
    }

    let postData = {};
    if (!getQueryVariable('fr')) {
        postData.fr = 223946239;
    }

    $.ajax({
        url: novelUrl,
        data: postData,
        async: false,
        type: 'GET',
        success: function (res) {
            let novelChapterName = $(res).find('.c-name-gap').text();
            if (Number(novelChapterName)) {
                novelChapterName = `第${novelChapterName}章`;
            }

            let tempContent = '';
            $.each($(res).find('.c-contentB'), function (key, value) {
                tempContent += `   ${$(value).text().trim()}\r\n`;
            });

            novelContent += `${novelChapterName}\r\n${tempContent}\r\n\r\n`;

            setTimeout(function () {
                let elementNextChapter = $(res).find('.m-nav-footer-list li:nth-child(5) a');
                if (elementNextChapter.attr('changeChapterId') === '') {
                    if (novelContent) {
                        novelFilename = `${novelTitle}.txt`;
                        download(novelContent, novelFilename, 'text/plain');
                    }

                    return;
                }

                novelUrl = elementNextChapter.attr('href');

                siteIqiyi(novelUrl);
            }, 100);
        }
    });
}

function siteZhangyue(novelUrl) {
    if (!novelUrl) {
        return;
    }

    $.ajax({
        url: novelUrl,
        async: false,
        data: {
            p2: 104155
        },
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            if (res.body.chapterName === novelChaptername) {
                if (novelContent) {
                    novelFilename = `${novelTitle}.txt`;
                    download(novelContent, novelFilename, 'text/plain');
                }

                return;
            }

            novelChapterid++;
            novelUrl = `${location.origin}/${novelBookid}/${novelChapterid}`;
            novelChaptername = res.body.chapterName;

            if (Number(res.body.chapterName)) {
                res.body.chapterName = `第${res.body.chapterName}章`;
            }

            let elementContent = $(`<div>${res.html}</div>`);
            if (elementContent.find('span').length) {
                elementContent.find('span').remove();
                elementContent.find('img').remove();
                // res.html = elementContent.html().replace(/<h2 (.*?)>(.*?)<\/h2>/g, '$2').replace(/<p (.*?)>(.*?)<\/p>/g, '$2').replace(/<div (.*?)>(.*?)<\/div>/g, '$2');
                res.html = elementContent.text();
            } else {
                res.html = res.html.replace(/<s(\d+),(\d+)>(.*?)<\/s>/g, '<span data-left="$1" data-top="$2">$3</span>').replace(/<d (\d+),(\d+)>/g, '<div>').replace(/\/d/g, '/div');

                let tempContent = [];
                $.each($(res.html).find('span'), function (key, value) {
                    tempContent[key] = `${$(value).attr('data-top').padStart(4, 0)}${$(value).attr('data-left').padStart(4, 0)}${$(value).text()}`;
                });
                tempContent.sort();

                res.html = '';
                $.each(tempContent, function (key, value) {
                    value = value.slice(8);
                    if (value === '') {
                        value = '\r\n';
                    }
                    res.html += value;
                });
            }

            novelContent += `${res.body.chapterName}\r\n${res.html}\r\n\r\n`;

            setTimeout(function () {
                siteZhangyue(novelUrl);
            }, 100);
        }
    });
}

function siteBaidu(next_cid) {
    if (!next_cid) {
        return;
    }

    $.ajax({
        url: novelUrl,
        data: {
            bookid: novelBookid,
            cid: next_cid,
        },
        async: false,
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            novelContent += `${res.data.title}\n`;
            res.data.content.forEach(function (value) {
                novelContent += `${value}\n`;
            });
            novelContent += `\n\n`;

            if (!res.data.pt.next_cid) {
                novelFilename = `${novelTitle}.txt`;
                download(novelContent, novelFilename, 'text/plain');
                return;
            }

            setTimeout(function () {
                siteBaidu(res.data.pt.next_cid);
            }, 100);
        }
    });
}

function siteBaiduTcx(novelChapterid, novelUrl) {
    if (!novelBookid || !novelChapterid || !novelUrl) {
        return;
    }

    $.ajax({
        url: location.origin + location.pathname,
        data: {
            appui: 'alaxs',
            page: 'api/chapterContent',
            gid: novelBookid,
            cid: novelChapterid,
            url: novelUrl,
        },
        async: false,
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            novelContent += `${res.data.title}\n${res.data.content}\n\n`;

            if (!res.data.pt.next_cid) {
                novelFilename = `${novelTitle}.txt`;
                download(novelContent, novelFilename, 'text/plain');
                return;
            }

            setTimeout(function () {
                siteBaiduTcx(res.data.pt.next_cid, res.data.pt.next_url);
            }, 100);
        }
    });
}

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

async function main() {
    console.debug('---------- start ----------');

    if (location.host === 'boxnovel.baidu.com') {
        novelUrl = 'https://boxnovel.baidu.com/boxnovel/wiseapi/chapterContent';
        novelBookid = getQueryVariable('gid');
        novelChapterid = getQueryVariable('cid');
        if (document.querySelectorAll('.header')[1]) {
            novelTitle = document.querySelectorAll('.header')[1].textContent;
        } else if (document.querySelector('title')) {
            novelTitle = document.querySelector('title').textContent;
        }

        siteBaidu(novelChapterid);
    } else if (location.host === 'm.baidu.com') {
        novelUrl = getQueryVariable('url');
        novelBookid = getQueryVariable('gid');
        novelChapterid = getQueryVariable('cid');
        if (document.querySelectorAll('.header')[1]) {
            novelTitle = document.querySelectorAll('.header')[1].textContent;
        } else if (document.querySelector('title')) {
            novelTitle = document.querySelector('title').textContent;
        }

        siteBaiduTcx(novelChapterid, decodeURIComponent(novelUrl));
    } else if (location.host === 'm.zhangyue.com') {
        novelBookid = location.pathname.replace('.html', '').split('/')[2];
        novelChapterid = location.pathname.replace('.html', '').split('/')[3];
        novelUrl = `${location.origin}/${novelBookid}/${novelChapterid}`;

        siteZhangyue(decodeURIComponent(novelUrl));
    } else if (location.host === 'wenxue.m.iqiyi.com') {
        novelBookid = location.pathname.replace('.html', '').split('/')[2].split('-')[1];
        novelChapterid = location.pathname.replace('.html', '').split('/')[2].split('-')[2];
        novelTitle = $('.cutoption:contains("下一章")').attr('title').split('-')[1];
        novelUrl = location.href;

        siteIqiyi(decodeURIComponent(novelUrl));
    } else if (location.host === 'www.bbiquge.com' || location.host === 'www.bqzw789.org') {
        novelBookid = location.pathname.replace('book_', '').split('/')[1];
        novelTitle = $('meta[name="keywords"]').attr('content').split(',')[0];
        novelUrl = location.href;

        await siteBiquge(decodeURIComponent(novelUrl));
    } else if (location.host === 'www.qqxsnew.com') {
        novelContentReplace = [
            {
                searchValue: '天才一秒记住本站地址：[千千小说]',
                replaceValue: '',
            },
            {
                searchValue: 'https://www.qqxsnew.com最快更新！无广告！',
                replaceValue: '',
            },
            {
                searchValue: new RegExp(/\s第(.*?)章\s/),
                replaceValue: '',
            },
            {
                searchValue: '这章超好看！',
                replaceValue: '',
            },
            {
                searchValue: $('meta[name="description"]').attr('content').replace(/千千小说提供了(.*?)创作的(.*?)干净清爽无错字的文字章节：(.*?)在线阅读。/, '$2/$1'),
                replaceValue: '',
            },
            {
                searchValue: '章节错误,点此报送(免注册),',
                replaceValue: '',
            },
            {
                searchValue: '报送后维护人员会在两分钟内校正章节内容,请耐心等待。',
                replaceValue: '',
            },
            {
                searchValue: new RegExp(/\s\s\s\s/, 'g'),
                replaceValue: '\n',
            },
        ];

        novelBookid = location.pathname.split('/')[2];
        novelTitle = $('meta[name="keywords"]').attr('content').split(',')[0];
        novelUrl = location.href;

        siteQqxs(decodeURIComponent(novelUrl));
    }

    console.debug('---------- end ----------');
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

main()
