const axios = require('axios');
require('dotenv').config();

function init() {
    axios.get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/champion.json`, {responseType: 'json'})
    .then(res => {championList = res.data.data}).catch(e => {console.error(e)});
}
init();


function getChampionIdByName(name) {
    return championList[name]['key'];
}

function getSummonerIdByName(name) {
    var summonerId;

    axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`, {responseType: 'html'})
    .then(res => {summonerId = res.data;}).catch(e => {console.error(e)});
    
    return summonerId;
};

function getChampionMasteryData(championId, summonerName) {  
    var championMasteryData;  
    var summonerId = getSummonerIdByName(summonerName);

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${process.env.API_KEY}`, {responseType: 'html'})
    .then(res => {championMasteryData = res.data;}).catch(e => {console.error(e)});

    return championMasteryData;
}


module.exports = {getChampionIdByName, getChampionMasteryData};