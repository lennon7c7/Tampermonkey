// ==UserScript==
// @name         365 api detail
// @version      1.0
// @description
// @author       Lennon
// @match        https://www.365-023.com/matchbettingcontentapi/*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';

    console.debug('---------- start ----------');

    function getUrlQueryVar(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    }

    GM_xmlhttpRequest({
        "url": "http://127.0.0.1:31050/bet365-spider-api",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "spiderFeat": getUrlQueryVar('spiderFeat'),
            "resp": $('pre').text(),
        }),
    })

    console.debug('---------- end ----------');
})();
