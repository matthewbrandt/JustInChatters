const CLIENT_ID = '5rocrgu81rtj4mw65d1j78rue4dszu';
// when on PROD
const REDIRECT_URI = 'https://matthewbrandt.github.io/lurkreveal';
// when on LOCAL
// const REDIRECT_URI = 'http://localhost:5500';

const params = new URLSearchParams(window.location.search);
const hash = new URLSearchParams(document.location.hash.slice(1));
const loaderWrapper = document.getElementById('loader-wrapper');

async function preLoadBotList () {
    const botList = './bot_list.txt';
    const response = await fetch(botList);
    return await response.text();
}
const loadedBotListPromise = preLoadBotList();

let footerState = localStorage.getItem('footer');
let tokenPromise = upsertToken(hash.get('access_token'));

tokenPromise.then(async function(twitchToken) {
    if (twitchToken) {
        console.log("Resolved token");
        let broadcaster = JSON.parse(localStorage.getItem('broadcaster'));
        getChatters(twitchToken, broadcaster);
    } else {
        console.log("No token resolved");
        displayAuthorizationPrompt();
    }
    
});
if(JSON.parse(footerState) === true ) {
    hideFooter();
}

function upsertToken(incomingToken) {
    if (incomingToken) {
        console.log("New incoming token");
        localStorage.setItem('access_token', incomingToken);
        setUserFilter();
        return fetchUserInfo(incomingToken);
    }
    console.log("Get cached token");
    
    return Promise.resolve(localStorage.getItem('access_token'));
}

function fetchUserInfo(token) {
    const url = 'https://id.twitch.tv/oauth2/validate';

    return fetch(url, {
        headers: { Authorization: 'Bearer ' + token }
    }).then(async function(response) {
        if (response.ok) {
            return await response.json();
            //return testData;
        } else {
            return Promise.reject(response);
        }
    }).then(async function (data) {
        localStorage.setItem('broadcaster', JSON.stringify({ "id": data.user_id, "name": data.login }));
        return token;
    });
}

function displayAuthorizationPrompt() {
    footer = document.getElementById('footer');
    footer.style.display = 'none';
    let divItem = document.createElement("div");
    let params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("response_type", "token");
    params.append("scope", "moderator:read:chatters");
    divItem.innerHTML = `<h3>Please login with Twitch to authorize LurkReveal to load your chatters.</h3>
    <a href="https://id.twitch.tv/oauth2/authorize?${params}">Connect with Twitch</a>`;
    document.getElementById('chatters').append(divItem);
}

function resetButton() {
    document.getElementById('subheader').innerHTML = '';
    document.getElementById('chatters').innerHTML = '';
    loadBroadcaster();
}

function setUserFilter() {
    if (document.getElementById("userlist")) {
        let LSInput = localStorage.getItem('userlist');
        // if localstorage is filled prefill the field with localstorage data
        if (LSInput) {
            document.getElementById("userlist").value = LSInput;
        }
    }
}

function hideFooter() {
    footer = document.getElementById('footer');
    footer.classList.toggle('main-footer--hide');
    footerText = document.getElementById('footer--hide__text');
    if (footer.classList.contains("main-footer--hide") == true) {
        footerText.innerText = 'Show Key';
        localStorage.setItem('footer', false);
    } else {
        footerText.innerText = 'Hide Key';
        localStorage.setItem('footer', true);
    }
}

function filter_results() {
    var input, chatters, table, li, i, txtValue;
    input = document.getElementById("username");
    inputValue = input.value.toLowerCase();
    chatters = document.getElementById("chatters");
    li = chatters.getElementsByTagName("li");

    if(inputValue != 0){
        for (i = 0; i < li.length; i++) {
            
            let element = li[i];
            txtValue = element.textContent || element.innerText;
            
            if (txtValue.includes(inputValue)) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
            
        }
    } else {
        for (i = 0; i < li.length; i++) {
            let element = li[i];
            element.style.display = "";
        }
    }
}

function apply_userlist(){
    let LSInput, fieldInput, chatters, li, i, txtValue;

    LSInput = localStorage.getItem('userlist');
    console.log("LSInput =",LSInput);
    fieldInput = document.getElementById("userlist").value.toLowerCase();
    console.log("fieldInput = ",fieldInput);

    if (fieldInput !== LSInput) {
        if (fieldInput.length > 0) {
            // write data from field to localstorage if different
            localStorage.setItem('userlist', fieldInput);
        }
        else {
            // delete localstorage key if field is emptied
            localStorage.removeItem('userlist');
        }
    }
    
    chatters = document.getElementById("chatters");
    li = chatters.getElementsByTagName("li");

    if(fieldInput != 0){
        for (i = 0; i < li.length; i++) {
            let element = li[i];
            txtValue = element.textContent || element.innerText;
            
            if (txtValue.includes(fieldInput)) {
                element.classList.add("custom-user");
                //element.style.display = "";
            } else {
                //element.style.display = "none";
            }
            
        }
    } else {
        for (i = 0; i < li.length; i++) {
            let element = li[i];
            element.style.display = "";
        }
    }
};

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function botCheck(user,botList) {
    // read huge bot list from local file
    // source: https://github.com/thatvoidcat/twitch_insights_bot_names

    //  check the full file for bots
    if (botList.includes(user)) {
        return user;
    }

}

