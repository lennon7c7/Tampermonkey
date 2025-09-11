// ==UserScript==
// @name         auto click
// @version      1.0
// @description  click something or make some operations fast
// @author       Lennon
// @match        https://*.zhihu.com/*
// @match        https://www.fuyin9.com/shengjing/read/niv/*
// @match        https://sepolia-faucet.pk910.de/*
// @match        https://movie.douban.com/*
// @match        https://bitcoinfaucet.uo1.net/send.php
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
    } else if (location.hostname.search('movie.douban.com') !== -1) {
        siteDouban();
    } else if (location.hostname.search('uo1.net') !== -1) {
        siteBitcoinfaucet();
    }

    console.log('done', new Date());
}, 3000);

function siteBitcoinfaucet() {
    var maxWait = 60000; // 最大等待时间 60 秒
    var interval = 1000; // 检查间隔 1 秒
    var elapsed = 0;

    var checkInterval = setInterval(function () {
        elapsed += interval;

        if ($('altcha-widget').text().trim() === 'Verified') {
            clearInterval(checkInterval); // 停止轮询

            // 点击 span（带 onclick 的）
            $("span[onclick]").trigger('click');

            // 设置地址
            $('#validationTooltipAddress').val('tb1qrahxudg6m3x3j7e0g08gwrm7jdmf2w9avcprlk')
                .val('tb1qa8u8xt0ay074nq7egcrqhulr256gy62pcrm7vq')
                .val('tb1qhy7ssfgex2pu3va4lmsa9xmc5jst72vc0c5gdz');

            // 点击发送按钮
            $('#send_btn').trigger('click');
        } else if (elapsed >= maxWait) {
            clearInterval(checkInterval); // 超时后停止轮询
            console.warn("等待 Verified 超时，未执行操作");
        }
    }, interval);
}

function siteDouban() {
    // 定义一个函数用于检查按钮并点击
    function checkAndClickSave() {
        var $btn = $('input[type="submit"][name="save"][value="保存"]');
        if ($btn.length > 0) {
            $btn.click();
            console.log("按钮已点击");
        }
    }

    // 设置定时循环，每隔1秒执行一次
    setInterval(checkAndClickSave, 5000);
}

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
