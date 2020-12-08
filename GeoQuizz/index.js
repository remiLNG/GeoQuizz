const express = require('express')
const path = require('path')
const app = express()

const PORT = 8085;

app.use('/css',express.static( __dirname +'/css'));
app.use('/assets',express.static( __dirname +'/assets'));
app.use('/js',express.static( __dirname +'/js'));
app.use('/fonts',express.static( __dirname +'/fonts'));


app.get('/menu', (req,res) => {
    res.sendFile(path.join( __dirname, "menu.html"))
})

app.get('/flagguesser', (req,res) => {
    res.sendFile(path.join( __dirname, "flagguesser.html"))
})

app.get('/flagfinder', (req,res) => {
    res.sendFile(path.join( __dirname, "flagfinder.html"))
})

app.get('/CapitalCity', (req,res) => {
    res.sendFile(path.join( __dirname, "CapitalCity.html"))
})

app.get('/PopGuesser', (req,res) => {
    res.sendFile(path.join( __dirname, "PopGuesser.html"))
})

app.get('/Regle', (req,res) => {
    res.sendFile(path.join( __dirname, "Regle.html"))
})

app.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}`)
  })