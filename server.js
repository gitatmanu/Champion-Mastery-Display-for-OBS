const fs = require('fs');
const lolapi = require('./lolapi.js');
const express = require('express');
const app = express();
app.set('views', './');
app.use(express.static("static"));

const patch = '12.4.1';

/* app.get('/counter', async (req, res) =>  {
    var masteredChampions = 0;

    for(var i=0; i < Object.keys(lolapi.getChampionList()).length; i++) {
        await new Promise(r => setTimeout(r, 1700));
        var championMasteryData = await lolapi.getChampionMasteryData(
                lolapi.getChampionList()[Object.keys(lolapi.getChampionList())[i]]['key']
            )
            .then(res => res ? res.data : {'championLevel': 0}).catch(e => {});
            
        console.log(`Champion: ${Object.keys(lolapi.getChampionList())[i]} ${championMasteryData.championLevel}`)
        if(championMasteryData.championLevel >=4) masteredChampions++;
    }

    res.send({ 
        'masteredChampions': masteredChampions,
        'totalChampions': Object.keys(lolapi.getChampionList()).length
    });
}); */

app.get('/:championId', async (req, res) =>  {
    // TODO: Get champ from current game stats if there are, if not, take champ from the last game played
    var championKey = lolapi.getChampionKeyById(req.params.championId);

    // data for display
    const championMasteryData = await lolapi.getChampionMasteryData(championKey)
        .then(res => res ? res.data : {'championLevel': 0}).catch(e => {console.log(e.Error)});
    const championSquareAsset = `https://cdn.communitydragon.org/${patch}/champion/${req.params.championId}/tile`;
    const masteryProgressionAsset = `mastery_assets/cdp-prog-mastery-${championMasteryData.championLevel}.png`;

    res.render('index.pug', { 
        'masteryProgressionAsset': masteryProgressionAsset,
        'championSquareAsset': championSquareAsset 
    });
});

app.listen(5000, () => console.log('Champion Mastery Display Server running on port 5000'));