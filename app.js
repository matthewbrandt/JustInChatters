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

function getChatters(broadcaster) {
    const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster.toLowerCase()}`
    const broadcasterName = document.getElementById('broadcaster-name');
    broadcasterName.textContent=broadcaster.toLowerCase();

    [].forEach.call(document.querySelectorAll('.hide'), function (el) {
        el.classList.remove('hide');
    });

    loaderWrapper.classList.remove('loader-hide');

    fetch(url).then(async function (response) {
        let testData = {
            "_links": {},
            "chatter_count": 7,
            "chatters": {
              "admins": [],
              "broadcaster": [],
              "global_mods": [],
              "moderators": [
                "streamelements"
                
              ],
              "staff": [
                "zachbussey"
              ],
              "viewers": [
                "anna_banana_10",
                "commanderroot",
                "creatisbot",
                "sophiafox21",
                "streambee_bot",
                "tinarif"
              ],
              "vips": [
                "fancyperson"
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
                        if (serviceCheck(userList[i])) {
                            listItem.classList.add("service-user");
                        }
                        if (botCheck(userList[i],botList)) {
                            listItem.classList.add("bot-user");
                        }
                        
                    }
                }
            }
        };
        // trigger modpulse here
        let modCount = document.querySelectorAll('.moderators li:not(.service-user,.bot-user)').length;
        let prevModCountLS = localStorage.getItem('previousModCount');
        // if previous is empty set it
        if (prevModCountLS == undefined) {
            localStorage.setItem('previousModCount', modCount);
        }
        
        // if currentModValue = 0 and previous modvalue > 0 then modpulse

        if (modCount == 0 && prevModCountLS > 0) {
            document.body.classList.add('pulse');   
            //window.alert("All mods have left the building!")         
        }
        
        // overwrite previous value with current value
        localStorage.setItem('previousModCount', modCount);
        
        loaderWrapper.classList.add('loader-hide');
    }).catch(function (err) {
        console.warn('Something went wrong!', err);
    });

    setTimeout(function() {
        
        getChatters(broadcaster);

    }, 180000); // every 3 mins
}
