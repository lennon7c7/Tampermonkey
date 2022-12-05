// ==UserScript==
// @name         auto click
// @version      1.0
// @description  click something or make some operations fast
// @author       Lennon
// @match        https://www.fuyin9.com/shengjing/read/niv/*
// @match        https://goerlifaucet.com
// @match        https://link.csdn.net/?target=*
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://file2.yueka.com/shengjing/static/js/jquery.jplayer.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.fuyin9.com']) >= 0) {
        siteFuyin9();
    } else if ($.inArray(location.hostname, ['link.csdn.net']) >= 0) {
        siteCsdn();
    }
}, 3000);

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

function siteCsdn() {
    // 自动jump
    let link = $("a:contains('继续')").attr('href')
    if (link) {
        window.location.href = link
    }
}
