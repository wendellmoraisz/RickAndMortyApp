fetch('https://rickandmortyapi.com/api/character')
.then(res => res.json())
.then(json => {

    var container = document.querySelector('.container')

    json.results.map(result => {
        container.innerHTML += `
            <div> <img src="${result.image}"> </div>
            <strong>${result.name}</strong>
            <p> ${result.status} - ${result.species}</p>
            <p>Location: ${result.location.name}</p>
        `
    })
})    