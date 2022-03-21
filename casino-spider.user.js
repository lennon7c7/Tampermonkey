// ==UserScript==
// @name         盘口分析
// @version      1.0
// @description
// @author       Lennon
// @match        https://www.365sb.com/*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @require      https://js.zapjs.com/js/download.js
// @run-at       document-end
// ==/UserScript==
'use strict';

console.debug('---------- start ----------');

setTimeout(function () {
    main();
}, 20000);

async function main() {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-2.1.1.min.js';
    document.head.append(script);

    checkCaptcha()

    if (location.host === 'www.365sb.com') {
        await siteBet365();
    }

    console.debug('---------- done ----------');
}

/**
 */
async function siteBet365() {
    switch (true) {
        case location.hash === '#/IP/B1':
            await soccerList();
            break;
        case location.hash.indexOf('#/IP/EV') !== -1:
            await soccerDetail();
            // location.reload();
            break;
        default :
            console.error('no match page hash');
            break;
    }
}


/**
 * 足球 - 滚球盘 详情页面
 * 循环所有该项赛事
 */
async function soccerDetail() {
    var elementSport = $('.ipn-Classification');
    for (var i = 0; i < elementSport.length; i++) {
        var categoryName = $(elementSport[i]).find('.ipn-ClassificationButton_Label').text();
        if (categoryName !== '足球') {
            continue;
        }

        if (!$(elementSport[i]).hasClass('ipn-Classification-open')) {
            $(elementSport[i]).click();
        }

        // 赛事
        var elementCompetition = $('.ipn-Competition');
        for (var j = 0; j < elementCompetition.length; j++) {
            var competitionName = $(elementCompetition[j]).find('.ipn-CompetitionButton_Text').text();

            if ($(elementCompetition[j]).hasClass('ipn-Competition-closed ')) {
                $(elementCompetition[j]).click();
            }

            await sleep(1000);
            for (var k = 0; k < $(elementCompetition[j]).find('.ipn-Fixture').length; k++) {
                var timer = $($(elementCompetition[j]).find('.ipn-Fixture')[k]).find('.ipn-Fixture_TimerContainer').text();
                saveTimer(categoryName, timer);

                var teamName = [];
                $($(elementCompetition[j]).find('.ipn-Fixture')[k]).find('.ipn-Fixture_Team').each(function (index4, element4) {
                    teamName.push($(element4).text());
                });

                var teamScore = [];
                $($(elementCompetition[j]).find('.ipn-Fixture')[k]).find('.ipn-ScoresDefault_Score > .ipn-ScoresDefault_Score').each(function (index4, element4) {
                    teamScore.push($(element4).text());
                });

                if (!$($(elementCompetition[j]).find('.ipn-Fixture')[k]).hasClass('ipn-Fixture-selected')) {
                    $($(elementCompetition[j]).find('.ipn-Fixture')[k]).click();
                    await sleep(2000);
                }

                // '科莫 v 科森察'
                // $('.ipe-EventHeader_ClockContainer').text()
                var eventName = $('.ipe-EventHeader_Fixture').text();

                $('.sip-MarketGroup').each(function (index4, element4) {
                    var marketGroup = $(element4).find('.sip-MarketGroupButton_Text').text();
                    // 亚洲让分盘
                    // if (marketGroup.indexOf('让分盘') !== -1 && $(element4).hasClass('sip-MarketGroup_Open')) {
                    //     $(element4).click();
                    // }

                    if (marketGroup.indexOf('大小盘') !== -1) {
                        if (!$(element4).find('.sip-MarketGroupButton').hasClass('sip-MarketGroup_Open')) {
                            $(element4).click();
                        }

                        var odd_info = [];
                        var participantLabel = $(element4).find('.srb-ParticipantLabelCentered_Name');
                        var participantOddOver = $(element4).find('.gl-MarketColumnHeader:contains("高于")').parent().find('.gl-Market_General-cn1');
                        var participantOddUnder = $(element4).find('.gl-MarketColumnHeader:contains("低于")').parent().find('.gl-Market_General-cn1');
                        if (!participantLabel || !participantOddOver || !participantOddUnder ||
                            participantLabel.length !== participantOddOver.length ||
                            participantOddOver.length !== participantOddUnder.length) {
                            console.error('odd_info not match');
                            return false;
                        }
                        participantLabel.each(function (index5, element5) {
                            odd_info[index5] = [];
                            odd_info[index5][0] = $.trim($(element5).text());
                        });

                        participantOddOver.each(function (index5, element5) {
                            odd_info[index5][1] = $.trim($(element5).text());
                        });

                        participantOddUnder.each(function (index5, element5) {
                            odd_info[index5][2] = $.trim($(element5).text());
                        });

                        odd_info = JSON.stringify(odd_info);
                        saveData({
                            competitionName: competitionName,
                            teamName: teamName,
                            teamScore: teamScore,
                            eventName: eventName,
                            timer: timer,
                            odd_info: odd_info,
                            site_id: 1,
                            site_name: 'bet365',
                        });
                    } else if ($(element4).find('.sip-MarketGroupButton').hasClass('sip-MarketGroup_Open')) {
                        $(element4).click();
                    }
                });
            }
        }
    }

    await soccerDetail()
}

