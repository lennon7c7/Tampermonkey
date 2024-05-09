// ==UserScript==
// @name         titan007
// @version      1.0
// @description
// @author       Lennon
// @match        https://zq.titan007.com/jsData/teamInfo/teamDetail/tdl6.js
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

async function curlGet(reqUrl) {
    return await fetch(reqUrl)
        .then((response) => response.text())
        .then((result) => {
            return result
        })
        .catch((error) => console.error(error));
}

async function pageTeam() {
    let minTeamId = 7
    let maxTeamId = 99999
    let resp = ''
    for (let i = minTeamId; i < maxTeamId; i++) {
        let reqUrl = "https://zq.titan007.com/jsData/teamInfo/teamDetail/tdl" + i + ".js"
        await sleep(1000);
        resp = await curlGet(reqUrl)
        if (!resp || !resp.includes('var teamDetail =')) {
            console.error(i, '!resp || !resp.includes(\'var teamDetail =\')');
            continue
        }

        eval(resp)

        if (typeof teamDetail === 'undefined') {
            console.error(i, 'typeof teamDetail === \'undefined\'');
            continue
        }

        let maxLength = 4
        if (teamDetail.length < maxLength) {
            console.error(i, 'teamDetail.length < maxLength');
            continue
        }

        console.debug(teamDetail);

        GM_xmlhttpRequest({
            "url": "http://127.0.0.1:31050/titan007-team",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                team_id: teamDetail[0],
                language_id: 1,
                nickname: teamDetail[1],
            }),
        })

        GM_xmlhttpRequest({
            "url": "http://127.0.0.1:31050/titan007-team",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                team_id: teamDetail[0],
                language_id: 2,
                nickname: teamDetail[2],
            }),
        })

        GM_xmlhttpRequest({
            "url": "http://127.0.0.1:31050/titan007-team",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                team_id: teamDetail[0],
                language_id: 3,
                nickname: teamDetail[3],
            }),
        })
    }
}

async function main() {
    console.debug('---------- start ----------');

    if (location.pathname === '/jsData/teamInfo/teamDetail/tdl6.js') {
        await pageTeam();
    }

    console.debug('---------- end ----------');
}

main()