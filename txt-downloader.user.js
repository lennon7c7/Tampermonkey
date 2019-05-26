// ==UserScript==
// @name         文本下载
// @namespace    https://boxnovel.baidu.com/
// @version      1.0
// @description  访问页面，自动导出TXT文件
// @author       Lennon
// @match        https://boxnovel.baidu.com/boxnovel/*
// @match        https://m.baidu.com/tcx*
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
    }
}, 3000);

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
