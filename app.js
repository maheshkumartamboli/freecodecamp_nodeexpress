var express = require('express')
var app = express()
var bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next()
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'HELLO JSON' })
  } else {
    res.json({ message: 'Hello json' })
  }
})

// Chain Middleware to Create a Time Server
app.get('/now', function (req, res, next) {
  req.time = new Date().toString()
  next()
}, function (req, res) {
  res.json({ time: req.time })
})

// Get Route parameter input from the client
app.get('/:word/echo', function (req, res) {
  res.json({ echo: req.params.word })
})

// Get Query parameter input from the client
app.get('/name', function (req, res) {
  res.json({ name: req.query.first + ' ' + req.query.last })
})

// Get Query parameter input from the client
app.get('/name', function (req, res) {
  res.json({ name: req.query.first + ' ' + req.query.last })
})

// Get Data from post request
app.post('/name', function (req, res) {
  res.json({ name: req.body.first + ' ' + req.body.last })
})

app.get('/', function (req, res) {
  res.send('Hello Express')
})

module.exports = app
