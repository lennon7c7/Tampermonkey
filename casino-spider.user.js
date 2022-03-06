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

setTimeout(function () {
    main();
}, 20000);

async function main() {
    console.debug('---------- start ----------');

    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-2.1.1.min.js';
    document.head.append(script);

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
        case location.hash.indexOf('#/IP/EV') >= 0:
            await soccerDetail();
            location.reload();
            break;
        default :
            console.error('no match page hash');
            break;
    }
}


/**
 * 在足球详情里面循环所有该项赛事
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

                // 72:27
                var eventClock = $('.ipe-EventHeader_ClockContainer').text()

                $('.sip-MarketGroup').each(function (index4, element4) {
                    var marketGroup = $(element4).find('.sip-MarketGroupButton_Text').text();
                    // 亚洲让分盘
                    // if (marketGroup.indexOf('让分盘') >= 0 && $(element4).hasClass('sip-MarketGroup_Open')) {
                    //     $(element4).click();
                    // }

                    if (marketGroup.indexOf('大小盘') >= 0) {
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
                            eventClock: eventClock,
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
}


/**
 * 在足球列表里面循环所有该项赛事
 */
async function soccerList() {
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

    var form = new FormData();
    form.append("GameParticipantodds[game_name]", game_name);
    form.append("GameParticipantodds[team1_name]", team1_name);
    form.append("GameParticipantodds[team1_score]", team1_score);
    form.append("GameParticipantodds[team2_name]", team2_name);
    form.append("GameParticipantodds[team2_score]", team2_score);
    // form.append("GameParticipantodds[team_info]", team_info);
    form.append("GameParticipantodds[odd_info]", odd_info);
    form.append("GameParticipantodds[site_id]", site_id);
    form.append("GameParticipantodds[site_name]", site_name);

    var settings = {
        "url": "https://erp2.maoshi.ltd/test/spider",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Connection": "keep-alive",
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done();
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
