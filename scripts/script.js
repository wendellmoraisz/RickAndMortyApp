const container = document.querySelector('.container')

function insertInPage(response) {
        let card = document.createElement('div')
        card.classList.add('character-card')

        let img = document.createElement('img')
        img.src = response.image
        card.appendChild(img)

        let h2 = document.createElement('h2')
        h2.textContent = response.name
        card.appendChild(h2)

        let pStatus = document.createElement('p')
        pStatus.classList.add('status-wrapper')
        let spanByStatus = document.createElement('span')
        spanByStatus.classList.add('status')
        spanByStatus.classList.add(response.status)
        pStatus.appendChild(spanByStatus)
        pStatus.append(`${response.status} - ${response.species}`)
        card.appendChild(pStatus)
        
        let pLocation = document.createElement('p')

        let spanLocation = document.createElement('span')
        spanLocation.classList.add('location')
        spanLocation.append('Last know location: ')
        pLocation.appendChild(spanLocation)
        pLocation.append(response.location.name)
        card.appendChild(pLocation)
        
        container.appendChild(card)
}

let charactersOfTheDay = []
    for(let i = 1; i < 42; i++){
       fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
       .then(res => res.json())
       .then(json => charactersOfTheDay.push(json))
       .then(() => {
        if(charactersOfTheDay.length == 41){
            for(let i = 0; i < 3; i++)
            insertInPage(charactersOfTheDay[Math.floor(Math.random() * 41)].results[Math.floor(Math.random() * 19)])
        }   
    })
   }

document.getElementById('characters').onclick = () => setAllCharacters()

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
                     insertInPage(res)
                 })
             }
         }
     })
    }
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

   function setLocation(location) {
    let locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    let h1 = document.createElement('h1')
    h1.append(location.name)
    locationCard.appendChild(h1)

    let pType = document.createElement('p')
    pType.append(`Type: ${location.type}`)
    locationCard.appendChild(pType)

    let pDimension = document.createElement('p')
    pDimension.append(`Dimension: ${location.dimension}`)
    locationCard.appendChild(pDimension)

    let pResidents = document.createElement('p')
    pResidents.classList.add('residents')
    pResidents.append(`Residents: ${location.residents.length} `)
    
    let pResidentsButton = document.createElement('button')
    let iButton = document.createElement('i')
    iButton.classList.add('fas')
    iButton.classList.add('fa-arrow-down')
    pResidentsButton.appendChild(iButton)
    pResidents.appendChild(pResidentsButton)
    locationCard.appendChild(pResidents)

    let residentsContainer = document.createElement('div')
    residentsContainer.classList.add('location-residents-container')
    location.residents.forEach(resident => {
        fetch(resident)
        .then(res => res.json())
        .then(json => {
            let locationCharacterCard = document.createElement('div')
            locationCharacterCard.classList.add('location-residents')
            locationCharacterCard.classList.add('character-card')

            let img = document.createElement('img')
            img.src = json.image
            locationCharacterCard.appendChild(img)

            let h2 = document.createElement('h2')
            h2.append(json.name)
            locationCharacterCard.appendChild(h2)

            let p = document.createElement('p')
            p.classList.add('status-wrapper')
            let span = document.createElement('span')
            span.classList.add('status')
            span.classList.add(json.status)
            p.appendChild(span)
            p.append(`${json.status} - ${json.species}`)
            locationCharacterCard.appendChild(p)

            residentsContainer.appendChild(locationCharacterCard)
        })
    })
    locationCard.appendChild(residentsContainer)
    container.appendChild(locationCard)

    pResidentsButton.onclick = () => {
        residentsContainer.style.maxHeight == '0px' || residentsContainer.style.maxHeight == 0 ? residentsContainer.style.maxHeight = `${residentsContainer.scrollHeight}px` : residentsContainer.style.maxHeight = '0px'
        residentsContainer.classList.toggle('show')

        iButton.classList.toggle('fa-arrow-down')
        iButton.classList.toggle('fa-arrow-up')
    }
}