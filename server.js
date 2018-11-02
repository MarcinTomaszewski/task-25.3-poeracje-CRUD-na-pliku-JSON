var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var stringifyFile;

app.use(bodyParser.json());     //wykorzystanie middleware body-parser

app.get('/getNote', function (req, res) {                        //stworzenie endpointa get  /getNote. Po wywołaniu wczytany zostanie zew. plik JSON
    fs.readFile('./test.json', 'utf8', function(err, data) {    //odczytanie pliku przy pomocy metody readFile
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
});

app.post('/updateNote/:note', function(req, res) {              //stworzenie dynamicznego endpointa POST  /updateNote/:note. Po wywołaniu nadpisze podany plik.
    stringifyFile = req.params.note;                            //
    fs.appendFile('./test.json', stringifyFile, function(err) {
        if (err) throw err;
        res.send(stringifyFile);
        console.log('File updated.');
    });
});

app.listen(3000);       //nasłuchiwanie na porcie 3000

/*var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.get('/:id', function(req, res) {    
    res.send('Identyfikator, który został dopisany to ' + req.params.id);
});

app.post('/', function(req, res) {
    console.log('Otzrymałem żądanie POST do strony głównej.');
    res.send('Hello POST!')
});

app.delete('/del_user', function(req, res) {
    console.log('Otrzymałem żądanie DELETE do strony /del_user.');
    res.send('Hello Delete!');
});

app.get('/list_user', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /list_user');
    res.send('Strona z listą użytkowników!');
});

app.get('/ab*cd', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /ab*cd');
    res.send('Wzór pasuje');
});

app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});*/