function serviceCheck(user) {
    // preliminary list, will be added to later
    const serviceBot = [
        '9kmmrbot',
        'amazeful',
        'amazefulbot',
        'buttsbot',
        'commanderroot',
        'creatisbot',
        'dinu',
        'dr3ddbot',
        'fossabot',
        'kikettebot',
        'lattemotte',
        'logiceftbot',
        'logviewer',
        'lolrankbot',
        'mikuia',
        'mirrobot',
        'moobot',
        'mtgbot',
        'nightbot',
        'overrustlelogs',
        'own3d',
        'p4nth3rb0t',
        'playwithviewersbot',
        'pokemoncommunitygame',
        'pretzelrocks',
        'quirkapp',
        'rainmaker',
        'restreambot',
        'sery_bot',
        'sixflagsmagicmountain',
        'socialblade',
        'songlistbot',
        'soundalerts',
        'sport_scores_bot',
        'ssakdook',
        'streambee_bot',
        'streamcaptainbot',
        'streamdeckerbot',
        'streamelements',
        'streamholics',
        'streamjar',
        'streamkit',
        'streamlabs',
        'streamstickers',
        'tipeeebot',
        'vivbot',
        'vtuberplus',
        'wizebot',
        'wzbot'
    ];
    return serviceBot.includes(user);
}

function customUserCheck(user) {
    // read list from localstorage
    let customUser = [];
    
    if (localStorage.getItem('userlist')) {
        customUser = localStorage.getItem('userlist');
    }

    return customUser.includes(user);
}

function getChatters(token, broadcaster) {
    const requestParams = new URLSearchParams();
    requestParams.append("broadcaster_id", broadcaster.id);
    requestParams.append("moderator_id", broadcaster.id);
    requestParams.append("first", 1000);

    const url = `https://api.twitch.tv/helix/chat/chatters?${requestParams}`;
    const broadcasterName = document.getElementById('broadcaster-name');
    broadcasterName.textContent=broadcaster.name.toLowerCase();

    [].forEach.call(document.querySelectorAll('.hide'), function (el) {
        el.classList.remove('hide');
    });

    loaderWrapper.classList.remove('loader-hide');

    fetch(url, {
        headers: { Authorization: 'Bearer ' + token, 'Client-Id': CLIENT_ID }
      }).then(async function (response) {
        let testData = {
            "_links": {},
            "chatter_count": 7,
            "chatters": {
              "admins": [],
              "broadcaster": [],
              "global_mods": [],
              "moderators": [
                "streamelements",
                "finitesingularity",
                "mattythreeshoes",
                "dramaman"
              ],
              "staff": [
                "zachbussey",
                "slashie101"
              ],
              "viewers": [
                "anna_banana_10",
                "affewfw6235325",
                "bestvieweroftwitch",
                "commanderroot",
                "creatisbot",
                "gnare",
                "robohubby",
                "sc0ttzen",
                "scg_noisy",
                "sebi_96000",
                "shadoow_lol",
                "silva_lindow",
                "slaan",
                "sophiafox21",
                "streambee_bot",
                "tinarif",
                "standardvieweroftwitch"
              ],
              "vips": [
                "fancyperson",
                "timeenjoyed"
              ]
            }
          }
        if (response.ok) {
            return await response.json();
            //return testData;
        } else {
            return Promise.reject(response);
        }
    }).then(async function (data) {
        document.getElementById('chatters').innerHTML = '';
        const viewerCount = data.total;

        document.querySelector('#totalcount span').innerHTML = addCommas(viewerCount);
        const botListRaw = await loadedBotListPromise;
        const botList = botListRaw.split('\n');
        console.log(botList.length + ' bots in list');

        const userType = 'Chatter';
        let divItem = document.createElement("div");
        divItem.innerHTML = `<h3>${userType} (${addCommas(viewerCount)})</h3>`;
        divItem.classList.add('row', userType);
        let unorderedList = document.createElement("ul");
        document.getElementById('chatters').append(divItem);
        divItem.append(unorderedList);
        for (user of data.data) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<a target="_blank" href="https://twitch.tv/${user.user_login}">${user.user_name}</a>`;
            unorderedList.appendChild(listItem); 
            if (customUserCheck(user.user_login)) {
                listItem.classList.add("custom-user");
            }
            else if (serviceCheck(user.user_login)) {
                listItem.classList.add("service-user");
            }
            else if (botCheck(user.user_login, botList)) {
                listItem.classList.add("bot-user");
            }
                
        };
        loaderWrapper.classList.add('loader-hide');
    }).catch(function (err) {
        console.warn('Something went wrong!', err);
    });

    setTimeout(function() {
        
        getChatters(token, broadcaster);

    }, 180000); // every 3 mins
}
