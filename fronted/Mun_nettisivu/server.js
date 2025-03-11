const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const app = express();
const port = 3000;

const API_URL = 'http://localhost:3000';

//yhteys tieto kantaan
const pool = mariadb.createPool({
    host:'localhost',
    user:'Sumeyadb',
    password:'Maria123.',
    database:'health_diary',
});
