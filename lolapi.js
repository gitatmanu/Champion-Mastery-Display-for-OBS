const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

var championList;

axios.get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/es_ES/champion.json`, {responseType: 'json'})
.then(res => {championList = res.data.data}).catch(e => {console.error(e)});

function getChampionList() {return championList}

function getChampionKeyById(name) {
    return championList[name]['key'];
}

async function getSummonerIdByName(name) {    
    try {        
        return await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`, {responseType: 'json'});   
    } catch (e) {
        console.log(e);
    }
};

async function getChampionMasteryData(championId, summonerName) {  
    try {
        var summonerId = await getSummonerIdByName(summonerName).then(res => res.data.id);
        
        return await axios(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${process.env.API_KEY}`, {responseType: 'json'});
    } catch (e) {
        console.log(e);
    }
}


function getMasteryProgressionAsset(masteryLevel) {
    return fs.readFileSync(`media/mastery_assets/cdp-prog-mastery-${masteryLevel}.png`);
}

module.exports = {getChampionKeyById, getChampionMasteryData, getSummonerIdByName, getMasteryProgressionAsset, getChampionList};