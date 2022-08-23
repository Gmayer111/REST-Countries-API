const filterButton = document.querySelector('#filter');
const showFilter = document.querySelector('#show-region');
const blockFilter = document.querySelector('#filter-block')
const regionDiv = document.querySelector('#regionDiv');
const sectionCountry = document.querySelector('#section-country');


const url = 'https://restcountries.com/v3.1/all/';
let myArray = [];
let myOArray = [];
let clicked = 1;

// class block {

//     constructor(blockDiv, img, textDiv, title, ul, li) {
//         this.blockDiv = blockDiv
//         this.img = img
//         this.textDiv = textDiv
//         this.title = title
//         this.ul = ul
//         this.li = li
//     }

//     getblockDiv() {
//         return this.blockDiv
//     }

//     setblockDiv(blockDiv) {
//         this.blockDiv = document.createElement('div').className = 'block-country'
//     }

//     getImg() {
//         return this.img
//     }

//     setImg(img) {
//         this.img = document.createElement('img')
//     }

//     getTextDiv() {
//         return this.textDiv
//     }

//     setTextDiv(textDiv) {
//         this.textDiv = document.createElement('div').className = 'info-block'
//     }

//     getTitle() {
//         return this.title
//     }

//     setTitle(title) {
//         this.title = document.createElement('h2')
//     }

//     getUl() {
//         return this.ul
//     }

//     setUl(ul) {
//         this.ul = document.createElement('ul')
//     }

//     getLi() {
//         return this.li
//     }

//     setLi(li) {
//         this.li = document.createElement('li').className
//     }
// }

// const objRegion = {
//     blockCountry: document.createElement('div')
// }

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
        //blockCountry.children[1].children[1].children[1].innerText.replace('Region :', '').trim()  
        if (data[i].region == value) {
            sectionCountry.append(blockCountry)
            return
            console.log(i);
        }else {
            //sectionCountry.append(blockCountry)
        }
    }

}

function showFilterBlock() {
    
}



const request = fetch(url)
.then(response => response.json())
.then(data => {


    this.BlockContent(data)
    
    filterButton.addEventListener('click', e => {
        
        showFilter.style.display = 'block';
        
        for ( let i = 0; i < data.length; i++) {
            myArray.push(data[i].region)
        }
        // Supprime les pays en doublons
        myOArray = [... new Set(myArray)]
        
        if (clicked === 1) {
            
            for (let i = 0; i < myOArray.length; i++) {
                
                let li = document.createElement('li')
                li.innerText = myOArray[i]
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

                    let value = element.textContent
                    this.BlockContent(data, value)

                })

            })               
    })
    
    blockFilter.addEventListener('mouseleave', e => {
        showFilter.style.display = 'none'
    })    

})


