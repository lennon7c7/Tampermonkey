// ==UserScript==
// @name         auto click
// @version      1.0
// @description  click something or make some operations fast
// @author       Lennon
// @match        https://*.zhihu.com/*
// @match        https://www.fuyin9.com/shengjing/read/niv/*
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://file2.yueka.com/shengjing/static/js/jquery.jplayer.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.fuyin9.com']) >= 0) {
        siteFuyin9();
    } else if (location.hostname.search('zhihu.com') !== -1) {
        siteZhihu();
    }
}, 3000);

function siteZhihu() {
    $('.Modal-closeButton').click();
    $('.css-1rgloxd').click();
    $('.css-1ynzxqw').hide();
}

/**
 * 自动播放
 * 首先得先点击播放按钮一次
 */
function siteFuyin9() {
    $("#kuPlayer").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", meida).jPlayer("play");
            autoplay(2);
            changesize(16);
        },
        solution: "html",
        supplied: "mp3",
        wmode: "window",
        ended: function () {
            document.getElementById("next").click();

        }
    });
    setTimeout(function () {
        $('#kuPlayer').jPlayer('play');
    }, 3000);
}
