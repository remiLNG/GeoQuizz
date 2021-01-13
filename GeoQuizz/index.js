const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const flagfinder = require('./routers/routerFlagFinder');
const flagguesser = require('./routers/routerflagguesser');
const popguesser = require('./routers/routerPopGuesser');
const capitalcity = require('./routers/routerCapitalCity');
const deptGuesser = require('./routers/routerDeptGuesser');

const PORT = 8085;

app.use('/css', express.static(__dirname + '/css'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/jeu', express.static(__dirname + '/jeu'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/sounds', express.static(__dirname + '/sounds'));


app.get('/geojson', (req,res) => {
    res.sendFile(path.join(__dirname, "geo.json"))
})

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, "/jeu/menu/menu.html"))
})

app.use('/flagfinder', flagfinder);

app.use('/flagguesser', flagguesser);

app.use('/PopGuesser', popguesser);

app.use('/CapitalCity', capitalcity);

app.use('/deptGuesser', deptGuesser);

app.get('/Regle', (req, res) => {
    res.sendFile(path.join(__dirname, "/jeu/regle/Regle.html"))
})

app.use("/static", express.static('./static/'));

io.on('connect', (client) => {

    client.on('JoinGame', () => {
        console.log('A player want to join a game')
    });

});

http.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}`)
})