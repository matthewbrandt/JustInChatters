console.log("so it begins...");

const axios = require('axios');
const broadcaster_name = 'matty_twoshoes';

axios({
    method: 'get',
    url: 'https://tmi.twitch.tv/group/user/' + broadcaster_name + '/chatters',
    responseType: 'json'
})
    .then(function (response) {
        console.log(response.data);
        return response.data;
});