const container = document.querySelector('.container')

function inserirNaPagina(response) {
        container.innerHTML += `
            <div class="character-card">
            <img src="${response.image}">
            <h2>${response.name}</h2>
            <p class="status-wrapper"><span class="status"></span> ${response.status} - ${response.species}</p>
            <p><span class="location">Last know location: </span>${response.location.name}</p>
            </div>
            `
            if(response.status === 'Alive'){
                let spanStatus = document.querySelectorAll('.status')
                spanStatus[spanStatus.length - 1].classList.add('alive')
            } else if(response.status === 'Dead') {
                let spanStatus = document.querySelectorAll('.status')
                spanStatus[spanStatus.length - 1].classList.add('dead')
            } else {
                let spanStatus = document.querySelectorAll('.status')
                spanStatus[spanStatus.length - 1].classList.add('unkdown')
            }
}

let url = 'https://rickandmortyapi.com/api/character'
let charactersOfTheDay = []
let arr = []

    for(let i = 1; i < 42; i++){
       fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
       .then(res => res.json())
       .then(json => charactersOfTheDay.push(json))
       .then(() => {
        if(charactersOfTheDay.length == 41){
            for(let i = 0; i < 3; i++)
            inserirNaPagina(charactersOfTheDay[Math.floor(Math.random() * 16)].results[Math.floor(Math.random() * 18)])
        }   
    })
   }

   function setAllCharacters(){
       container.innerHTML = ''
       let allCharacters = []
    for(let i = 1; i < 42; i++){
        fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
        .then(res => res.json())
        .then(json => allCharacters.push(json))
        .then(() => {
         if(allCharacters.length == 41){
             for(let i = 0; i < 10; i++){
                 allCharacters[i].results.forEach(res => {
                     inserirNaPagina(res)
                 })
             }
         }
     })
    }
   }

   function setLocation(location) {
    container.innerHTML += `
    <div class="location-card">
    <h1>${location.name}</h1>
    <p>Type: ${location.type}</p>
    <p>Dimension: ${location.dimension}</p>
    <p class="residents">Residents: ${location.residents.length} <button class="residents-button" id="${location.id}"><i class="fas fa-arrow-down"></i></button></p>
    <div class="location-residents-container" id="${location.url}">
        ${location.residents.forEach(e => {
            fetch(e)
            .then(res => res.json())
            .then(json => {
                document.getElementById(location.url).innerHTML += `
                <div class="location-residents character-card">
                <img src="${json.image}">
                <h2>${json.name}</h2>
                <p class="status-wrapper"><span class="status"></span> ${json.status} - ${json.species}</p>
                </div>
                `
                if(json.status === 'Alive'){
                    let spanStatus = document.querySelectorAll('.status')
                    spanStatus[spanStatus.length - 1].classList.add('alive')
                } else if(json.status === 'Dead') {
                    let spanStatus = document.querySelectorAll('.status')
                    spanStatus[spanStatus.length - 1].classList.add('dead')
                } else {
                    let spanStatus = document.querySelectorAll('.status')
                    spanStatus[spanStatus.length - 1].classList.add('unkdown')
                }
            })
        })}
    </div>
</div>
    `
}

document.getElementById('locations').onclick = () => {
    container.innerHTML = ''
    let allLocations = []
    for(let i = 1; i <= 20; i++){
         fetch(`https://rickandmortyapi.com/api/location?page=${i}`)
         .then(res => res.json())
         .then(json => allLocations.push(json))
         .then(() => {
             if(allLocations.length == 20){
                 for(let i = 0; i < allLocations.length; i++){
                     allLocations[i].results.forEach(res => {
                         setLocation(res)
                        })
                    }
                }
            })
        }
   }