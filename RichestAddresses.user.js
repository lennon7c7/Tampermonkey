// ==UserScript==
// @name         地址转文本下载
// @namespace
// @version      1.0
// @description  访问页面，自动导出TXT文件
// @author       Lennon
// @match        https://bitinfocharts.com/top-100-*-addresses.html
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @require      https://js.zapjs.com/js/download.js
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// @icon         https://s.cn.bing.net/th?id=OJ.F0zB41fAcHvL1g&pid=MsnJVFeeds&w=16&h=16
// ==/UserScript==
'use strict';

let coinFilename = '';
let coinContent = '';

async function siteBitinfocharts() {
    await sleep(10000);

    // 正则表达式：匹配 - 后，直到遇到 .html 为止的所有字符
    const regexPageUrl = /-(\d+)\.html/;

    // 正则表达式：匹配 /address/ 后，直到遇到 "/" 或 "?" 为止的所有字符
    const regexAddress = /\/address\/([^\/?]+)/;

    let pageUrl = location.href
    let match = pageUrl.match(regexPageUrl);
    let startPageSize = 1;
    if (!match) {
        pageUrl = pageUrl.replace('addresses.html', 'addresses-1.html');
    } else {
        startPageSize = match[1];
    }
    let maxPageSize = 100;


    for (let i = startPageSize; i <= maxPageSize; i++) {
        var newPageUrl = pageUrl.replace(regexPageUrl, `-${i}.html`);
        await $.ajax({
            url: newPageUrl,
            type: 'GET',
            success: function (res) {
                $(res).find('td > a').map(function () {
                    let address = $(this).attr('href')
                    const match = address.match(regexAddress);
                    if (match) {
                        address = match[1]
                        coinContent += address + '\n';
                    } else {
                        console.error("未匹配到地址:", address);
                    }

                }).get();
            }
        });
    }

    coinFilename = `${document.title}.txt`;
    download(coinContent, coinFilename, 'text/plain');
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
