// ==UserScript==
// @name         auto fix
// @version      1.2
// @description  fix something or make some operations fast
// @author       Lennon
// @match        https://www.dy2018.com/*
// @match        https://studio.ximalaya.com/opus
// @match        https://firstfintech.co.uk/*
// @match        https://*.firstfintech.co.uk/*
// @include      /^https:\/\/([^/]+\.)?firstfintech\.co\.uk(:\d+)?\//
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @require      https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

// firstfintech 验证码登录后才出现，这里用事件委托立即注册监听即可覆盖未来元素
if (location.hostname.indexOf('firstfintech.co.uk') >= 0) {
    siteFirstFintech();
}

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

function siteFirstFintech() {
    // 验证码为 6 个 maxlength=1 的输入框（.code-inputs > .code-input，Vue 渲染）。
    // 默认整体粘贴会被每个框截断成 1 个字符，导致无法粘贴。
    // 这里在捕获阶段接管 paste 事件，把粘贴内容按字符分发到各输入框，
    // 并派发 input/change 事件以同步 Vue 的 v-model。
    document.addEventListener('paste', function (e) {
        var target = e.target;
        if (!target || target.nodeType !== 1 || !target.classList || !target.classList.contains('code-input')) {
            return;
        }

        var clipboard = e.clipboardData || window.clipboardData;
        if (!clipboard) {
            return;
        }
        var chars = (clipboard.getData('text') || '').replace(/\s+/g, '').split('');
        if (!chars.length) {
            return;
        }

        // 阻止默认粘贴（避免整段文本塞进当前单格）以及框架可能存在的阻止粘贴逻辑
        e.preventDefault();
        e.stopImmediatePropagation();

        var container = target.closest('.code-inputs');
        if (!container) {
            return;
        }
        var inputs = container.querySelectorAll('.code-input');
        var start = Array.prototype.indexOf.call(inputs, target);
        if (start < 0) {
            start = 0;
        }

        // 通过原生 setter 赋值，兼容 Vue/React 等受控组件
        var valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        var filled = 0;
        for (var i = 0; i < chars.length && (start + i) < inputs.length; i++) {
            var input = inputs[start + i];
            valueSetter.call(input, chars[i]);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            filled++;
        }

        // 焦点跳到下一个待填格
        var next = inputs[start + filled];
        if (next) {
            next.focus();
        }
    }, true);
}
