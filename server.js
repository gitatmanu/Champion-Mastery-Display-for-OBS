var lolapi = require('./lolapi.js');
var http = require('http');

var mode = 'custom'; //Select mode [champion in game, custom champion]

var server = http.createServer(async function (req, res) {
    if (req.url == '/') {
        switch(mode) {
            case 'in game':
                var championId = 0; 
                //Get current game stats if there are, if not, take champ from the last game played
                break;
            case 'custom':
                var championId = lolapi.getChampionIdByName('Annie');
        }
        const championMasteryData = await lolapi.getChampionMasteryData(championId, 'manufm').then( res => res.data );

        //logo champion

        //logo mastery

        

        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(championMasteryData));
    } else res.end('Invalid Request!');
});

server.listen(5000, ()=>console.log('Champion Mastery Display Server running on port 5000'));