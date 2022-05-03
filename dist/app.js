"use strict";
const filterButton = document.querySelector('#filter');
const showFilter = document.querySelector('#show-country');
const blockFilter = document.querySelector('#filter-block');
const regionDiv = document.querySelector('#regionDiv');
const sectionCountry = document.querySelector('#section-country');
const url = 'https://restcountries.com/v3.1/all/';
const request = fetch(url)
    .then(response => response.json())
    .then(data => {
    let myArray = [];
    let myOArray = [];
    let clicked = 1;
    filterButton === null || filterButton === void 0 ? void 0 : filterButton.addEventListener('click', displayRegion);
    function displayRegion() {
        if (filterButton && showFilter && regionDiv) {
            showFilter.style.display = 'block';
            for (let i = 0; i < data.length; i++) {
                myArray.push(data[i].region);
            }
            // Supprime les doublons
            myOArray = [...new Set(myArray)];
            if (clicked === 1) {
                for (let i = 0; i < myOArray.length; i++) {
                    let li = document.createElement('li');
                    li.innerText = myOArray[i];
                    li.className = 'regionLi';
                    regionDiv.appendChild(li);
                    clicked = 2;
                }
            }
            else if (clicked === 2) {
                clicked = 0;
            }
            // Renvoie les pays des régions
            let liRegion = document.querySelectorAll('.regionLi');
            liRegion.forEach(function (element) {
                element.addEventListener('click', () => {
                    for (let i = 0; i <= data.length; i++) {
                        if (element.innerHTML === data[i].region) {
                            let blockCountry = document.createElement('div');
                            blockCountry.className = 'block-country';
                            let img = document.createElement('img');
                            img.src = data[i].flags.png;
                            let div = document.createElement('div');
                            div.className = 'info-block';
                            let title = document.createElement('h2');
                            title.innerText = data[i].name.common;
                            let ul = document.createElement('ul');
                            let liData = [data[i].population, data[i].region, data[i].capital[0]];
                            const dataObject = {
                                Population: data[i].population,
                                Region: data[i].region,
                                Capital: data[i].capital[0]
                            };
                            for (let index = 0; index < liData.length; index++) {
                                let li = document.createElement('li');
                                for (const key in dataObject) {
                                    if (dataObject[key] === liData[index]) {
                                        li.textContent = `${key} : ${liData[index]}`;
                                    }
                                }
                                ul.append(li);
                            }
                            div.append(title, ul);
                            blockCountry === null || blockCountry === void 0 ? void 0 : blockCountry.append(img, div);
                            sectionCountry === null || sectionCountry === void 0 ? void 0 : sectionCountry.append(blockCountry);
                        }
                    }
                });
            });
        }
    }
    blockFilter === null || blockFilter === void 0 ? void 0 : blockFilter.addEventListener('mouseleave', () => {
        if (showFilter) {
            showFilter.style.display = 'none';
        }
    });
})
    .catch(err => {
    console.log(err);
});
