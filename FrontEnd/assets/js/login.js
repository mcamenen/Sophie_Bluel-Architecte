// AUTHENTIFICATION
  
// Appel du formulaire et du message si erreur

let loginForm = document.getElementById("loginForm");
const ifError = document.querySelector(".if-error");

// Fonction qui permet le retour vers la page d'acceuil si l'authentification est bonne

function retourAccueil() { 
    document.location.href="index.html";
}

// Controle si l'authentification est bonne ou non au moment du submit

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let authentification = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    }
  
    if (authentification) {
        
        const response = await login(authentification)

        if (response.token){
        sessionStorage.setItem("token", response.token)
        retourAccueil()
        } else{
            ifError.classList.add("error")
        }
    }

});

// Envoie des infos vers l'API et retour de la reponse

const login = async (authentification) => {

    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( authentification )
    })

  return response.json()
}
   









	
 