const filterButton = document.querySelector('#filter');
const showFilter = document.querySelector('#show-region');
const blockFilter = document.querySelector('#filter-block')
const regionDiv = document.querySelector('#regionDiv');
const sectionCountry = document.querySelector('#section-country');
const regionArray = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const urlAll = 'https://restcountries.com/v3.1/all/';
const urlRegion = 'https://restcountries.com/v3.1/region/';
let clicked = 1;
let n = 0

function BlockContent(data, value) {

    

    for (let i = 0; i < 7; i++) {

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
        n++
    
    
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
                    n++
                }else {
                    li.textContent = `${key} : ${liData[index]}`
                }
            }   
            ul.append(li)
        }
        
        div.append(title, ul)
        blockCountry.append(img, div)   
        sectionCountry.append(blockCountry)
        console.log(n);

    }

}

// Ce bloque affiche tous les pays
const requestAll = fetch(urlAll)
.then(response => response.json())
.then(data => {this.BlockContent(data)})

    filterButton.addEventListener('click', e => {
        
        showFilter.style.display = 'block';
        
        if (clicked === 1) {
            
            for (let i = 0; i < regionArray.length; i++) {
                
                let li = document.createElement('li')
                li.textContent = regionArray[i]
                li.className = 'regionLi'
                regionDiv.appendChild(li)  
                clicked = 2;
            }          
            
        }else if (clicked === 2) {
            clicked = 0;
        }


        const liRegion = document.querySelectorAll('.regionLi');
            liRegion.forEach(function (element) {
                element.addEventListener('click', e => {
                    document.querySelectorAll('.block-country').forEach(e => e.style.display = 'none')
                    let value = element.textContent
                    const requestRegion = fetch(`https://restcountries.com/v3.1/region/${value}`)
                    .then(response => response.json())
                    .then(data => {this.BlockContent(data)})
                })

            })               
    })
    
    blockFilter.addEventListener('mouseleave', e => {
        showFilter.style.display = 'none'
    })    




