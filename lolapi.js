const axios = require('axios');
require('dotenv').config();

var championList;
axios.get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/champion.json`, {responseType: 'json'})
.then(res => {championList = res.data.data}).catch(e => {console.error(e)});


function getChampionIdByName(name) {
    return championList[name]['key'];
}

function getSummonerIdByName(name) { 
    let id;
   
    axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`, {responseType: 'json'}).then(res => {return res.data.id;});

    return id;
};

function getChampionMasteryData(championId, summonerName) {  
    var championMasteryData;
    var summonerId = process.env.SUMMONER_ID;

    axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${process.env.API_KEY}`, {responseType: 'json'})
        .then(result => {console.log(result.data); championMasteryData = result})
        .catch(e => console.log(e));

    return championMasteryData;
    
}


module.exports = {getChampionIdByName, getChampionMasteryData, getSummonerIdByName};