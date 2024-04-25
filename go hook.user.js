// ==UserScript==
// @name         go hook
// @version      1.0
// @description
// @author       Lennon
// @match        https://replicate.com/fofr/sticker-maker*
// @grant        GM_xmlhttpRequest
// @connect      *
// @connect      localhost
// @connect      127.0.0.1
// @connect      127.0.0.1:31051
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';

    console.debug('---------- start ----------');

    var remoteScript = document.createElement('script');
    remoteScript.src = 'http://127.0.0.1:31051/static/js/jquery-2.1.1.js';
    document.head.appendChild(remoteScript);

    remoteScript = document.createElement('script');
    remoteScript.src = 'http://127.0.0.1:31051/static/js/ajaxhook.min.js';
    document.head.appendChild(remoteScript);


    function init() {
        let goHook = new GoHook(GM_xmlhttpRequest);
        goHook.start()
    }

    setTimeout(function () {
        remoteScript = document.createElement('script');
        remoteScript.src = 'http://127.0.0.1:31051/static/js/go-hook.js?v=' + (+new Date());
        remoteScript.onload = init;
        document.head.appendChild(remoteScript);
    }, 5000);

    console.debug('---------- end ----------');
})();
