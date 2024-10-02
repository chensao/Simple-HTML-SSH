const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const SSHClient = require('ssh2').Client;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('WS client Success!');

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
// SSH Connection details
    ssh.connect({
        host: 'ENTER IP ADDRESS',  // Host address IP, for localhost: 127.0.0.1 (this function has not been tested but it should work)
        port: 22,  // change this if you are connecting your server on another port.
        username: 'usrname',  // what is your user name
        password: 'password' // ssh password information, if you are using a private key, see below
        // 私钥？:
        // privateKey: require('fs').readFileSync('/path/to/private/key')
    });
});

server.listen(58943, () => {  // change the number in this line if you want to use a different websocket port.
    console.log('Success! Running Port: 58943');
});
