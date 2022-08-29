const filterButton = document.querySelector('#filter');
const showRegion = document.querySelector('#show-region');
const filterBlock = document.querySelector('#filter-block')
const regionDiv = document.querySelector('#regionDiv');
const sectionCountry = document.querySelector('#section-country');
const closeModal = document.querySelector('#close-modal')
const displayCountryInfo = document.querySelector('#display-country-box')
const regionArray = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const urlAll = 'https://restcountries.com/v3.1/all/';
const urlRegion = 'https://restcountries.com/v3.1/region/';
let clicked = 1;

function BlockContent(data) {
    for (let i = 0; i < data.length; i++) {
        // Ajoute aucun chef lieu si aucune capitale
        if (!data[i].hasOwnProperty('capital')) 
        data[i]['capital'] = ['Aucun chef-lieu']
        
        // On crée le block country pour itérer dessus    
        let blockCountry = document.createElement('div')
        blockCountry.className = 'block-country'
        let ul = document.createElement('ul')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let title = document.createElement('h2')                 
        div.className = 'info-block'
        img.src = data[i].flags.png
        title.innerText = data[i].name.common


        let liData = [data[i].population, data[i].region, data[i].capital[0]]    
    
        let dataObject = {
            Population : data[i].population,
            Region : data[i].region,
            Capital : data[i].capital[0]
        }
        
        for (let index = 0; index < liData.length; index++) {
            let li = document.createElement('li')
            
            for (const key in dataObject) {
                
                if (dataObject[key] === liData[index]) 
                if (key == 'Region') {
                    li.className = 'li-region'
                    li.textContent = `${key} : ${liData[index]}`
                }else {
                    li.textContent = `${key} : ${liData[index]}`
                }
            }   
            ul.append(li)
        }
        
        div.append(title, ul)
        blockCountry.append(img, div)  
        sectionCountry.append(blockCountry)

        blockCountry.addEventListener('click', e => {
            displayCountryInfo.style.display = 'block'
            sectionCountry.append(displayCountryInfo)
            displayCountryInfo.append(blockCountry)
        }) 

    }

}

//Ce bloque affiche tous les pays
const requestAll = fetch(urlAll)
.then(response => response.json())
.then(data => {this.BlockContent(data)})

// Création des filtres de recherche
filterButton.addEventListener('click', e => {
    
    showRegion.style.display = 'block';
    
    if (clicked === 1) {
        for (let i = 0; i < regionArray.length; i++) {
            let li = document.createElement('li')
            li.textContent = regionArray[i]
            li.className = 'regionLi'
            regionDiv.append(li)  

            // Ajouter event dans la boucle, sinon hors event il se répéte
            // value est envoyée à la fonction pour filtrer les pays des régions
            li.addEventListener('click', el => {
                document.querySelectorAll('.block-country').forEach(e => e.style.display = 'none')
                let value = li.textContent
                const requestRegion = fetch(`https://restcountries.com/v3.1/region/${value}`)
                .then(response => response.json())
                .then(data => {
                    this.BlockContent(data)
                })
                
            })


            clicked = 2;
        }          
    }else if (clicked === 2) {
        clicked = 0;
    } 
        
})
    
 showRegion.addEventListener('mouseleave', e => {
    showRegion.style.display = 'none'
})                           
 

closeModal.addEventListener('click', e => {
    displayCountryInfo.style.display = 'none'
})


