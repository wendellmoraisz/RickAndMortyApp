fetch('https://rickandmortyapi.com/api/character')
    .then(res => res.json())
    .then(json => {
        inserirNaPagina(json)
        fetch(json.info.next)
            .then(res => res.json())
            .then(json => inserirNaPagina(json))
    })
    .catch(e => console.log(e))

const container = document.querySelector('.container')

function inserirNaPagina(response) {
    response.results.map(result => {
        container.innerHTML += `
            <div class="character-card">
            <div> <img src="${result.image}"> </div>
            <h2>${result.name}</h2>
            <div><p class="status-wrapper"><span class="status"></span> ${result.status} - ${result.species}</p></div>
            <p><span class="location">Last know location: </span>${result.location.name}</p>
            </div>
            `
            if(result.status === 'Alive'){
                let spanStatus = document.querySelectorAll('.status')
                spanStatus[spanStatus.length - 1].classList.add('alive')
            } else if(result.status === 'Dead') {
                let spanStatus = document.querySelectorAll('.status')
                spanStatus[spanStatus.length - 1].classList.add('dead')
            }
        })
}
