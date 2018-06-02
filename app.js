const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/resume', function (req, res) {
  res.sendFile(__dirname + '/resume.html');
})


app.listen(port, function () {
  console.log('i hear yah');
})