let form = document.getElementById("form");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");

const tokenFromStorage = localStorage.getItem("token");
const checkToken = () => {
  if (tokenFromStorage) {
    window.location.href = "./index.html";
  }
};
checkToken();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const login = {
    email: inputEmail.value,
    password: inputPassword.value,
  };
  let getUser = connexion(login).then((response) => {
    if (!response.ok) {
      return alert("Email ou mot de passe incorect");
    } else {
      return response.json();
    }
  });
  getUser.then((user) => {
    if (user?.token) {
      localStorage.setItem("token", user.token);
      window.location.href = "./index.html";
    }
  });
});
//ajouter le toke au local storage//
async function connexion(login) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        /*   Authorization: "Bearer "+ tokenFromStorage ,  //pour les autorisation de l'api*/
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(login),
    });

    return response;
  } catch (error) {}
}

inputEmail.addEventListener("change", (event) => {
  const valeurEmail = event.target.value;
  let regexp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+");
  let resultat = regexp.test(valeurEmail);
  let zoneErreur = document.querySelector(".zone-erreur");
  let erreur = document.createElement("p");
  zoneErreur.appendChild(erreur);
  if (resultat == false) {
    erreur.innerText = "E-mail invalide";
    erreur.classList.add("error");
    inputEmail.classList.add("input-error");
  } else {
    zoneErreur.innerHTML = "";
    inputEmail.classList.remove("input-error");
  }
});
