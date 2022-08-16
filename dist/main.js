const filterButton = document.querySelector>('#filter');
const showContinents = document.querySelector('#show-country');
const blockFilter = document.querySelector('#filter-block')
const regionDiv = document.querySelector('#regionDiv');
let sectionCountry = document.querySelector('#section-country')
let liRegion = document.querySelectorAll('.regionLi')
const url = 'https://restcountries.com/v3.1/all/';

const request = fetch(url)
.then(response => response.json())
.then(data => {

    
    for (let i = 0; i < data.length; i++) {
        

        let blockCountry = document.createElement('div')
        let ul = document.createElement('ul')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let title = document.createElement('h2')
        blockCountry.className = 'block-country'                            
        div.className = 'info-block'
        img.src = data[i].flags.png
        title.innerText = data[i].name.common
        
        let liData = [data[i].population, data[i].region, data[i].capital[0]]
        //console.log(data[i].capital[0]);

        const dataObject = {
            Population : data[i].population,
            Region : data[i].region,
            Capital : data[i].capital[0]
        }
        console.log(dataObject)
        
        for (let index = 0; index < liData.length; index++) {
            let li = document.createElement('li')
            
            for (const key in dataObject) {
          
                if (dataObject[key] === liData[index]) {
                    li.textContent = `${key} : ${liData[index]}`
                }
                
            }   
            console.log(li);                             
            ul.append(li)
            
        }
        div.append(title, ul)
        blockCountry.append(img, div)    
        sectionCountry.append(blockCountry)    
        
    }
    
    
    // Fin de display region
})