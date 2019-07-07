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
let novelFilename = '';
let novelTitle = '';
let novelContent = '';
let novelContentReplace = {};

setTimeout(function () {
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
        novelTitle = bookInfo.name;
        novelUrl = `${location.origin}${API_URL}/${novelBookid}/${novelChapterid}`;

        siteZhangyue(decodeURIComponent(novelUrl));
    } else if (location.host === 'wenxue.m.iqiyi.com') {
        novelBookid = location.pathname.replace('.html', '').split('/')[2].split('-')[1];
        novelChapterid = location.pathname.replace('.html', '').split('/')[2].split('-')[2];
        novelTitle = $('.cutoption:contains("下一章")').attr('title').split('-')[1];
        novelUrl = location.href;

        siteIqiyi(decodeURIComponent(novelUrl));
    } else if (location.host === 'www.bbiquge.com') {
        novelBookid = location.pathname.replace('book_', '').split('/')[1];
        novelTitle = $('meta[name="keywords"]').attr('content').split(',')[0];
        novelUrl = location.href;

        siteBiquge(decodeURIComponent(novelUrl));
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
}, 3000);

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

function siteBiquge(novelUrl) {
    if (!novelUrl) {
        return;
    }

    $.ajax({
        url: novelUrl,
        async: false,
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.overrideMimeType('text/html;charset=gbk');
        },
        success: function (res) {
            let novelChapterName = $(res).find('.bookname > h1').text();

            let tempContent = $(res).find('#content').text();
            tempContent = tempContent.replace('一秒记住【笔趣阁 www.bbiquge.com】，精彩小说无弹窗免费阅读！', '').replace('《玩宋》/春溪笛晓', '').trim();

            novelContent += `${novelChapterName}\r\n${tempContent}\r\n\r\n`;

            setTimeout(function () {
                let elementNextChapter = $($(res).find('.bottem > a')[3]);
                if (elementNextChapter.attr('href').includes('.html') === false) {
                    if (novelContent) {
                        novelFilename = `${novelTitle}.txt`;
                        download(novelContent, novelFilename, 'text/plain');
                    }

                    return;
                }

                novelUrl = elementNextChapter.attr('href');

                siteBiquge(novelUrl);
            }, 100);
        }
    });
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
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            if (res.code !== 0 && res.msg !== 'OK' && !res.html) {
                if (novelContent) {
                    novelFilename = `${novelTitle}.txt`;
                    download(novelContent, novelFilename, 'text/plain');
                }

                return;
            }

            novelChapterid++;
            novelUrl = `${location.origin}${API_URL}/${novelBookid}/${novelChapterid}`;

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
    return (false);
}
