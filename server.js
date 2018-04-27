const express = require('express');
const path = require('path');
const data = require('./public/data.js');
const app = express();

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

const errorFound = (request, response, next) => {
  response.status(404).send('PAGE NOT FOUND: There is no such ting!')
};

app.use(urlLogger, timeLogger);

app.use(express.static('public'));

app.get('/', (request, response) => {});

app.get('/json', (request, response) => {
  response.status(200).json(data);
});

app.get('/smolpuppers', (request, response) => {
  response.sendFile(path.join(__dirname + '/public/smolpuppers.html'));
});

app.use(errorFound);

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

