const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const SSHClient = require('ssh2').Client;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('WS client Success! Chensao Code:022001');

    const ssh = new SSHClient();

    ssh.on('ready', () => {
        console.log('SSH Connected!');

        ssh.shell((err, stream) => {
            if (err) throw err;

            stream.on('data', (data) => {
                ws.send(data.toString('binary'));
            });

            stream.stderr.on('data', (data) => {
                ws.send(data.toString('binary'));
            });

            ws.on('message', (message) => {
                stream.write(message);
            });

            ws.on('close', () => {
                console.log('WebSocket connection closed');
                stream.end('exit\n');
            });
        });
    });

    ssh.on('error', (err) => {
        console.error('SSH connection error:', err);
        ws.send(`SSH connection error: ${err.message}`);
    });

    ssh.connect({
        host: '45.154.2.232',
        port: 22,
        username: 'test',
        password: 'fr0TkiqD7GZbHeoWoWNn'
        // 私钥？:
        // privateKey: require('fs').readFileSync('/path/to/private/key')
    });
});

server.listen(58943, () => {
    console.log('Success! Running Port: 58943');
});
