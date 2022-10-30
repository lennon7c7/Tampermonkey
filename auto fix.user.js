// ==UserScript==
// @name         auto fix
// @version      1.0
// @description  fix something or make some operations fast
// @author       Lennon
// @match        https://www.dy2018.com/*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.dy2018.com']) >= 0) {
        siteDy2018();
    }
}, 3000);

function siteDy2018() {
    $('a[title="迅雷专用高速下载"]').each(function (index, e) {
        if ($(e).attr('href') !== '#') {
            return
        }

        $(e).attr('href', $(e).text())
    });
}
