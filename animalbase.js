"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let allAnimalsFilterd = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    // TODO: Add event-listeners to filter and sort buttons
    const cat = document.querySelector("[data-filter=cat]").addEventListener("click", clickCat );

    document.querySelector("[data-filter=dog]").addEventListener("click", clickDog );

    document.querySelector("[data-filter=all]").addEventListener("click", clickAll );

    document.querySelector("[data-sort=name]").addEventListener("click", clickSortName );
    
}

function clickCat () {
    loadJSON("cat");

}
function clickDog () {
    loadJSON("dog");

}
function clickAll () {
    loadJSON("all");

}
function clickSortName () {
   allAnimalsFilterd.sort(compareName);
   displayList(allAnimalsFilterd);

}

async function loadJSON(filter) {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects( jsonData ,filter );
}

function isDog (animal) {
    if(animal.type === "dog") {
        return true ;
    } else {
        return false
    }
} 

function isCat (animal) {
    if(animal.type === "cat") {
        return true ;
    } else {
        return false
    }
} 
function compareName (a,b) {
    if ( a.name < b.name ) {
        return -1;
    } else {
        return 1 ; 
    }
} 

function prepareObjects( jsonData , filter ) {
    allAnimals = jsonData.map( preapareObject );
    console.log(allAnimals);
    console.log(filter);
    if ( filter === "cat" ) {
        allAnimals = allAnimals.filter(isCat);
        allAnimalsFilterd = allAnimals ;
        displayList(allAnimals);
    } else if ( filter === "dog" ) {
        allAnimals = allAnimals.filter(isDog);
        allAnimalsFilterd = allAnimals  ;
        displayList(allAnimals);
    } else {
        allAnimalsFilterd = allAnimals  ;
        displayList(allAnimals);
    }
    // TODO: This might not be the function we want to call first
    
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    console.log(allAnimalsFilterd);
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


