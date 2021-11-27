const params = new URLSearchParams(window.location.search);
const broadcaster = params.get("broadcaster");
const loaderWrapper = document.getElementById('loader-wrapper');

let username = localStorage.getItem('username');
let footerState = localStorage.getItem('footer');
console.log(footerState);

if(broadcaster){
    getChatters(broadcaster);
    setBroadcasterLS(broadcaster);
} else if(username) {
    getChatters(username);
}else{
    loadBroadcaster();
}
if(JSON.parse(footerState) === true ){
    hideFooter();
}

// empty parameter
// enter text in field
// go => loads

// streamer filled
// click SVG
// remove all content => OK
// display form field
// click go => loads


function clickHandler() {
    broadcasterInput = document.getElementById('broadcaster').value;
    const url = new URL(window.location);
    url.searchParams.set('broadcaster', broadcasterInput);
    window.history.pushState({}, '', url);
    getChatters(broadcasterInput);
    setBroadcasterLS(broadcasterInput);
    footer = document.getElementById('footer');
    footer.style.display = 'block';
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

function botCheck(user) {
    // preliminary list
    const knownBots = [
        'commanderroot',
        'p4nth3rb0t',
        'streamlabs',
        'streamelements',
        'nightbot',
        'wizebot',
        'buttsbot',
        'anotherttvviewer',
        'kaxips06',
        'soundalerts',
        'sixflagsmagicmountain',
        'quirkapp'
    ];
    return knownBots.includes(user);
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

    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        document.getElementById('chatters').innerHTML = '';
        const viewerCount = data.chatter_count;
        if (data.chatters.broadcaster.length > 0) {
            viewerCount-1;
        };
        document.querySelector('#totalcount span').innerHTML = addCommas(viewerCount);
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
                        if (botCheck(userList[i])) {
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
