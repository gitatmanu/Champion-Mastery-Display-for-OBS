const axios = require('axios');
require('dotenv').config();

var championList;

axios.get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/champion.json`, {responseType: 'json'})
.then(res => {championList = res.data.data}).catch(e => {console.error(e)});


function getChampionIdByName(name) {
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


module.exports = {getChampionIdByName, getChampionMasteryData, getSummonerIdByName};