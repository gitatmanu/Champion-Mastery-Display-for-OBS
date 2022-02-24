import * as MyFn from './myfile.js';

require('dotenv').config();
var http = require('http');
var fs = require('fs');
var lol = require('lol-js');

var lolClient = lol.client({apiKey: process.env.API_KEY});

var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        //Elegir modo, campeon [0 campeón en partida,1 campeón personalizado]
        var championName =  lol.getSummonerMasteries('euw', [process.env.SUMMONER_ID, ]);

        //Datos de maestria del campeon
        var masteryLevel;

        //Imagen del campeón
        var championLogoURL;

        //Icono de maestria
        var masteryLogoURL;

        //Enviar datos a html
        res.write('Content');
        res.end();
    } else res.end('Invalid Request!');
});

server.listen(5000, ()=>console.log('Champion Mastery Display Server running on port 5000'));