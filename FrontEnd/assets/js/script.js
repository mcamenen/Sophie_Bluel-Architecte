// BALISES

// Appel de API/WORKS + Remplacement des balises

async function remplacementBalises () {

    const response = await fetch("http://localhost:5678/api/works")
        
    const works = await response.json()
           
    creationBalises (works);
    creationMiniGallery (works)
}     


remplacementBalises ()


// Création des images et du texte à remplacer dans le html

function creationBalises(works) {

    const gallery = document.querySelector(".gallery");
  
    for (let i = 0; i < works.length; i++) {

      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      
      figure.id = works[i].id;
      figure.dataset.category = works[i].category.name; // Ajouter l'attribut data-category

      gallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(figcaption);
  
      image.src = works[i].imageUrl;
      figcaption.innerText = works[i].title;
    }
}


// FILTRES

// Appel de API/CATEGORY + Creation des balises filtres


async function creationFiltres () {

    const response = await fetch("http://localhost:5678/api/categories")
        
    const category = await response.json()
            
    filtresNom (category)
    filtrage(category);
            
}   

creationFiltres ()


// Creation des balises filtres + Ajout de categoryName

function filtresNom (category) {

    for (let i = 0; i <= category.length; i++) {

        const button = document.createElement("button");
        const filter = document.querySelector(".filter");
        filter.classList.add("filter");
        button.classList.add("button");
        filter.appendChild(button);
    
        ( i == 0 ) ? button.innerText = "Tous" : button.innerText = category[i-1].name;
       
    }
}

  
// FILTRAGE

// Ajout de gestionnaires d'événements de clic aux boutons de filtre

function filtrage() {

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        buttons.forEach((button) => {
            button.classList.remove("selected"); // enleve la couleur verte au bouton
        });

            const nomDuFiltre = button.innerText;
    
            // Afficher ou masquer les éléments <figure> en fonction de la catégorie sélectionnée

            const figures = document.querySelectorAll(".gallery figure");

            figures.forEach((figure) => {

                const category = figure.dataset.category;
        
                if (nomDuFiltre === "Tous" || nomDuFiltre === category ) {
                    figure.style.display = "block";
                } else {
                    figure.style.display = "none";
                }
            });

        button.classList.add("selected"); // rajoute la couleur verte au bouton
    });
});
}
  

// CONNEXION affiche la nouvelle page index edition-mode

if (sessionStorage.getItem("token")) {
    
    document.querySelector(".mode-edition").style.display = "flex";
    document.getElementById("loginbtn").style.display = "none";
    document.getElementById("logoutbtn").style.display = "flex";
    document.querySelector(".open-modal").style.display = "flex";
    document.querySelector(".filter").style.display = "none";

}

// DECONNEXION affiche la nouvelle page index.html d'acceuil

logoutbtn.addEventListener('click', function() {

    // Supprimer le token du local storage
    sessionStorage.removeItem("token");

});


// OUVERTURE DE LA MODAL 1

const openModal = document.querySelector(".open-modal")

openModal.addEventListener('click', function() {

    document.getElementById("modal1").style.display = "flex";

});


// FERMETURE DE LA MODAL 1

const cross = document.querySelector(".close .fa-xmark")

cross.addEventListener("click", () => {
    document.getElementById("modal1").style.display = "none";
   
});

const modal1 = document.getElementById("modal1") 

modal1.addEventListener("click", function(event) {
if (event.target === modal1) { modal1.style.display = "none"; };

});

// CREATION MINI GALLERY

function creationMiniGallery(works) {

    const miniGallery = document.querySelector(".mini-gallery");
  
    for (let i = 0; i < works.length; i++) {

      const card = document.createElement("div");
      const image = document.createElement("img");
      const trash = document.createElement("i");
        
      card.classList.add("card");
      trash.classList.add("fa-solid", "fa-trash-can", "fa-xs");
      card.id = works[i].id;
      card.dataset.category = works[i].category.name; // Ajouter l'attribut data-category

      miniGallery.appendChild(card);
      card.appendChild(image);
      card.appendChild(trash);
  
      image.src = works[i].imageUrl;

      // SUPPRESSION IMAGE MODAL 1  

      trash.addEventListener('click', function () {

        let token = sessionStorage.getItem("token")
        const idImage = works[i].id;
    
    
            fetch('http://localhost:5678/api/works' + '/' + idImage, {
    
            method: 'DELETE',
            headers: {
            Authorization : 'Bearer ' + token }
            })
    
            .then(response => {
              if (response.ok) {
                
                const removeCard = document.getElementById(`${idImage}`).closest('.card');
                removeCard.remove();
                const removeFigure = document.getElementById(`${idImage}`).closest("figure");
                removeFigure.remove();
                
              } else {
                console.error('Erreur de suppression du projet');
              }
            })

            .catch(error => {
              console.error('Erreur de connexion');
            });

      });
    }
}

// OUVERTURE DE LA MODAL 2

const openModal2 = document.querySelector(".open-modal2")

openModal2.addEventListener('click', function() {

    document.getElementById("modal1").style.display = "none";
    document.getElementById("modal2").style.display = "flex";

});

// RETOUR A LA MODAL 1

const returnModal2 = document.querySelector(".fa-arrow-left")

returnModal2.addEventListener('click', function() {

    document.getElementById("modal1").style.display = "flex";
    document.getElementById("modal2").style.display = "none";

});

// FERMETURE DE LA MODAL 2

const cross2 = document.querySelector(".close2 .fa-xmark")

cross2.addEventListener("click", () => {
    document.getElementById("modal2").style.display = "none";
   
});

const modal2 = document.getElementById("modal2") 

modal2.addEventListener("click", function(event) {
if (event.target === modal2) { modal2.style.display = "none"; };

});

// AJOUT DES CATEGORIES DANS LA MODAL 2