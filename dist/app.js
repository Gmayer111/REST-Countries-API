"use strict";
const filterButton = document.querySelector('#filter');
const showFilter = document.querySelector('#show-country');
const regionDiv = document.querySelector('#regionDiv');
const url = 'https://restcountries.com/v3.1/all/';
const request = fetch(url)
    .then(response => response.json())
    .then(data => {
    let myArray = [];
    let myOArray = [];
    let clicked = 1;
    let regionValue = '';
    filterButton === null || filterButton === void 0 ? void 0 : filterButton.addEventListener('click', displayRegion);
    function displayRegion(e) {
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
                    li.addEventListener('click', () => {
                        console.log(li.innerText);
                        regionValue = li.innerText;
                        return regionValue;
                    });
                }
            }
            else if (clicked === 2) {
                clicked = 0;
            }
        }
    }
    showFilter === null || showFilter === void 0 ? void 0 : showFilter.addEventListener('mouseleave', () => {
        showFilter.style.display = 'none';
    });
})
    .catch(err => {
    console.log(err);
});
