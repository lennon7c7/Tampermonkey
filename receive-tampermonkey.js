// 使用 Node.js 创建一个服务器，监听系统命令执行请求

const http = require('http');
const {exec} = require('child_process'); // 用于执行系统命令

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/run-command') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const {command} = JSON.parse(body);
            console.log(`Received command: ${command}`);
            // 执行命令
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: error.message}));
                    return;
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({output: stdout}));
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
