// ==UserScript==
// @name         auto login
// @version      1.0
// @description  cause I'm busy
// @author       Lennon
// @match        https://qiye.163.com/login*
// @match        http://mail.ym.163.com/*
// @match        *ym.163.com*
// @match        *.wulihub.com.cn/*
// @match        *.mesio.cn:28282/*
// @match        *.juzikuaidai.com:36081/*
// @match        *.youbo.mesio.cn/*
// @match        *localhost/*
// @match        https://git1.maoshi.ltd/users/sign_in
// @match        https://advertiser.cheetahgo.cmcm.com/login/login
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @run-at       document-end
// @icon         http://icons.iconarchive.com/icons/iconshock/cms/128/user-login-icon.png
// ==/UserScript==
'use strict';

setTimeout(function () {
    if ($.inArray(location.hostname, ['api.dev.juzikuaidai.com', 'localhost']) >= 0) {
        siteJuzikuaidai();
    } else if ($.inArray(location.hostname, ['wiki.mesio.cn']) >= 0) {
        siteMesioWiki();
    } else if ($.inArray(location.hostname, ['www.wulihub.com.cn']) >= 0) {
        siteWulihub();
    } else if ($.inArray(location.hostname, ['qiye.163.com', 'mail.ym.163.com', 'ym.163.com']) >= 0) {
        site163mail();
    } else if ($.inArray(location.hostname, ['git1.maoshi.ltd']) >= 0) {
        siteGitlab();
    } else if ($.inArray(location.hostname, ['advertiser.cheetahgo.cmcm.com']) >= 0) {
        siteCheetahgo();
    }
}, 2000);

function siteCheetahgo() {
    var elementUsername = $('#cellphone');
    var elementPassword = $('#password');
    var elementButton = $('.submit-btn');
    elementUsername.val('18607714327')
    elementPassword.val('Lennon7c7')
    console.log('elementUsername.val(): ', elementUsername.val())
    if (!elementUsername.val() || !elementPassword.val() || !elementButton.length) {
        return false;
    }

    elementButton.click();
}

function siteGitlab() {
    var elementUsername = $('#user_login');
    var elementPassword = $('#user_password');
    var elementButton = $('input[value="Sign in"]');
    if (!elementUsername.val() || !elementPassword.val() || !elementButton.length) {
        return false;
    }

    elementButton.click();
}

function site163mail() {
    var url = 'https://qiye.163.com/login';
    var otherUrl = ['ym.163.com'];
    var elementGotologin = $('#gotologin');
    if ($.inArray(location.host, otherUrl) >= 0 || elementGotologin.text()) {
        location.href = url;
        return false;
    }

    // login
    var elementUsername = $('#accname');
    var elementPassword = $('#accpwd');
    var elementRememberme = $('#accautologin');
    var elementButton = $('.js-loginbtn');
    if (elementUsername.length && elementPassword.length && elementButton.length) {
        if (elementButton.length) {
            elementRememberme.attr('checked', true);
        }

        setTimeout(function () {
            elementButton.click();
        }, 1000);
    }

    // redirect to unread
    var oldHash = '#module=welcome';
    var newHash = '#module=mbox&allunread=true';
    if (location.hash === oldHash) {
        location.hash = newHash;
        return false;
    }
}

function siteWulihub() {
    var elementPassword = $('input[name="password"]');
    var elementButton = $('input[value="访问"]');
    if (!elementPassword.val() || !elementButton.length) {
        return false;
    }

    elementButton.click();
}

function siteMesioWiki() {
    var url = '/login';
    var otherError = ['HTTP 403 ： 权限不足'];
    if ($.inArray($('.title').text(), otherError) >= 0 || $('a[title="用户登录"]').length) {
        location.href = url;
        return false;
    }

    var elementUsername = $('#account');
    var elementPassword = $('#password');
    var elementButton = $('#btn-login');
    if (!elementUsername.val() || !elementPassword.val() || !elementButton.length) {
        return false;
    }

    elementButton.click();
}

function siteJuzikuaidai() {
    var elementUsername = $('#loginform-username');
    var elementPassword = $('#loginform-password');
    var elementButton = $('button[name="login-button"]');
    if (!elementUsername.val() || !elementPassword.val() || !elementButton.length) {
        return false;
    }

    elementButton.click();
}
