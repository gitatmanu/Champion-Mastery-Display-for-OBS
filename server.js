var lolapi = require('./lolapi.js');
var http = require('http');

var mode = 'custom'; //Select mode [champion in game, custom champion]

var server = http.createServer(function (req, res) {
    var championId, championMasteryData;

    if (req.url == '/') {
        switch(mode) {
            case 'in game':
                championId = 0; //Get current game stats if there are, if not, take champ from the last game played
                break;
            case 'custom':
                championId = lolapi.getChampionIdByName('Annie');
        }
        championMasteryData = lolapi.getChampionMasteryData(championId, 'manufm');
        console.log(championMasteryData);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(championMasteryData));
    } else res.end('Invalid Request!');
});

server.listen(5000, ()=>console.log('Champion Mastery Display Server running on port 5000'));