/**
 * 足球 - 滚球盘 列表页面
 */
async function soccerList() {
    await listJumpToDetail()

    //$($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-CompetitionHeader_NameText').text()
    // '英格兰超级联赛'

    //$($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-InPlayTimer').text()
    // '55:13'

    //$($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-FixtureDetailsTwoWay_TeamName ').text()
    // '沃特福德阿森纳'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-FixtureDetailsTwoWay_TeamName:first').text()
    // '沃特福德'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-FixtureDetailsTwoWay_TeamName:last').text()
    // '阿森纳'

    //$($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-StandardScores_TeamOne').text()
    // '1'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-StandardScores_TeamTwo').text()
    // '2'

    //$($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-ParticipantStackedCentered_Handicap:first').text()
    // ' 4.0,4.5'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-ParticipantStackedCentered_Handicap:last').text()
    // ' 4.0,4.5'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-ParticipantStackedCentered_Odds:first').text()
    // '2.090'
    // $($('.ovm-CompetitionList > .ovm-Competition-open')[0]).find('.ovm-ParticipantStackedCentered_Odds:last').text()
    // '1.810'
}

/**
 * 保存数据
 * @param {object} data
 */
function saveData(data) {
    if (!data.competitionName) {
        console.error('competitionName is empty');
        return;
    }
    var game_name = data.competitionName;

    if (!data.teamName || data.teamName.length !== 2) {
        console.error('teamName is empty');
        return;
    }
    var team1_name = data.teamName[0];
    var team2_name = data.teamName[1];

    if (!data.teamScore || data.teamScore.length !== 2) {
        console.error('teamScore is empty');
        return;
    }
    var team1_score = data.teamScore[0];
    var team2_score = data.teamScore[1];

    if (!data.odd_info) {
        console.error('odd is empty');
        return;
    }
    var odd_info = data.odd_info;

    if (!data.site_id) {
        console.error('site_id is empty');
        return;
    }
    var site_id = data.site_id;

    if (!data.site_name) {
        console.error('site_name is empty');
        return;
    }
    var site_name = data.site_name;

    var settings = {
        "url": "https://localhost/spider",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "gameName": game_name,
            "team1Name": team1_name,
            "team1Score": team1_score,
            "team2Name": team2_name,
            "team2Score": team2_score,
            "oddInfo": odd_info,
            "siteID": site_id,
            "siteName": site_name
        }),
    };

    $.ajax(settings).done();

}


/**
 * 保存比赛时间
 * @param {string} sport
 * @param {string} timer
 */
function saveTimer(sport, timer) {
    if (!sport) {
        console.error('sport is empty');
        return;
    }

    if (!timer) {
        console.error('timer is empty');
        return;
    }

    timer = timer.split(':');
    if (timer.length !== 2) {
        console.error('after split is empty');
        return;
    }
    timer = timer[0];

    var keyTimer = sport + '-timer';
    var keyUrl = sport + '-url';
    if (!getCookie(keyTimer)) {
        setCookie(keyTimer, timer)
        setCookie(keyUrl, location.href)
    }

    if (getCookie(keyTimer) > timer) {
        setCookie(keyTimer, timer)
        setCookie(keyUrl, location.href)
    }

    return;
}

/**
 * 因为无法从列表click到详情页面，所以用此种迂回的方式跳转到详情页面，迈向自动化又前进一步
 */
async function listJumpToDetail() {
    var sport = $('.ovm-ClassificationHeader_Text').text()
    if (!sport) {
        return
    }

    var keyTimer = sport + '-timer'
    var keyUrl = sport + '-url'
    var cookieUrl = getCookie(keyUrl)
    if (getCookie(keyTimer) && cookieUrl) {
        // on macbook, this not work, try on pc
        location.href = cookieUrl;
        sleep(3000)
        location.reload()
    }
}

/**
 * 检查是否要验证码
 */
function checkCaptcha() {
    setInterval(function () {
        var documentTitle = ['Attention Required! | Cloudflare', 'Please Wait... | Cloudflare']
        if (documentTitle.indexOf(document.title) !== -1) {
            location.reload()
        }
    }, 60000)
}

/**
 * 延迟执行
 * @param {int} duration 毫秒
 */
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

/**
 * 设置cookie
 * @param key
 * @param value
 * @param day
 */
function setCookie(key, value, day) {
    if (!day) {
        day = 1;
    }
    var d = new Date();
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = key + '=' + value + '; ' + expires;
}

/**
 * 获取cookie
 * @param key
 * @return {string}
 */
function getCookie(key) {
    var name = key + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
