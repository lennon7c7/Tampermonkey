// ==UserScript==
// @name         365分析
// @version      1.0
// @description
// @author       Lennon
// @match        https://www.365-023.com/*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest
// @connect      *
// @connect      localhost
// @connect      127.0.0.1
// @connect      127.0.0.1:31050
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';

    console.debug('---------- start ----------');

    var remoteScript = document.createElement('script');
    remoteScript.src = 'https://code.jquery.com/jquery-2.1.1.min.js';
    document.head.appendChild(remoteScript);


    function initBet365() {
        let bet365 = new Bet365(GM_xmlhttpRequest);
        bet365.start()
    }

    setTimeout(function () {
        remoteScript = document.createElement('script');
        remoteScript.src = 'http://127.0.0.1:31050/static/js/bet365.js?v=' + (+new Date());
        remoteScript.onload = initBet365;
        document.head.appendChild(remoteScript);
    }, 3000);


    console.debug('---------- end ----------');
})();
