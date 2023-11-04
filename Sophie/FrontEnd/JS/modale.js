let userConnected = false;
let tokenFromStorage = localStorage.getItem("token");
const isUserConnected = () => {
  if (tokenFromStorage) {
    userConnected = true;
  }
};
isUserConnected();
if (userConnected == true) {
  let btnModif = document.querySelector(".btn-edit");
  btnModif.addEventListener("click", () => {
    creerModale();
  });

  const creerModale = () => {
    const modaleBackground = document.createElement("aside");
    modaleBackground.id = "modale-back";
    modaleBackground.addEventListener("click", () => {
      closeModale();
    });
    const modale = document.createElement("div");
    modale.id = "modale";
    modale.classList.add("modale");
    modale.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    document.body.appendChild(modaleBackground);
    modaleBackground.classList.add("modale-background");
    modaleBackground.appendChild(modale);
    creerElementsModale1(modale);
  };
  const creerElementsModale1 = (modale) => {
    //titre//
    const modaleTitle = document.createElement("h3");
    modaleTitle.classList.add("modale-title");
    modaleTitle.innerHTML = "Galerie photo";
    modale.appendChild(modaleTitle);
    //buton//
    const btnCloseModale = document.createElement("i");
    btnCloseModale.classList.add("fa-solid", "fa-xmark", "btn-close-modale");
    btnCloseModale.addEventListener("click", closeModale);
    modale.appendChild(btnCloseModale);

    //gallery//
    const modaleGallery = document.createElement("div");
    modaleGallery.classList.add("modale-gallery");
    modale.appendChild(modaleGallery);
    afficherGalleryModale(modaleGallery);
    //visuel//
    const visualLine = document.createElement("div");
    visualLine.classList.add("visual-line");
    modale.appendChild(visualLine);
    //btn ajoutprojet
    const btnAjoutProjet = document.createElement("button");
    btnAjoutProjet.classList.add("selected");
    btnAjoutProjet.innerText = "Ajouter une photo";
    modale.appendChild(btnAjoutProjet);
    btnAjoutProjet.addEventListener("click", modaleAjoutProjet2);
  };
  const afficherGalleryModale = (modaleGallery) => {
    let works = fetch("http://localhost:5678/api/works")
      .then((works) => works.json())
      .then((works) => {
        for (let i = 0; i < works.length; i++) {
          const img = document.createElement("img");
          const divBtndelete = document.createElement("div");
          divBtndelete.classList.add("div-btn-delete");
          const btnDeleteWorks = document.createElement("i");
          btnDeleteWorks.classList.add(
            "fa-solid",
            "fa-trash-can",
            "btn-delete-works"
          );
          img.classList.add("img-gallery-modale");
          modaleGallery.appendChild(img);
          modaleGallery.appendChild(divBtndelete);
          divBtndelete.appendChild(btnDeleteWorks);
          img.src = works[i].imageUrl;
          img.setAttribute("id", works[i].id);
          btnDeleteWorks.setAttribute("id", works[i].id);
          btnDeleteWorks.addEventListener("click", (event) => {
            deleteWorks(event);
          });
        }
      });
  };

  const deleteWorks = (event) => {
    event.stopPropagation();
    let id = event.target.id;
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenFromStorage, //pour les autorisation de l'api
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((response) => {
      if (response.ok) {
        event.preventDefault();
        alert("projet supprimé");
      }
    });
  };
  const modaleAjoutProjet2 = () => {
    let modale = document.getElementById("modale");
    modale.innerHTML = "";
    const divMiseEnPage2 = document.createElement("div");
    divMiseEnPage2.classList.add("mise-en-page-modale2");
    modale.appendChild(divMiseEnPage2);
    //buttons//
    const backArrow = document.createElement("i");
    backArrow.classList.add("fa-solid", "fa-arrow-left", "btn-back-modale");
    divMiseEnPage2.appendChild(backArrow);
    backModale(backArrow, modale);

    //2ieme boutton//
    const btnCloseModale = document.createElement("i");
    btnCloseModale.id = "btn-close";
    btnCloseModale.classList.add("fa-solid", "fa-xmark");
    btnCloseModale.addEventListener("click", closeModale);
    divMiseEnPage2.appendChild(btnCloseModale);

    //titre//
    const modaleTitle2 = document.createElement("h3");
    modaleTitle2.innerText = "Ajout Photo";
    modaleTitle2.classList.add("modale-title");
    modale.appendChild(modaleTitle2);
    //form//
    const formModale = document.createElement("form");
    formModale.classList.add("form-modale");
    formModale.method = "POST";
    modale.appendChild(formModale);

    //input file//
    const divInputFile = document.createElement("div");
    divInputFile.classList.add("div-input-file-style");
    formModale.appendChild(divInputFile);
    const iconImg = document.createElement("i");
    iconImg.classList.add("fa-regular", "fa-image", "icon-image");
    divInputFile.appendChild(iconImg);
    const previewImg = document.createElement("img");
    previewImg.id = "image-preview";
    previewImg.src = "#";
    previewImg.classList.add("img-preview");
    divInputFile.appendChild(previewImg);
    const fakeBtnInput = document.createElement("button");
    fakeBtnInput.id = "fake-btn-input";
    fakeBtnInput.setAttribute("disabled", "");
    fakeBtnInput.innerText = "+ Ajouter photo";
    divInputFile.appendChild(fakeBtnInput);
    const inputFile = document.createElement("input");
    inputFile.id = "input-file";
    inputFile.type = "file";
    inputFile.name = "image";
    inputFile.setAttribute("accept", "image/png, image/jpeg");
    inputFile.setAttribute("required", "");
    const conditionFile = document.createElement("p");
    conditionFile.innerText = "jpg, png : 4Mo max";
    conditionFile.className = "condition-file";
    divInputFile.appendChild(conditionFile);
    //affichage du preview de l'image//
    inputFile.addEventListener("change", (evt) => {
      const [file] = inputFile.files;
      const size = inputFile.files[0].size;
      if (size > 4000000) {
        alert("image trop volumineuse");
      } else {
        if (file) {
          previewImg.src = URL.createObjectURL(file);
        }

        previewImg.style.opacity = "1";
        previewImg.style.zIndex = "999";
        iconImg.style.opacity = "0";
        fakeBtnInput.style.opacity = "0";
      }
    });
    divInputFile.appendChild(inputFile);

    //input text//
    const divInputText = document.createElement("div");
    divInputText.classList.add("div-input-style");
    formModale.appendChild(divInputText);
    const labelText = document.createElement("label");
    labelText.for = "title";
    labelText.innerText = "Titre";
    divInputText.appendChild(labelText);
    const inputText = document.createElement("input");
    inputText.className = "modale-form-input";
    inputText.setAttribute("type", "text");
    inputText.id = "title";
    inputText.name = "title";
    inputText.setAttribute("required", "");
    divInputText.appendChild(inputText);

    ///input select//
    const divInputSelect = document.createElement("div");
    divInputSelect.classList.add("div-input-style");
    formModale.appendChild(divInputSelect);
    const labelSelect = document.createElement("label");
    labelSelect.setAttribute("for", "select");
    labelSelect.innerText = "Catégorie";
    divInputSelect.appendChild(labelSelect);
    const inputSelect = document.createElement("select");
    inputSelect.className = "modale-form-input";
    inputSelect.id = "select";
    inputSelect.name = "category";
    inputSelect.setAttribute("required", "");
    divInputSelect.appendChild(inputSelect);
    //options input select//
    fetch("http://localhost:5678/api/categories")
      .then((categories) => categories.json())
      .then((categories) => {
        let blankoption = document.createElement("option");
        blankoption.id = "0";
        blankoption.value = "";
        blankoption.innerHTML = "";
        inputSelect.appendChild(blankoption);
        for (let i = 0; i < categories.length; i++) {
          let option = document.createElement("option");
          option.id = categories[i].id;
          option.value = categories[i].id;
          option.innerHTML = categories[i].name;
          inputSelect.appendChild(option);
        }
      });

    //btn validation//
    const btnValidation = document.createElement("button");
    btnValidation.id = "btn-valid-form-modale";
    btnValidation.type = "submit";
    btnValidation.setAttribute("disabled", "");
    btnValidation.innerText = "validation";
    formModale.appendChild(btnValidation);
    //ligne visuelle//
    const visualLine = document.createElement("div");
    visualLine.classList.add("visual-line");
    formModale.insertBefore(visualLine, btnValidation);
    //activation du bouton lorsque les champs sont rempli//
    formModale.addEventListener("change", () => {
      if (
        inputFile.value !== "" &&
        inputText.value !== "" &&
        inputSelect.value !== ""
      ) {
        btnValidation.removeAttribute("disabled", "");
        btnValidation.removeAttribute("id", "btn-valid-form-modale");
        btnValidation.className = "selected";
      }
    });
    //validation du formulaire//
    btnValidation.addEventListener("click", (event) => {
      let validationForm = new FormData(formModale);
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenFromStorage, //pour les autorisation de l'api
        },
        body: validationForm,
      }).then(() => {
        event.preventDefault();
      });
      alert("projet ajouté");
    });
  };
  const closeModale = () => {
    const modaleBackground = document.getElementById("modale-back");
    document.body.removeChild(modaleBackground);
  };

  const backModale = (backArrow, modale) => {
    backArrow.addEventListener("click", () => {
      modale.innerHTML = "";
      creerElementsModale1(modale);
    });
  };
}

//getelementbyclassname a ultiliser pour faire un tableau//
