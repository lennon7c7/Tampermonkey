// ==UserScript==
// @name         auto fix
// @version      1.0
// @description  fix something or make some operations fast
// @author       Lennon
// @match        https://www.dy2018.com/*
// @match        https://studio.ximalaya.com/opus
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js
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
   // 因为搜索限制，所以此方式解除搜索限制
   $.cookie('pescdlastsearchtime', 0, { expires: 0 });

   $('a[title="迅雷专用高速下载"]').each(function (index, e) {
        if ($(e).attr('href') !== '#') {
            return
        }

        $(e).attr('href', $(e).text())
    });
}
