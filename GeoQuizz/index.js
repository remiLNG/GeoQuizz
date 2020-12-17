const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const flagfinder = require('./routers/FlagFinder');
const flagguesser = require('./routers/flagguesser');
const popguesser = require('./routers/PopGuesser');
const capitalcity = require('./routers/CapitalCity');
const multiplayer = require('./routers/multiplayer');

const PORT = 8085;

app.use('/css', express.static(__dirname + '/css'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/sounds', express.static(__dirname + '/sounds'));


app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, "menu.html"))
})

app.use('/flagfinder', flagfinder);

app.use('/flagguesser', flagguesser);

app.use('/PopGuesser', popguesser);

app.use('/CapitalCity', capitalcity);

app.use('/Multiplayer', multiplayer);

app.get('/Regle', (req, res) => {
    res.sendFile(path.join(__dirname, "Regle.html"))
})

io.on('connect', (client) => {

    client.on('JoinGame', () => {
        console.log('A player want to join a game')
    });

});

http.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}`)
})