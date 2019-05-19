// ==UserScript==
// @name         文本下载
// @namespace    https://boxnovel.baidu.com/
// @version      1.0
// @description  生成下载按钮，导出成TXT文件
// @author       Lennon
// @match        https://boxnovel.baidu.com/boxnovel/*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @run-at       document-end
// @icon         https://s.cn.bing.net/th?id=OJ.F0zB41fAcHvL1g&pid=MsnJVFeeds&w=16&h=16
// ==/UserScript==
(function () {
    'use strict';

    var myAwesomeScript = document.createElement('script');
    myAwesomeScript.setAttribute('src', 'https://code.jquery.com/jquery-2.1.1.min.js');
    document.head.appendChild(myAwesomeScript);

    var url = '';
    var gid = '';
    var cid = '';
    var title = '';
    var content = '';

    setTimeout(function () {
        if (location.host === 'boxnovel.baidu.com') {
            url = 'https://boxnovel.baidu.com/boxnovel/wiseapi/chapterContent';
            gid = getQueryVariable('gid');
            cid = getQueryVariable('cid');
            title = '';
            content = '';
            if (document.querySelectorAll('.header')[1]) {
                title = document.querySelectorAll('.header')[1].textContent;
            } else if (document.querySelector('title')) {
                title = document.querySelector('title').textContent;
            }

            siteBaidu(cid);
        }
    }, 3000);

    function siteBaidu(next_cid) {
        if (!next_cid) {
            return;
        }

        $.ajax({
            url: url,
            data: {
                bookid: gid,
                cid: next_cid,
            },
            async: false,
            dataType: 'json',
            type: 'GET',
            success: function (res) {
                content += `${res.data.title}\n`;
                res.data.content.forEach(function (value) {
                    content += `${value}\n`;
                });
                content += `\n\n`;

                if (!res.data.pt.next_cid) {
                    addDownloadButton(`${title}.txt`, content);
                    return;
                }

                setTimeout(function () {
                    siteBaidu(res.data.pt.next_cid);
                }, 100);
            }
        });
    }

    function addDownloadButton(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.innerText = '下载TXT';
        document.body.prepend(element);
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
})();
