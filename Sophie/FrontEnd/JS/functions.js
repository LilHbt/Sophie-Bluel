//Fonction pour afficher les projets//
export function afficherWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcation");
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figCaption);
    img.src = works[i].imageUrl;
    figCaption.innerText = works[i].title;
  }
}

//fonction pour generer les bouttons de filtre//
export function creerFiltres(categories) {
  const zoneButtons = document.querySelector(".filtres");
  const buttonReset = document.createElement("button");
  buttonReset.innerText = "Tout";
  buttonReset.setAttribute("id", "reset");
  zoneButtons.appendChild(buttonReset);
  for (let i = 0; i < categories.length; i++) {
    const buttonFilters = document.createElement("button");
    zoneButtons.appendChild(buttonFilters);
    buttonFilters.innerText = categories[i].name;
    buttonFilters.id = categories[i].id;
  }

  listenerButtons();
}
function listenerButtons() {
  let buttons = document.querySelectorAll(".filtres button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      let categoryId = event.target.id;
      filtrerWorks(categoryId);
      //Modification des boutons de filtre au clic//
      let buttonActive = buttons[i];
      buttonActive.classList.add("selected");
      let buttonsArray = Array.prototype.slice.call(buttons);
      let buttonInactive = buttonsArray.filter(
        (buttonsArray) => buttonsArray !== buttons[i]
      );
      buttonInactive.forEach((buttons) => {
        buttons.classList.remove("selected");
      });
    });
  }
}
//fonction pour filtrer les projets//
function filtrerWorks(categoryId) {
  let work = fetch("http://localhost:5678/api/works").then((work) =>
    work.json()
  );
  work.then((work) => {
    let workFiltre = work.filter((work) => work.categoryId == categoryId);
    document.querySelector(".gallery").innerHTML = "";
    if (categoryId === "reset") {
      afficherWorks(work);
    } else {
      afficherWorks(workFiltre);
    }
  });
}

//fonction d'affichage//
export const modifierAffichage = () => {
  //modif du bouton login//
  const btnLogout = document.querySelector(".logout");
  const log = document.querySelector(".log");
  log.innerText = "logout";
  log.addEventListener("click", () => {
    localStorage.removeItem("token");
  });
  btnLogout.href = "index.html";
  //creation des nouveaux element visuel//
  //header//
  let divHeader = document.createElement("div");
  let header = document.getElementById("header");
  let headerContent = document.querySelector(".header-content");
  header.insertBefore(divHeader, headerContent);
  divHeader.innerHTML = `<i class="fa-regular fa-pen-to-square icon"></i>
                        <p>Mode Edition</p>`;
  divHeader.classList.add("header-edit");
  //btn edit projets//
  let zoneEdit = document.querySelector(".edit");
  let btnEdit = document.createElement("div");
  zoneEdit.appendChild(btnEdit);
  btnEdit.classList.add("btn-edit");
  btnEdit.innerHTML = `<i class="fa-regular fa-pen-to-square icon"></i>
                        <p>Modifier</p>`;
};
