// ==UserScript==
// @name            自动复制某元素的值
// @namespace       https://links.baibaoyun.net/f/5ddee75b0e7a2d2fddb65d0d
// @version         1.0
// @description     cause I'm busy
// @author          Lennon
// @match           https://links.baibaoyun.net/*/*
// @require         https://code.jquery.com/jquery-2.1.1.min.js
// @require         https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.8/clipboard.min.js
// @run-at          document-end
// @icon            https://pub-files.baibaoyun.com/favicon.ico
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(function () {
        // 因为原宽度太窄不方便查看，所以加宽显示
        $('.fui_combo').css('width', '100%');

        $('body').append(`
            <input style="display: none" id="hiddenCopyInput"/>
            <button style="display: none" id="hiddenCopyButton" data-clipboard-target="#hiddenCopyInput"></button>
        `);

        listenElement('.fui_trigger-input', listenElementCallback);

        new ClipboardJS('#hiddenCopyButton', {
            text: function () {
                var newValue = $('#hiddenCopyInput').val();
                toast('已复制：' + newValue);
                return newValue;
            }
        });
    }, 1000);

    /**
     * 监听元素的值变化后，执行回调方法
     * @param {string} selector 元素选择器，比如：.fui_trigger-input
     * @param {function} callback 回调函数，比如：function (newValue) { console.log('changed: ', newValue) }
     */
    function listenElement(selector, callback) {
        var input = $(selector);
        var oldValue = input.val();
        setInterval(function () {
            if (input.val() !== oldValue) {
                oldValue = input.val();
                callback(oldValue);
            }
        }, 300);
    }

    /**
     * 执行回调方法
     * @param {string} newValue 元素选择器，比如：.fui_trigger-input
     */
    function listenElementCallback(newValue) {
        if (!newValue) {
            return;
        }

        $('#hiddenCopyInput').val(newValue);
        // 复制该值
        $("#hiddenCopyButton").trigger('click');
    }

    /**
     * 简单提示信息
     * @param msg 文案
     * @param duration 显示时间（单位：毫秒），非必填，默认3秒
     */
    function toast(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }
})();
