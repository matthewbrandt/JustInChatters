const params = new URLSearchParams(window.location.search);
const broadcaster = params.get("broadcaster");
const loaderWrapper = document.getElementById('loader-wrapper');

async function preLoadBotList () {
    console.log("file loaded");
    const botList = './bot_list.txt';
    const response = await fetch(botList);
    return await response.text();
}
const loadedBotListPromise = preLoadBotList();

let username = localStorage.getItem('username');
let footerState = localStorage.getItem('footer');

if(broadcaster){
    getChatters(broadcaster);
    setBroadcasterLS(broadcaster);
} else if(username) {
    getChatters(username);
    urlUpdate(username);
}else{
    loadBroadcaster();
}
if(JSON.parse(footerState) === true ){
    hideFooter();
}

function clickHandler() {
    broadcasterInput = document.getElementById('broadcaster').value;
    urlUpdate(broadcasterInput);
    getChatters(broadcasterInput);
    setBroadcasterLS(broadcasterInput);
    footer = document.getElementById('footer');
    footer.style.display = 'block';
}

function urlUpdate(broadcaster) {
    const url = new URL(window.location);
    url.searchParams.set('broadcaster', broadcaster);
    window.history.pushState({}, '', url);
}

function loadBroadcaster() {
    footer = document.getElementById('footer');
    footer.style.display = 'none';
    let divItem = document.createElement("div");
    divItem.innerHTML = `<h3>Please input your broadcaster name to view the users in the channel.</h3>
        <form class="search broadcaster-search-wrapper">
        <label for="broadcaster">Enter broadcaster username</label>
        <input class="broadcaster-search" type="text" placeholder="Enter broadcaster username" id="broadcaster" name="broadcaster"/>
        <button id="broadcaster-button" class="button" onclick="clickHandler()">Go</button>
        </form>`;
    document.getElementById('chatters').append(divItem);
 
}

function resetButton() {
    document.getElementById('subheader').innerHTML = '';
    document.getElementById('chatters').innerHTML = '';
    loadBroadcaster();
}

function setBroadcasterLS(broadcaster){
    localStorage.setItem('username', broadcaster);
}

function hideFooter(){
    footer = document.getElementById('footer');
    footer.classList.toggle('main-footer--hide');
    footerText = document.getElementById('footer--hide__text');
    if(footer.classList.contains("main-footer--hide") == true){
        footerText.innerText = 'Show Key';
        localStorage.setItem('footer', false);
    }else{
        footerText.innerText = 'Hide Key';
        localStorage.setItem('footer', true);
    }
}

function filter_results(){
    var input, chatters, table, li, i, txtValue;
    input = document.getElementById("username");
    inputValue = input.value.toLowerCase();
    chatters = document.getElementById("chatters");
    li = chatters.getElementsByTagName("li");

    if(inputValue != 0){
        for (i = 0; i < li.length; i++) {
            //console.log(li[i]);
            let element = li[i];
            txtValue = element.textContent || element.innerText;
            //console.log(txtValue);
            
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

    const knownBots = [
        'amazeful',
        'amazefulbot',
        'buttsbot',
        'commanderroot',
        'creatisbot',
        'dinu',
        'fossabot',
        'lattemotte',
        'logviewer',
        'mirrobot',
        'moobot',
        'nightbot',
        'overrustlelogs',
        'own3d',
        'p4nth3rb0t',
        'pretzelrocks',
        'quirkapp',
        'rainmaker',
        'sixflagsmagicmountain',
        'socialblade',
        'soundalerts',
        'streamcaptainbot',
        'streamdeckerbot',
        'streamelements',
        'streamjar',
        'streamkit',
        'streamlabs',
        'tipeeebot',
        'vivbot',
        'wizebot',
        'wizebot'
    ];

    // first check the "known" botlist
    if (knownBots.includes(user)) {
        return knownBots.includes(user);
    }
    // then check the full file of bots
    else if (botList.includes(user)) {
        return user;
    }

}

function friendCheck(user) {
    // preliminary list
    const digitalFriend = [
        'fredda_the_cat',
        'groversaurus',
        'coppersbeard',
        'codebymistakes',
        'theunoriginaljerk',
        'undefined_process',
        'lurkydev',
        'theclipographer',
        'jeffs_hat_stand'
    ];
    return digitalFriend.includes(user);
}

function clawTeamCheck(user) {
    // preliminary list
    const teamMembers = [
        'whitep4nth3r',
        'theempressaria',
        'metalandcoffee_',
        'ladyofcode',
        'thatn00b__',
        'matty_twoshoes',
        'lucecarter',
        'toefrog',
        'jwalter',
        'haliphax',
        'tdrayson',
        'gacbl',
        'ukmadlz',
        'dr_dinomight',
        'sociablesteve',
        'finitesingularity',
        'canhorn'
    ];
    return teamMembers.includes(user);
}

function getChatters(broadcaster) {
    const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster.toLowerCase()}`
    const broadcasterName = document.getElementById('broadcaster-name');
    broadcasterName.textContent=broadcaster.toLowerCase();

    [].forEach.call(document.querySelectorAll('.hide'), function (el) {
        el.classList.remove('hide');
    });

    loaderWrapper.classList.remove('loader-hide');

    fetch(url).then(async function (response) {
        if (response.ok) {
            return await response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(async function (data) {
        document.getElementById('chatters').innerHTML = '';
        const viewerCount = data.chatter_count;
        if (data.chatters.broadcaster.length > 0) {
            viewerCount-1;
        };
        document.querySelector('#totalcount span').innerHTML = addCommas(viewerCount);
        const botList = await loadedBotListPromise;
        for (key in data.chatters) {
            const userType = key;
            const excludeUserTypes = ['admins','broadcaster','global_mods'];
            const userList = data.chatters[userType];
            if (userList.length > 0 && excludeUserTypes.indexOf(userType) == -1) {
                if (userType !== '') {

                    let divItem = document.createElement("div");
                    divItem.innerHTML = `<h3>${userType} (${addCommas(userList.length)})</h3>`;
                    divItem.classList.add('row', userType);
                    let unorderedList = document.createElement("ul");
                    document.getElementById('chatters').append(divItem);
                    divItem.append(unorderedList);
                    for (let i = 0; i < userList.length; i++) {
                        let listItem = document.createElement("li");
                        let user = userList[i];
                        listItem.innerHTML = `<a target="_blank" href="https://twitch.tv/${user}">${user}</a>`;
                        unorderedList.appendChild(listItem); 
                        if (botCheck(userList[i],botList)) {
                            listItem.classList.add("bot-user");
                        }
                        if (friendCheck(userList[i])) {
                            listItem.classList.add("digitalfriend-user");
                        }
                        if (clawTeamCheck(userList[i])) {
                            listItem.classList.add("clawteam-user");
                        }
                    }
                }
            }
        };
        loaderWrapper.classList.add('loader-hide');
    }).catch(function (err) {
        console.warn('Something went wrong!', err);
    });

    setTimeout(function() {
        
        getChatters(broadcaster);

    }, 180000); // every 3 mins
}
