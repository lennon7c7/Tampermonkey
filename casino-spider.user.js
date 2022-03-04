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
    // plan a
    // sometime page don't have data
    // for (var i = 0; i < $('.ipn-Classification').length; i++) {
    //     await gameMore();
    // }

    // plan b
    await gameMore();
    location.reload();
}


async function gameMore() {
    for (var i = 0; i < $('.ipn-Classification').length; i++) {
        var categoryName = $($('.ipn-Classification')[i]).find('.ipn-ClassificationButton_Label').text();
        if (categoryName !== '足球') {
            continue;
        }

        if (!$($('.ipn-Classification')[i]).hasClass('ipn-Classification-open')) {
            $($('.ipn-Classification')[i]).click();
        }

        console.log('categoryName', categoryName);
        // 赛事
        for (var j = 0; j < $('.ipn-Competition').length; j++) {
            var competitionName = $($('.ipn-Competition')[j]).find('.ipn-CompetitionButton_Text').text();
            console.log('competitionName', competitionName);

            if ($($('.ipn-Competition')[j]).hasClass('ipn-Competition-closed ')) {
                $($('.ipn-Competition')[j]).click();
            }

            await sleep(1000);
            for (var k = 0; k < $($('.ipn-Competition')[j]).find('.ipn-Fixture').length; k++) {
                var teamName = [];
                $($($('.ipn-Competition')[j]).find('.ipn-Fixture')[k]).find('.ipn-Fixture_Team').each(function (index4, element4) {
                    teamName.push($(element4).text());
                });
                console.log('teamName', teamName);

                var teamScore = [];
                $($($('.ipn-Competition')[j]).find('.ipn-Fixture')[k]).find('.ipn-ScoresDefault_Score > .ipn-ScoresDefault_Score').each(function (index4, element4) {
                    teamScore.push($(element4).text());
                });
                console.log('teamScore', teamScore);

                if (!$($($('.ipn-Competition')[j]).find('.ipn-Fixture')[k]).hasClass('ipn-Fixture-selected')) {
                    $($($('.ipn-Competition')[j]).find('.ipn-Fixture')[k]).click();
                    await sleep(2000);
                }

                // '科莫 v 科森察'
                // $('.ipe-EventHeader_ClockContainer').text()
                var eventName = $('.ipe-EventHeader_Fixture').text();
                console.log('eventName', eventName);

                // 72:27
                var eventClock = $('.ipe-EventHeader_ClockContainer').text()
                console.log('eventClock', eventClock);

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
                            console.debug('odd_info not match');
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

                        console.table('odd_info', odd_info);
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

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

/**
 *
 * @param {int} duration
 */
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}
