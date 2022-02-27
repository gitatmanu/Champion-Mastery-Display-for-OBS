const fs = require('fs');
const lolapi = require('./lolapi.js');
const express = require('express');
const app = express();
app.set('views', './');
app.use(express.static("static"));

const patch = '12.4.1';

app.get('/:championId', async (req, res) =>  {
    // TODO: Get champ from current game stats if there are, if not, take champ from the last game played
    var championKey = lolapi.getChampionKeyById(req.params.championId);

    // data for display
    const championMasteryData = await lolapi.getChampionMasteryData(championKey, 'manufm')
        .then(res => res ? res.data : {'championLevel': 0}).catch(e => {console.log(e.Error)});
    const championSquareAsset = `https://cdn.communitydragon.org/${patch}/champion/${req.params.championId}/tile`;
    const masteryProgressionAsset = `mastery_assets/cdp-prog-mastery-${championMasteryData.championLevel}.png`;

    res.render('index.pug', { 
        'masteryProgressionAsset': masteryProgressionAsset,
        'championSquareAsset': championSquareAsset 
    });
});

app.listen(5000, () => console.log('Champion Mastery Display Server running on port 5000'));