const broadcaster = 'matty_twoshoes'
const url = `https://jwalter-chatters.builtwithdark.com/?broadcaster=${broadcaster}`

fetch(url).then(function (response) {
    // The API call was successful!
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    for (key in data.chatters) {
        const userType = key;
        const excludeUserTypes = ['admins','broadcaster','global_mods'];
        if (data.chatters[userType].length > 0 && excludeUserTypes.indexOf(userType) == -1) {
            if (userType !== 'viewers') {
                let unorderedList = document.createElement("ul");
                unorderedList.classList.add('row', userType);
                unorderedList.innerHTML = `<h2>${userType}</h2>`;
                document.getElementById('chatters').append(unorderedList);
                for (let i = 0; i < data.chatters[userType].length; i++) {
                    let listItem = document.createElement("li");
                    listItem.className = 'tile';
                    let user = data.chatters[userType][i];
                    listItem.textContent = user;
                    unorderedList.appendChild(listItem);   
                }
                
                
            }
            else {
                const friendlyBots = [];
                const knownBots = [];
                
                let unorderedList = document.createElement("ul");
                unorderedList.classList.add('row', userType);
                unorderedList.innerHTML = `<h2>${userType}</h2>`;
                document.getElementById('chatters').append(unorderedList);
                for (let i = 0; i < data.chatters[userType].length; i++) {
                    let listItem = document.createElement("li");
                    listItem.className = 'tile';
                    let user = data.chatters[userType][i];
                    listItem.textContent = user;
                    unorderedList.appendChild(listItem);   
                }
            }
        }
    };
    
}).catch(function (err) {
    // there was an error
    console.warn('Something went wrong!', err);
});