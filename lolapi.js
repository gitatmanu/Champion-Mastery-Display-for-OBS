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

async function getChampionMasteryData(championId) {  
    try {
        return await axios(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${process.env.SUMMONER_ID}/by-champion/${championId}?api_key=${process.env.API_KEY}`, {responseType: 'json'});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {getChampionKeyById, getChampionMasteryData, getSummonerIdByName, getChampionList};