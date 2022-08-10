const filterButton = document.querySelector<HTMLButtonElement>('#filter');
const showContinents = document.querySelector<HTMLElement>('#show-country');
const blockFilter = document.querySelector<HTMLElement>('#filter-block')
const regionDiv = document.querySelector<HTMLDivElement>('#regionDiv');
const sectionCountry = document.querySelector<HTMLElement>('#section-country')
const url = 'https://restcountries.com/v3.1/all/';

const request = fetch(url)
.then(response => response.json())
.then(data => {

    let myArray: string[] = [];
    let myOArray: string[] = [];
    let clicked: number = 1;

    filterButton?.addEventListener('click', displayRegion)
    
    function displayRegion() {
        
        if (filterButton && showContinents && regionDiv) {  

            // Affiche la liste des continents
            showContinents.style.display = 'block';
            
            for ( let i = 0; i < data.length; i++) {
                myArray.push(data[i].region)
            }
            // Supprime les pays en doublons
            myOArray = [... new Set(myArray)]
            
            if (clicked === 1) {

                for (let i = 0; i < myOArray.length; i++) {
                    
                    let li: HTMLElement = document.createElement('li')
                    li.innerText = myOArray[i]
                    li.className = 'regionLi'
                    regionDiv.appendChild(li)  
                    clicked = 2;
                    
                }                
            }else if (clicked === 2) {
                clicked = 0;
            }

            // Renvoie les pays des continents
            let liRegion = document.querySelectorAll('.regionLi')
            liRegion.forEach(function (element) {
                element.addEventListener('click', () => {

                  
                    sectionCountry?.append('')      
                    
                    for (let i = 0; i <= data.length; i++) {
                        
                        
                        let blockCountry = document.createElement('div')
                        blockCountry.className = 'block-country'                            

                        let img: HTMLImageElement = document.createElement('img')
                        img.src = data[i].flags.png

                        let div = document.createElement('div')
                        div.className = 'info-block'

                        let title = document.createElement('h2')
                        title.innerText = data[i].name.common
                        let ul: HTMLUListElement = document.createElement('ul')
                        let liData: string[] = [data[i].population, data[i].region, data[i].capital[0]]
                        
                        const dataObject: {[key: string]: string} =
                        {
                            Population : data[i].population,
                            Region : data[i].region,
                            Capital : data[i].capital[0]
                        }

                        for (let index = 0; index < liData.length; index++) {
                            let li: HTMLLIElement = document.createElement('li')
                            
                            for (const key in dataObject) {
                                    
                                if (dataObject[key] === liData[index]) {
                                    
                        
                                    li.textContent = `${key} : ${liData[index]}`

                                    
                                }
                            }                                
                            ul.append(li)
                            
                        }
                        div.append(title, ul)
                        blockCountry?.append(img, div)    
                        sectionCountry?.append(blockCountry)                                                     
                            
                                          
                        
                    }
                })
            })

        }
    }

    
    
    blockFilter?.addEventListener('mouseleave', () => {
        if (showContinents)     
            showContinents.style.display = 'none'
    })

})
    .catch(err => {console.log(err);
});



