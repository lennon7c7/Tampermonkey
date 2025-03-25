// ==UserScript==
// @name         bet365
// @version      1.0
// @description
// @author       Lennon
// @match        https://extra.365-023.com/ResultsApi*
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

//补0操作
function setZeroFill(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

function timestamp2Date(timestamp) {
    if (!timestamp) {
        return '';
    }

    let oDate = new Date(timestamp * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate();//最后拼接时间
    return oYear + '-' + setZeroFill(oMonth) + '-' + setZeroFill(oDay);
}

/**
 * 时间戳转日期时间
 * @param {int} timestamp
 * @returns {string}
 */
function timestamp2Gametime(timestamp) {
    if (!timestamp) {
        return '';
    }

    let oDate = new Date(timestamp * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes();
    return oYear + '-' + setZeroFill(oMonth) + '-' + setZeroFill(oDay) + ' ' + setZeroFill(oHour) + ':' + setZeroFill(oMin);
}

/**
 * 单双引号进行转义
 * @param {string} str
 * @returns {string}
 */
function escapeQuotes(str) {
    return str.replace(/(['"])/g, "\\$1");
}

async function curlGet(reqUrl) {
    return await fetch(reqUrl)
        .then((response) => response.json())
        .then((result) => {
            return result
        })
        .catch((error) => console.error(error));
}

async function apiSqlRaw(sql) {
    let reqUrl = 'http://127.0.0.1:31050/i-am-not-sql-raw'
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "sql": sql
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(reqUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (!result || !result.data || result.data.length === 0) {
                return []
            }

            return result.data
        })
        .catch((error) => console.error(error));
}

async function apiSqlExec(sql) {
    console.debug(sql)
    let reqUrl = 'http://127.0.0.1:31050/i-am-not-sql-exec'
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "sql": sql
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(reqUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result.data
        })
        .catch((error) => console.error(error));
}

async function doUpdate() {
    // 创建起始日期和结束日期
    let startDate = new Date('2018-01-01');
    let endDate = new Date();

    // 格式化日期为 'YYYY-MM-DD'
    function formatDate(date) {
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 循环输出从起始日期到结束日期的每一天
    while (startDate <= endDate) {
        // await doUpdateScheduleGroup(formatDate(startDate));
        // await doUpdateTeam(formatDate(startDate));
        await doUpdateGame(formatDate(startDate));

        // 增加一天
        startDate.setDate(startDate.getDate() + 1);
    }
}

async function doUpdateScheduleGroup(startDate) {
    for (let i = 0; i < 1; i++) {
        await sleep(1000);
        let reqUrl = ''
        let respEn = ''
        let respCh = ''
        let languageIDEn = '1'
        let languageIDCh = '10'
        let sqlExec

        const urlObj = new URL('https://extra.365-023.com/ResultsApi/GetCompetitions?sportId=1&fromDate=2024-05-18&toDate=2024-05-19&lng=10');
        const searchParamsObj = new URLSearchParams(urlObj.search);
        searchParamsObj.set('fromDate', startDate)
        searchParamsObj.set('toDate', startDate)

        searchParamsObj.set('lng', languageIDEn)
        reqUrl = urlObj.origin + urlObj.pathname + '?' + searchParamsObj.toString()
        respEn = await curlGet(reqUrl)
        if (!respEn || respEn.length === 0) {
            console.error('empty data', reqUrl)
            continue
        }

        searchParamsObj.set('lng', languageIDCh)
        reqUrl = urlObj.origin + urlObj.pathname + '?' + searchParamsObj.toString()
        respCh = await curlGet(reqUrl)
        if (!respCh || respCh.length === 0) {
            console.error('empty data', reqUrl)
            continue
        }

        let schedule_groups = []
        $.each(respEn, function (key, value) {
            schedule_groups.push({
                language_id: languageIDEn,
                schedule_group_id: value.Id,
                nickname: value.Description
            })
        });
        $.each(respCh, function (key, value) {
            schedule_groups.push({
                language_id: languageIDCh,
                schedule_group_id: value.Id,
                nickname: value.Description
            })
        });

        for (let j = 0; j < schedule_groups.length; j++) {
            sqlExec = `
                INSERT INTO bet365_schedule_group_nickname (language_id, schedule_group_id, nickname)
                SELECT ${schedule_groups[j].language_id}, ${schedule_groups[j].schedule_group_id}, '${escapeQuotes(schedule_groups[j].nickname)}'
                FROM DUAL
                WHERE NOT EXISTS(SELECT *
                                 FROM bet365_schedule_group_nickname
                                 WHERE language_id = ${schedule_groups[j].language_id}
                                   AND schedule_group_id = ${schedule_groups[j].schedule_group_id}
                                   AND nickname = '${escapeQuotes(schedule_groups[j].nickname)}');
            `
            await apiSqlExec(sqlExec);
        }
    }
}

async function doUpdateTeam(startDate) {
    for (let i = 0; i < 1; i++) {
        await sleep(1000);
        let reqUrl = ''
        let respEn = ''
        let respCh = ''
        let languageIDEn = '1'
        let languageIDCh = '10'
        let sqlExec

        const urlObj = new URL('https://extra.365-023.com/ResultsApi/GetTeams?sportId=1&fromDate=2024-05-14&toDate=2024-05-14&ct=42&lng=1&st=108&tz=GMTPlus8&ot=Decimals');
        const searchParamsObj = new URLSearchParams(urlObj.search);
        searchParamsObj.set('fromDate', startDate)
        searchParamsObj.set('toDate', startDate)

        searchParamsObj.set('lng', languageIDEn)
        reqUrl = urlObj.origin + urlObj.pathname + '?' + searchParamsObj.toString()
        respEn = await curlGet(reqUrl)
        if (!respEn || respEn.length === 0) {
            console.error('empty data', reqUrl)
            continue
        }

        searchParamsObj.set('lng', languageIDCh)
        reqUrl = urlObj.origin + urlObj.pathname + '?' + searchParamsObj.toString()
        respCh = await curlGet(reqUrl)
        if (!respCh || respCh.length === 0) {
            console.error('empty data', reqUrl)
            continue
        }

        let teams = []
        $.each(respEn, function (key, value) {
            teams.push({
                language_id: languageIDEn,
                team_id: value.TeamId,
                nickname: value.TeamName
            })
        });
        $.each(respCh, function (key, value) {
            teams.push({
                language_id: languageIDCh,
                team_id: value.TeamId,
                nickname: value.TeamName
            })
        });

        for (let j = 0; j < teams.length; j++) {
            sqlExec = `
                INSERT INTO bet365_team_nickname (language_id, team_id, nickname)
                SELECT ${teams[j].language_id}, ${teams[j].team_id}, '${escapeQuotes(teams[j].nickname)}'
                FROM DUAL
                WHERE NOT EXISTS(SELECT *
                                 FROM bet365_team_nickname
                                 WHERE language_id = ${teams[j].language_id}
                                   AND team_id = ${teams[j].team_id}
                                   AND nickname = '${escapeQuotes(teams[j].nickname)}');
            `
            await apiSqlExec(sqlExec);
        }
    }
}

async function doUpdateGame(startDate) {
    for (let i = 0; i < 1; i++) {
        await sleep(1000);
        let reqUrl = ''
        let respEn = ''
        let respCh = ''
        let languageIDEn = '1'
        let languageIDCh = '1'
        let sqlExec

        const urlObj = new URL('https://extra.365-023.com/ResultsApi/GetFixtures?sportId=1&competitionId=999999&challengeId=0&fixtureId=0&fromDate=2024-05-15&toDate=2024-05-15&isDynamic=false&linkId=0&teamId=0&sportDescriptor=%E8%B6%B3%E7%90%83&isVirtual=false&ct=42&lng=10&st=108&tz=GMTPlus8&ot=Decimals');
        const searchParamsObj = new URLSearchParams(urlObj.search);
        searchParamsObj.set('fromDate', startDate)
        searchParamsObj.set('toDate', startDate)

        searchParamsObj.set('lng', languageIDCh)
        reqUrl = urlObj.origin + urlObj.pathname + '?' + searchParamsObj.toString()
        respCh = await curlGet(reqUrl)
        if (!respCh || !respCh.fixtures || respCh.fixtures.length === 0) {
            console.error('!respCh || !respCh.fixtures || respCh.fixtures.length === 0', reqUrl)
            continue
        }

        let games = []
        $.each(respCh.fixtures, function (key, value) {
            if (!value.fixtureId) {
                console.error('!value.fixtureId', reqUrl, value.fixtureId)
                return
            }

            if (!value.challengeId) {
                console.error('!value.challengeId', reqUrl, value.challengeId)
                return
            }

            let descArr = value.desc.split(' v ')
            if (!descArr || descArr.length !== 2) {
                console.error('descArr.length !== 2', reqUrl, value.desc)
                return
            }

            if (!value.userTime) {
                console.error('!value.userTime', reqUrl, value.userTime)
                return
            }
            let gametimestamp = new Date(value.userTime).getTime() / 1000
            let gametime = timestamp2Gametime(gametimestamp)

            games.push({
                id: value.fixtureId,
                gametimestamp: gametimestamp,
                gametime: gametime,
                classid: value.challengeId,
                homename: descArr[0],
                guestname: descArr[1],
            })
        });

        for (let j = 0; j < games.length; j++) {
            let gamename = ''
            let sqlRaw = `SELECT *
                          FROM bet365_schedule_group_nickname
                          WHERE language_id = ${languageIDCh}
                            AND schedule_group_id = ${games[j].classid} LIMIT 1`
            let resp = await apiSqlRaw(sqlRaw)
            if (resp && resp.length > 0) {
                gamename = resp[0].nickname
            }

            let homeid = 0
            sqlRaw = `SELECT *
                      FROM bet365_team_nickname
                      WHERE language_id = ${languageIDCh}
                        AND nickname = '${escapeQuotes(games[j].homename)}' LIMIT 1`
            resp = await apiSqlRaw(sqlRaw)
            if (resp && resp.length > 0) {
                homeid = resp[0].team_id
            }

            let guestid = 0
            sqlRaw = `SELECT *
                      FROM bet365_team_nickname
                      WHERE language_id = ${languageIDCh}
                        AND nickname = '${escapeQuotes(games[j].guestname)}' LIMIT 1`
            resp = await apiSqlRaw(sqlRaw)
            if (resp && resp.length > 0) {
                guestid = resp[0].team_id
            }

            sqlExec = `
                INSERT INTO bet365_info (id, gametimestamp, gametime, classid, gamename, homeid, homename, guestid,
                                         guestname, url, api_resp)
                SELECT ${games[j].id},
                       ${games[j].gametimestamp},
                       '${games[j].gametime}',
                       ${games[j].classid},
                       '${gamename}',
                       ${homeid},
                       '${escapeQuotes(games[j].homename)}',
                       ${guestid},
                       '${escapeQuotes(games[j].guestname)}',
                       '',
                       ''
                FROM DUAL
                WHERE NOT EXISTS(SELECT *
                                 FROM bet365_info
                                 WHERE id = ${games[j].id});
            `
            await apiSqlExec(sqlExec);
        }
    }
}

async function doUpdateScore() {
    let resp
    let sqlRaw = "SELECT * FROM bet365_info WHERE gametimestamp < unix_timestamp() - 24*60*60 AND score = '' ORDER BY gametimestamp"
    resp = await apiSqlRaw(sqlRaw)
    for (let i = 0; i < resp.length; i++) {
        await sleep(1000);
        let reqUrl = location.href
        let resp2 = ''
        let replaceValue = 'fixtureId=' + resp[i].id + '&fromDate=' + timestamp2Date(resp[i].gametimestamp) + '&toDate=' + timestamp2Date(resp[i].gametimestamp)
        reqUrl = reqUrl.replaceAll('fixtureId=154928801&fromDate=2024-05-10&toDate=2024-05-10', replaceValue)
        console.debug(reqUrl)
        resp2 = await curlGet(reqUrl)
        console.debug(resp2)
        if (!resp2 || !resp2.scores || !resp2.scores.rows || resp2.scores.rows.length !== 2) {
            console.error('empty data', replaceValue)
            continue
        }

        let homeHalfScore = resp2.scores.rows[0].split('@')[0].replaceAll('|', '').split(';')[0]
        if (homeHalfScore === '-') {
            console.error('empty home score', replaceValue, resp2.scores.rows[0])
            continue
        }
        let guestHalfScore = resp2.scores.rows[1].split('@')[0].replaceAll('|', '').split(';')[0]
        if (guestHalfScore === '-') {
            console.error('empty guest score', replaceValue, resp2.scores.rows[1])
            continue
        }

        let homeScore = resp2.scores.rows[0].split('@')[0].replaceAll('|', '').split(';')[1]
        if (homeScore === '-') {
            console.error('empty home score', replaceValue, resp2.scores.rows[0])
            continue
        }
        let guestScore = resp2.scores.rows[1].split('@')[0].replaceAll('|', '').split(';')[1]
        if (guestScore === '-') {
            console.error('empty guest score', replaceValue, resp2.scores.rows[1])
            continue
        }

        console.debug(resp2.scores.rows)
        let sqlExec = `UPDATE bet365_info
                       SET score  = '${homeScore}-${guestScore}',
                           Hscore = '${homeHalfScore}-${guestHalfScore}'
                       WHERE id = ${resp[i].id}`
        apiSqlExec(sqlExec);
    }
}

async function main() {
    console.debug('---------- start ----------');

    if (location.pathname === '/ResultsApi') {
        await doUpdate();
    } else if (location.pathname === '/ResultsApi/GetCompetitions') {
        await doUpdateScheduleGroup();
    } else if (location.pathname === '/ResultsApi/GetTeams') {
        await doUpdateTeam();
    } else if (location.pathname === '/ResultsApi/GetFixtures') {
        await doUpdateGame();
    } else if (location.pathname === '/ResultsApi/GetResults') {
        await doUpdateScore();
    }

    console.debug('---------- end ----------');
}

main()
