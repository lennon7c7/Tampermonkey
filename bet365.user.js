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
    await doUpdateScheduleGroup();
}

async function doUpdateScheduleGroup() {
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
        searchParamsObj.set('fromDate', '2024-05-14')
        searchParamsObj.set('toDate', '2024-05-14')

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
                SELECT ${schedule_groups[j].language_id}, ${schedule_groups[j].schedule_group_id}, '${schedule_groups[j].nickname}'
                FROM DUAL
                WHERE NOT EXISTS(SELECT *
                                 FROM bet365_schedule_group_nickname
                                 WHERE language_id = ${schedule_groups[j].language_id}
                                   AND schedule_group_id = ${schedule_groups[j].schedule_group_id}
                                   AND nickname = '${schedule_groups[j].nickname}');
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
    } else if (location.pathname === '/ResultsApi/GetResults') {
        await doUpdateScore();
    } else if (location.pathname === '/ResultsApi/GetCompetitions') {
        await doUpdateScheduleGroup();
    }

    console.debug('---------- end ----------');
}

main()