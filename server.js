var lolapi = require('./lolapi.js');
var http = require('http');

var mode = 'custom'; //Select mode [champion in game, custom champion]

var server = http.createServer(function (req, res) {
    var championId, championMasteryData;

    if (req.url == '/') {
        switch(mode) {
            case 'in game':

            break;

            case 'custom':
                championId = lolapi.getChampionIdByName('Annie');
                championMasteryData = lolapi.getChampionMasteryData(championId, 'manuFM');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(championMasteryData));
    } else res.end('Invalid Request!');
});

server.listen(5000, ()=>console.log('Champion Mastery Display Server running on port 5000'));