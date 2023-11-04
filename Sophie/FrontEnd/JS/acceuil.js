import { creerFiltres, afficherWorks, modifierAffichage } from "./functions.js";
let userConnected = false;
let tokenFromStorage = localStorage.getItem("token");
const isUserConnected = () => {
  if (tokenFromStorage) {
    userConnected = true;
  }
};
isUserConnected();
//Recuperation depuis l'api//
let works = fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);
let categories = fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);

//Creation des projets dans le Dom//
//creations des boutton filtres/
categories.then((categories) => {
  if (userConnected !== true) {
    creerFiltres(categories);
  }
});
//generation des projets en utilisant les données de l'api//
works.then((works) => {
  afficherWorks(works);
});

//modification de l'affichage si l'utilisateur est connecté/

if (userConnected == true) {
  modifierAffichage();
}
