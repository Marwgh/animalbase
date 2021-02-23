
"use strict";
// ⭐
window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let allAnimalFiltered = [];
// allAnimals.sort();

// The prototype for all animals: 
const Animal = {
    star: "",
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start() {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons

    

    document.querySelector("[data-filter=cat]").addEventListener("click", catButton);
    document.querySelector("[data-filter=dog]").addEventListener("click", dogButton);
    document.querySelector("[data-filter=all]").addEventListener("click", allButton);
    document.querySelector("[data-action=sort]").addEventListener("click", sortButton);
    // document.querySelector("[data-sort=star]").addEventListener()

    loadJSON();
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );
    allAnimalFiltered = allAnimals;
    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function catButton() {
    const onlyCats = allAnimals.filter(isCat);
    allAnimalFiltered = onlyCats;
    displayList(onlyCats);
}

function dogButton() {
    const onlyDogs = allAnimals.filter(isDog);
    allAnimalFiltered = onlyDogs;
    displayList(onlyDogs);
}

function allButton() {
    const all = allAnimals;
    allAnimalFiltered = all;
    displayList(all);
    console.log(all);
}

function sortButton() {
    // const sortNames = allAnimals.sort(compareName);
    // allAnimals.sort(compareByName);
    const sortBy = event.target.dataset.sort;

    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    animal.star = "☆";
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
    buildList();
}

function buildList() {
    // allAnimalFiltered = 
    displayList(allAnimalFiltered);

}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // add event listener
    // document.querySelector("[data-sort=star]").addEventListener()

    // set clone data
    clone.querySelector("[data-field=star]").addEventListener("click", clickStar);
    
    function clickStar() {
        if (animal.star === "☆") {
            animal.star = "⭐";
            console.log("⭐");
        } else if (animal.star === "⭐") { 
            animal.star = "☆";
            console.log("☆");
        }
        console.log(animal);
        buildList();
    }

    clone.querySelector("[data-field=star]").textContent = animal.star;
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}



// function isStar(animal) {
//     if (animal.star === "star") {
//         return true;
//     } else {
//         return false;
//     }
// }

function isCat(animal) {
    if (animal.type === "cat") {
        return true;
    } else {
        return false;
    }
}

function isDog(animal) {
    if (animal.type === "dog") {
        return true;
    } else {
        return false;
    }
}

// function isAll(animal) {
//     if (animal.type === "all") {
//         return true;
//     } else {
//         return false;
//     }
// }

// function compareName(animalA, animalB) {
//     if (animalA.name < animalB.name) {
//         return -1;
//     } else {
//         return 1;
//     }
// }

function sortList(sortBy) {
    let sortList = allAnimals;

    if (sortBy === "name") {
        sortedList = sortedList.sort(sortByName);
    } else if (sortBy ===  "type") {
        sortList = sortedList.sort(sortByType);
    }
    displayList(sortedList);
}
