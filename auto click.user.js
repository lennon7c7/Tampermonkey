// ==UserScript==
// @name         auto click
// @version      1.0
// @description  click something or make some operations fast
// @author       Lennon
// @match        https://*.zhihu.com/*
// @match        https://www.fuyin9.com/shengjing/read/niv/*
// @match        https://sepolia-faucet.pk910.de/*
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://file2.yueka.com/shengjing/static/js/jquery.jplayer.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

// Initialize
console.log('init', new Date());

setTimeout(function () {
    if ($.inArray(location.hostname, ['www.fuyin9.com']) >= 0) {
        siteFuyin9();
    } else if (location.hostname.search('zhihu.com') !== -1) {
        siteZhihu();
    } else if (location.hostname.search('sepolia-faucet.pk910.de') !== -1) {
        siteSepoliaFaucet();
    }

    console.log('done', new Date());
}, 3000);

function siteSepoliaFaucet() {
    setInterval(function () {
        $('.btn-success').each(function () {
            if ($(this).text().trim() !== 'Start Mining') {
                $(this).click();
            }
        });
    }, 60000);
}

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
