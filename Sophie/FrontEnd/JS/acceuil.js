import { creerFiltres, afficherWorks } from "./functions.js"

//Recuperation depuis l'api//
let works = fetch('http://localhost:5678/api/works')
            .then(works => works.json())

let categories = fetch('http://localhost:5678/api/categories')
            .then(categories => categories.json())            

//Creation des projets dans le Dom//
 //creations des boutton filtres/
categories.then (categories=>{
         creerFiltres(categories)
})   
//generation des projets en utilisant les données de l'api//
works.then(works => {
    afficherWorks(works) 
})

