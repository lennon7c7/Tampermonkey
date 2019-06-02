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
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @require      https://js.zapjs.com/js/download.js
// @run-at       document-end
// @icon         https://s.cn.bing.net/th?id=OJ.F0zB41fAcHvL1g&pid=MsnJVFeeds&w=16&h=16
// ==/UserScript==
'use strict';

var novelUrl = '';
var novelBookid = '';
var novelChapterid = '';
var novelFilename = '';
var novelTitle = '';
var novelContent = '';

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
    }
}, 3000);

function siteIqiyi(novelUrl) {
    if (!novelUrl) {
        return;
    }

    var postData = {};
    if (!getQueryVariable('fr')) {
        postData.fr = 223946239;
    }

    $.ajax({
        url: novelUrl,
        data: postData,
        async: false,
        type: 'GET',
        success: function (res) {
            var novelChapterName = $(res).find('.c-name-gap').text();
            if (Number(novelChapterName)) {
                novelChapterName = `第${novelChapterName}章`;
            }

            var tempContent = '';
            $.each($(res).find('.c-contentB'), function (key, value) {
                tempContent += `   ${$(value).text().trim()}\r\n`;
            });

            novelContent += `${novelChapterName}\r\n${tempContent}\r\n\r\n`;

            setTimeout(function () {
                var elementNextChapter = $(res).find('.m-nav-footer-list li:nth-child(5) a');
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

            var elementContent = $(`<div>${res.html}</div>`);
            if (elementContent.find('span').length) {
                elementContent.find('span').remove();
                elementContent.find('img').remove();
                res.html = elementContent.text();
            } else {
                res.html = res.html.replace(/<s(\d+),(\d+)>(.*?)<\/s>/g, '<span data-left="$1" data-top="$2">$3</span>').replace(/<d (\d+),(\d+)>/g, '<div>').replace(/\/d/g, '/div');

                var tempContent = [];
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
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}
