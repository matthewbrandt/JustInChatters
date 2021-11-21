console.log("so it begins...");
twitchChattersTMI = 'https://tmi.twitch.tv/group/user/matty_twoshoes/chatters';
console.log(twitchChattersTMI);
fetch(twitchChattersTMI).then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    //pull stuff around
    console.log(data);

}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});