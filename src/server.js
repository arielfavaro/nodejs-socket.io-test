const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    // res.send('alo');
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
    console.log('connection made');

    socket.on('chat message', (message) => {
        console.log(`Message: ${message.message}`);

        io.emit('chat message feedback', message);
    })

    socket.on('disconnect', () => {
        console.log('diconnected');
    })
});

server.listen(3000, () => {
    console.log('Yeayyy server started on port 3000');
});
