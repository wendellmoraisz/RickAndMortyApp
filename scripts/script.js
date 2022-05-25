const container = document.querySelector('.container');

(function getRandomCharacters() {
    fetch(`https://rickandmortyapi.com/api/character/${Math.floor(Math.random() * 826)},${Math.floor(Math.random() * 826)},${Math.floor(Math.random() * 826)}`)
        .then(res => res.json())
        .then(json => {
            for (let i in json) {
                insertCharacterOnThePage(json[i]);
            };
        })
        .catch(e => console.log(e));
}());

async function newRequest(url) {
    const response = await fetch(url);

    if (!response.ok) throw new Error(response.status);

    const json = await response.json();
    return json;
};

async function getAllCharacters() {
    container.innerHTML = '';
    const data = await newRequest('https://rickandmortyapi.com/api/character');
    let { pages } = data.info;
    let endpoints = [];

    for (let i = 1; i < pages + 1; i++) {
        endpoints.push(`https://rickandmortyapi.com/api/character?page=${i}`);
    };

    async function setCharacters() {
        const requests = endpoints.map(url => fetch(url).then(res => res.json()));

        Promise.all(requests)
            .then(response => {
                response.forEach(e => {
                    e.results.forEach(character => insertCharacterOnThePage(character));
                });
            })
            .catch(e => console.log(e.message));
    };

    await setCharacters();
};

async function getLocations() {
    container.innerHTML = '';
    const data = await newRequest('https://rickandmortyapi.com/api/location');
    let { count } = data.info;
    let endpoints = [];

    for (let i = 1; i < count + 1; i++) {
        endpoints.push(`https://rickandmortyapi.com/api/location/${i}`);
    };
    const requests = endpoints.map(url => fetch(url).then(res => res.json()));

    Promise.all(requests)
        .then(response => {
            response.map(location => insertLocationOnThePage(location));
        })
        .catch(e => console.log(e.message));
};

async function getEpisodes() {
    container.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        newRequest(`https://rickandmortyapi.com/api/episode?page=${i}`)
            .then(res => res.results.forEach(episode => insertEpisodesOnThePage(episode)))
            .catch(e => console.log(e.message));
    };
};

function insertCharacterOnThePage(response) {
    let card = document.createElement('div');
    card.classList.add('character-card');

    let img = document.createElement('img');
    img.alt = `${response.name} character photo`;
    img.src = response.image;
    card.appendChild(img);

    let h2 = document.createElement('h2');
    h2.textContent = response.name;
    card.appendChild(h2);

    let pStatus = document.createElement('p');
    pStatus.classList.add('status-wrapper');
    let spanByStatus = document.createElement('span');
    spanByStatus.classList.add('status');
    spanByStatus.classList.add(response.status);
    pStatus.appendChild(spanByStatus);
    pStatus.append(`${response.status} - ${response.species}`);
    card.appendChild(pStatus);

    let pLocation = document.createElement('p');

    let spanLocation = document.createElement('span');
    spanLocation.classList.add('location');
    spanLocation.append('Last know location: ');
    pLocation.appendChild(spanLocation);
    pLocation.append(response.location.name);
    card.appendChild(pLocation);

    container.appendChild(card);
};

function insertLocationOnThePage(location) {
    let locationCard = document.createElement('div');
    locationCard.classList.add('main-card');

    let h1 = document.createElement('h1');
    h1.append(location.name);
    locationCard.appendChild(h1);

    let pType = document.createElement('p');
    pType.append(`Type: ${location.type}`);
    locationCard.appendChild(pType);

    let pDimension = document.createElement('p');
    pDimension.append(`Dimension: ${location.dimension}`);
    locationCard.appendChild(pDimension);

    let pResidents = document.createElement('p');
    pResidents.classList.add('residents');
    pResidents.append(`Residents: ${location.residents.length} `);

    let pResidentsButton = document.createElement('button');
    let iButton = document.createElement('i');
    iButton.classList.add('fas');
    iButton.classList.add('fa-arrow-down');
    pResidentsButton.appendChild(iButton);
    pResidents.appendChild(pResidentsButton);
    locationCard.appendChild(pResidents);

    let residentsContainer = document.createElement('div');
    residentsContainer.classList.add('main-characters-container');
    location.residents.forEach(resident => fetchCharacter(resident, residentsContainer));

    locationCard.appendChild(residentsContainer);
    container.appendChild(locationCard);
    buttonInteration(pResidentsButton, iButton, residentsContainer);
};

async function fetchCharacter(characterurl, container) {
    await fetch(characterurl)
        .then(res => res.json())
        .then(json => {
            let locationCharacterCard = document.createElement('div');
            locationCharacterCard.classList.add('main-characters');
            locationCharacterCard.classList.add('character-card');

            let img = document.createElement('img');
            img.src = json.image;
            img.alt = `${json.name} character photo`;
            locationCharacterCard.appendChild(img);

            let h2 = document.createElement('h2');
            h2.append(json.name);
            locationCharacterCard.appendChild(h2);

            let p = document.createElement('p');
            p.classList.add('status-wrapper');
            let span = document.createElement('span');
            span.classList.add('status');
            span.classList.add(json.status);
            p.appendChild(span);
            p.append(`${json.status} - ${json.species}`);
            locationCharacterCard.appendChild(p);

            container.appendChild(locationCharacterCard);
        });
};

function insertEpisodesOnThePage(episode) {
    let episodeContainer = document.createElement('div');
    episodeContainer.classList.add('main-card');

    let h1 = document.createElement('h3');
    h1.innerHTML = `${episode.episode} - ${episode.name}`;
    episodeContainer.appendChild(h1);

    let releaseDate = document.createElement('p');
    releaseDate.innerHTML = `Release date of: ${episode.air_date}`;
    episodeContainer.appendChild(releaseDate);

    let p = document.createElement('p');
    p.classList.add('residents');
    p.innerHTML = `Participants: ${episode.characters.length}`;
    episodeContainer.appendChild(p);
    
    let button = document.createElement('button');
    let iButton = document.createElement('i');
    iButton.classList.add('fas');
    iButton.classList.add('fa-arrow-down');
    button.appendChild(iButton);
    p.appendChild(button);
    
    let participantsContainer = document.createElement('div');
    participantsContainer.classList.add('main-characters-container');
    episodeContainer.appendChild(participantsContainer);
    
    episode.characters.forEach(character => fetchCharacter(character, participantsContainer));

    container.appendChild(episodeContainer);
    buttonInteration(button, iButton, participantsContainer);
};

function buttonInteration(button, iButton, elementContainer) {
    button.onclick = () => {
        if (elementContainer.style.maxHeight == '0px' || elementContainer.style.maxHeight == 0) {
            elementContainer.style.maxHeight = `${elementContainer.scrollHeight}px`;

        } else {
            elementContainer.style.maxHeight = '0px';
        };

        elementContainer.classList.toggle('show');

        iButton.classList.toggle('fa-arrow-down');
        iButton.classList.toggle('fa-arrow-up');
    };
};

document.getElementById('characters').addEventListener('click', getAllCharacters);
document.getElementById('locations').addEventListener('click', getLocations);
document.getElementById('episodes').addEventListener('click', getEpisodes);