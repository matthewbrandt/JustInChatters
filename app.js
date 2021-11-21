//const broadcaster = 'matty_twoshoes'
const params = new URLSearchParams(window.location.search);
const broadcaster = params.get("broadcaster");
if(broadcaster){

    const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster}`
    const loaderWrapper = document.getElementById('loader-wrapper')
    const broadcasterName = document.getElementById('broadcaster-name');
    broadcasterName.textContent=broadcaster;

    [].forEach.call(document.querySelectorAll('.hide'), function (el) {
        el.classList.remove('hide');
    });

    function getChatters() {
        loaderWrapper.classList.remove('loader-hide');
        fetch(url).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            document.getElementById('chatters').innerHTML = '';
            document.querySelector('#count span').innerHTML = addCommas(data.chatter_count-1);
            
            console.log(data.chatters);
            for (key in data.chatters) {
                const userType = key;
                const excludeUserTypes = ['admins','broadcaster','global_mods'];
                if (data.chatters[userType].length > 0 && excludeUserTypes.indexOf(userType) == -1) {
                    if (userType !== 'viewers') {
                        let divItem = document.createElement("div");
                        divItem.innerHTML = `<h3>${userType}</h3>`;
                        divItem.classList.add('row', userType);
                        let unorderedList = document.createElement("ul");
                        document.getElementById('chatters').append(divItem);
                        divItem.append(unorderedList);
                        for (let i = 0; i < data.chatters[userType].length; i++) {
                            let listItem = document.createElement("li");
                            let user = data.chatters[userType][i];
                            listItem.textContent = user;
                            unorderedList.appendChild(listItem);   
                        }
                        
                        
                    }
                    else {
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
                        const knownBots = [
                            'commanderroot'
                        ];
                        
                        let divItem = document.createElement("div");
                            divItem.innerHTML = `<h3>${userType}</h3>`;
                            divItem.classList.add('row', userType);
                            let unorderedList = document.createElement("ul");
                            document.getElementById('chatters').append(divItem);
                            divItem.append(unorderedList);
                            for (let i = 0; i < data.chatters[userType].length; i++) {
                                let listItem = document.createElement("li");
                                let user = data.chatters[userType][i];
                                listItem.textContent = user;
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

        getChatters();

        }, 180000); // every 3 mins
    }

    getChatters();

    
}else{
    let divItem = document.createElement("div");
    divItem.innerHTML = '<h3>Please add a Broadcaster to the url to view chatters</h3>';
    document.getElementById('chatters').append(divItem);
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
    }else{
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
