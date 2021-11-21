const params = new URLSearchParams(window.location.search);
const broadcaster = params.get("broadcaster");
const loaderWrapper = document.getElementById('loader-wrapper');

if(broadcaster){
    getChatters(broadcaster);
} else {
    let divItem = document.createElement("div");
    divItem.innerHTML = '<h3>Please input your broadcaster name to view the users.</h3><div class="search broadcaster-search-wrapper"><label for="broadcaster">Enter broadcaster username</label><input class="broadcaster-search" type="text" placeholder="Enter broadcaster username" id="broadcaster" name="broadcaster"/><button id="broadcaster-button" class="button">Go</button></div>';
    document.getElementById('chatters').append(divItem);

    document.getElementById("broadcaster-button").addEventListener("click", function() {
        broadcasterInput = document.getElementById('broadcaster').value;
        const url = new URL(window.location);
        url.searchParams.set('broadcaster', broadcasterInput);
        window.history.pushState({}, '', url);
      
        getChatters(broadcasterInput);
    }); 
}

function filter_results(){
    var input, chatters, table, li, i, txtValue;
    input = document.getElementById("username");
    inputValue = input.value;
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

function getChatters(broadcaster) {
    const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster}`
    const broadcasterName = document.getElementById('broadcaster-name');
    broadcasterName.textContent=broadcaster;

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
        console.log(data.chatters);
        for (key in data.chatters) {
            const userType = key;
            const excludeUserTypes = ['admins','broadcaster','global_mods'];
            if (data.chatters[userType].length > 0 && excludeUserTypes.indexOf(userType) == -1) {
                if (userType !== 'viewers') {
                    let divItem = document.createElement("div");
                    divItem.innerHTML = `<h3>${userType} (${addCommas(data.chatters[userType].length)})</h3>`;
                    divItem.classList.add('row', userType);
                    let unorderedList = document.createElement("ul");
                    document.getElementById('chatters').append(divItem);
                    divItem.append(unorderedList);
                    for (let i = 0; i < data.chatters[userType].length; i++) {
                        let listItem = document.createElement("li");
                        let user = data.chatters[userType][i];
                        listItem.innerHTML = `<a target="_blank" href="https://twitch.tv/${user}">${user}</a>`;
                        unorderedList.appendChild(listItem);   
                    }
                }
                else {       
                    let divItem = document.createElement("div");
                        divItem.innerHTML = `<h3>${userType} (${addCommas(data.chatters[userType].length)})</h3>`;
                        divItem.classList.add('row', userType);
                        let unorderedList = document.createElement("ul");
                        document.getElementById('chatters').append(divItem);
                        divItem.append(unorderedList);
                        for (let i = 0; i < data.chatters[userType].length; i++) {
                            let listItem = document.createElement("li");
                            let user = data.chatters[userType][i];
                            listItem.innerHTML = `<a target="_blank" href="https://twitch.tv/${user}">${user}</a>`;
                            unorderedList.appendChild(listItem);   
                        }
                }
            }
        };
        loaderWrapper.classList.add('loader-hide');
    }).catch(function (err) {
        console.warn('Something went wrong! ', err);
    });

    setTimeout(function() {
        
        getChatters(broadcaster);

    }, 180000); // every 3 mins
}

function botCheck(user) {
    // preliminary list
    const knownBots = [
        'commanderroot',
        'pantherbot',
        'streamlabs',
        'streamelements',
        'nightbot',
        'wizebot',
        'buttsbot'
    ];

    if (knownBots.indexOf(user)){
        return true
    } else {
        return false;
    }
}

function friendCheck(user) {
    // preliminary list
    const digitalFriend = [
        'codebymistakes',
        'fredda_the_cat',
        'gowithhim',
        'groversaurus',
        'jeffs_hat_stand',
        'kaxips06',
        'lurkydev',
        'theclipographer',
        'therealsurlybot',
        'theunoriginaljerk',
        'undefined_process'
    ];

    if (digitalFriend.indexOf(user)){
        return true
    } else {
        return false;
    }
}