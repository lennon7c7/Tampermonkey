// ==UserScript==
// @name         auto click
// @version      1.0
// @description  click something or make some operations fast
// @author       Lennon
// @match        https://www.fuyin9.com/shengjing/read/niv/*
// @match        https://goerlifaucet.com
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @require      https://file2.yueka.com/shengjing/static/js/jquery.jplayer.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.fuyin9.com']) >= 0) {
        siteFuyin9();
    } else if ($.inArray(location.hostname, ['goerlifaucet.com']) >= 0) {
        siteGoerli();
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
        ended: function() {
            document.getElementById("next").click();

        }
    });
    setTimeout(function () {
        $('#kuPlayer').jPlayer('play');
    }, 3000);
}

/**
 * 自动获取eth
 */
function siteGoerli() {
    setTimeout(function () {
        let address = '0xdb378422487862250140E1aF6AeCEFA0BB59b8d8'
        $('.alchemy-faucet-panel-input-text').val(address)
        $('.alchemy-faucet-button').click()
    }, 10000);
}
