// ==UserScript==
// @name         地址转文本下载
// @namespace
// @version      1.0
// @description  访问页面，自动导出TXT文件
// @author       Lennon
// @match        https://bitinfocharts.com/top-100-richest-bitcoin-addresses-1.html
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @require      https://js.zapjs.com/js/download.js
// @grant        GM_xmlhttpRequest
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

async function siteBitinfocharts() {
    await sleep(10000);

    let maxPageSize = 100;
    for (let i = 1; i <= maxPageSize; i++) {
        let pageUrl = `https://bitinfocharts.com/top-100-richest-bitcoin-addresses-${i}.html`

        await $.ajax({
            url: pageUrl,
            type: 'GET',
            success: function (res) {
                $(res).find('td > a').map(function () {
                    let address = $(this).attr('href')
                    address = address.replace('https://bitinfocharts.com/bitcoin/address/', '')
                    novelContent += address + '\n';
                }).get();
            }
        });
    }

    novelFilename = `${location.host}.txt`;
    download(novelContent, novelFilename, 'text/plain');
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

    if (location.host === 'bitinfocharts.com') {
        await siteBitinfocharts();
    }

    console.debug('---------- end ----------');
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

main()
