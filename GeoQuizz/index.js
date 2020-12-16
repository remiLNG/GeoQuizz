const express = require('express')
const path = require('path')
const app = express()
const flagfinder = require('./routers/FlagFinder');
const flagguesser = require('./routers/flagguesser');
const popguesser = require('./routers/PopGuesser');
const capitalcity = require('./routers/CapitalCity');

const PORT = 8085;

app.use('/css',express.static( __dirname +'/css'));
app.use('/assets',express.static( __dirname +'/assets'));
app.use('/js',express.static( __dirname +'/js'));
app.use('/fonts',express.static( __dirname +'/fonts'));
app.use('/sounds',express.static( __dirname +'/sounds'));


app.get('/menu', (req,res) => {
    res.sendFile(path.join( __dirname, "menu.html"))
})

app.use('/flagfinder', flagfinder);

app.use('/flagguesser', flagguesser);

app.use('/PopGuesser', popguesser);

app.use('/CapitalCity', capitalcity);

app.get('/Regle', (req,res) => {
    res.sendFile(path.join( __dirname, "Regle.html"))
})

app.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}`)
  })