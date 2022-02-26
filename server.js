const fs = require('fs');
const http = require('http');
const lolapi = require('./lolapi.js');
const url = require('url');

const mode = 'custom'; //Select mode [champion in game, custom champion]
const patch = '12.4.1';
var data = {};

var server = http.createServer(async function (req, res) {
    if (req.url == '/') {
        // champion retrieve
        switch(mode) {
            case 'in game':
                var championId = 0; 
                //Get current game stats if there are, if not, take champ from the last game played
                break;
            case 'custom':
                var championId = 'Jinx';
                var championKey = lolapi.getChampionKeyById(championId);
        }

        // data for display
        data.championMasteryData = await lolapi.getChampionMasteryData(championKey, 'manufm')
            .then(res => res ? res.data : {'championLevel': 0})
                .catch(e => {console.log(e.Error)});

        data.championSquareAsset = `https://cdn.communitydragon.org/${patch}/champion/${championId}/tile`;
        data.masteryProgressionAsset = lolapi.getMasteryProgressionAsset(data.championMasteryData['championLevel']);

        // displaying html & data
        fs.readFile('index.html', function(err, HTML) {
            res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length':HTML.length });

            var html_string = HTML.toString();
            var variables = html_string.match(/[^\{\}]+(?=\})/g);
            
            for(var i = variables.length - 1; i >= 0; i--) {
                var value = eval(variables[i]);
                html_string = html_string.replace("{"+variables[i]+"}", value);
            }

            res.end(html_string);
        });
    } else res.end('Invalid Request!');
});

server.listen(5000, ()=>console.log('Champion Mastery Display Server running on port 5000'));