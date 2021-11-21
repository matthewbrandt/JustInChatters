const broadcaster = 'matty_twoshoes'
const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster}`

function getChatters() {
    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        document.getElementById('chatters').innerHTML = '';
        console.log(data.chatters);
        for (key in data.chatters) {
            const userType = key;
            const excludeUserTypes = ['admins','broadcaster','global_mods'];
            if (data.chatters[userType].length > 0 && excludeUserTypes.indexOf(userType) == -1) {
                if (userType !== 'viewers') {
                    let divItem = document.createElement("div");
                    divItem.innerHTML = `<h2>${userType}</h2>`;
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
                        divItem.innerHTML = `<h2>${userType}</h2>`;
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
        
    }).catch(function (err) {
        console.warn('Something went wrong! ', err);
    });

    setTimeout(function() {

        getChatters();

    }, 180000); // every 3 mins
}

getChatters();