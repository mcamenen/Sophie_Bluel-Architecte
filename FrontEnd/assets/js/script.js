// BALISES

// Création des galeries et ajout d'un nouveau projet

async function remplacementBalises () {
    
    const response = await fetch("http://localhost:5678/api/works")
        
    const works = await response.json()

    sessionStorage.setItem("worksData", JSON.stringify(works)); // stockage des données dans le sessionStorage

    // mise à jour de l'ID dans le sessionStorage
    let longueur = works.length 
    let nb = works[longueur-1].id
    let idProjetAjoute = nb
    if (nb<=11) {
        idProjetAjoute = nb + 3
        console.log(idProjetAjoute)
    }else{
        idProjetAjoute = nb + 1
        console.log(idProjetAjoute)
    }
       
    creationBalises (works); // Galerie page d'acceuil
    creationMiniGallery (works); // Galerie modale 1 
    addProject (works, idProjetAjoute) ; // Ajour d'un projet modale 2
}     

remplacementBalises ()


// Création des images et du texte à ajouter dans le html

function creationBalises(works) {

    for (let i = 0; i < works.length; i++) {

        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        
        figure.id = works[i].id; // Ajout de l'ID
        figure.dataset.category = works[i].category.name; // Ajout de l'attribut data-category

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    
        image.src = works[i].imageUrl; // Ajout de la source de l'image
        figcaption.innerText = works[i].title; // Ajout de la légende sous l'image
    }
}


// FILTRES

// Appel de API/CATEGORY + Creation des balises filtres

async function creationFiltres () {

    const response = await fetch("http://localhost:5678/api/categories")
        
    const category = await response.json()
            
    filtresNom (category); // Création des filtres et de leurs noms associés
    filtrage(category); // Filtrage des images
    choixCategoryModal (category); // Mise en place des catégories dans la modal2
            
}   

creationFiltres ()


// Creation des balises filtres + Ajout de categoryName

function filtresNom (category) {

    for (let i = 0; i <= category.length; i++) {

        const button = document.createElement("button");
        const filter = document.querySelector(".filter");
        filter.classList.add("filter"); // Ajout de la classe filter
        button.classList.add("button"); // Ajout de la classe button
        filter.appendChild(button);
    
        // Ajout du nom dans les boutons
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
            button.classList.remove("selected"); // Supprime la couleur verte pour tous les boutons
        });
            
            // Afficher ou masquer les éléments <figure> en fonction de la catégorie sélectionnée
            const nomDuFiltre = button.innerText;
            const figures = document.querySelectorAll(".gallery figure");

            figures.forEach((figure) => {

                const category = figure.dataset.category;
        
                if (nomDuFiltre === "Tous" || nomDuFiltre === category ) {
                    figure.style.display = "block";
                } else {
                    figure.style.display = "none";
                }
            });

        button.classList.add("selected"); // Ajoute la couleur verte au bouton
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

      trash.addEventListener('click', async function () {

        let token = sessionStorage.getItem("token")
        const idImage = works[i].id;
    
            await fetch('http://localhost:5678/api/works' + '/' + idImage, {
    
            method: 'DELETE',
            headers: {
            Authorization : 'Bearer ' + token }
            })
    
            .then(response => {

                if (response.ok) {

                    console.log("projet supprimé")
                    
                    const removeCard = document.getElementById(`${idImage}`);
                    removeCard.remove();
                    const removeFigure = document.getElementById(`${idImage}`);
                    removeFigure.remove();

                    console.log(idImage)
                    // Récupere les données du `sessionStorage`
                    const worksData = JSON.parse(sessionStorage.getItem("worksData"));
                    // Trouve l'index de l'élément à supprimer dans le tableau worksData
                    const index = worksData.findIndex(work => work.id === idImage);
                    // Supprime l'élément du tableau worksData
                    worksData.splice(index, 1);
                    // Met à jour le `sessionStorage` avec les données mises à jour
                    sessionStorage.setItem("worksData", JSON.stringify(worksData));
              } 
            })
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
    const ifError = document.querySelector(".if-error");
    ifError.style.display = "none";

});


// FERMETURE DE LA MODAL 2

const cross2 = document.querySelector(".close2 .fa-xmark")

cross2.addEventListener("click", () => {
    document.getElementById("modal2").style.display = "none";
    const ifError = document.querySelector(".if-error");
    ifError.style.display = "none";
   
});

const modal2 = document.getElementById("modal2") 

modal2.addEventListener("click", function(event) {
if (event.target === modal2) { 
    modal2.style.display = "none";
    const ifError = document.querySelector(".if-error");
    ifError.style.display = "none";

};
});


// TELECHARGEMENT DE L'IMAGE DANS LA MODAL 2

const icon = document.querySelector(".fa-image");
const form = document.querySelector(".add-info");
const buttonAddPhoto = document.querySelector(".upload");
const paragraph = document.getElementById("format");
const img = document.getElementById("insight");


form.addEventListener("change", function (event) {
  event.preventDefault();

  const file = document.getElementById("upload").files[0];

  if (file) {
    // Créez un objet FileReader pour lire le contenu du fichier et l'insérer dans une balise img
    const reader = new FileReader();

    // Chargement du fichier
    reader.onload = function (event) {
      img.src = event.target.result;
      img.style.display = "flex";

      icon.style.display = "none";
      buttonAddPhoto.style.display = "none";
      paragraph.style.display = "none";
    };

    // Lecture du fichier 
    reader.readAsDataURL(file);
  }
});


// AJOUT DES CATEGORIES DANS LA MODAL 2

function choixCategoryModal (category) {

    for (let i = 0; i < category.length; i++) {

        const option = document.createElement("option");
        const select = document.getElementById("categorie");
        option.innerText = category[i].name;
        option.setAttribute("value", category[i].id)
        select.appendChild(option);
    }
}


// CREATION ET ENVOI DU NOUVEAU PROJET

function addProject (works, idProjetAjoute) {

    console.log(idProjetAjoute)

const validation = document.querySelector(".valid")
let token = sessionStorage.getItem("token")

validation.addEventListener("click", async function(event) {
    event.preventDefault();

    const works = JSON.parse(sessionStorage.getItem("worksData"));
  
    // récupération des valeurs du formulaire
    const file = document.getElementById("upload").files[0];
    console.log(file)
    const title = document.getElementById("titre").value;
    console.log(title)
    const category = document.getElementById("categorie").value;
    console.log(category)
  
    // Validation des données du formulaire
    if ( !file || !title || !category ) {
        const ifError = document.querySelector(".if-error");
        ifError.style.display = "flex";
        
        return; 
    }

    let formData = new FormData();

        formData.append("image", file);
        formData.append("title", title);
        formData.append("category", category);
        console.log(formData)
        

        await fetch("http://localhost:5678/api/works/", {

            method: 'POST',
            headers: {
                Authorization : 'Bearer ' + token, 
                Accept : "application/json",
            },
            body: formData,
        })

        .then((response) => {
            if (response.status) { // Si le statut de la reponse est OK
                    console.log("Nouveau projet inséré à la gallerie");
                    document.getElementById("modal2").style.display = "none";
                    
                    const ifError = document.querySelector(".if-error");
                    ifError.style.display = "none";
                    
                    document.querySelector(".add-info").reset();
                    
                    const icon = document.querySelector(".fa-image");
                    icon.style.display = "flex";
                    const buttonAddPhoto = document.querySelector(".upload");
                    buttonAddPhoto.style.display = "flex";
                    const paragraph = document.getElementById("format");
                    paragraph.style.display = "flex";
                    const img = document.getElementById("insight");
                    img.src = "";
                    img.style.display = "none"; 

                    // Ajout du nouveau projet dans le sessionStorage
                    const updatedWorks = [...works, { id: idProjetAjoute, imageUrl: '../FrontEnd/assets/images/' + file.name, title: title, category: { name: category } }];
                    idProjetAjoute = idProjetAjoute + 1
                    sessionStorage.setItem("worksData", JSON.stringify(updatedWorks));

                    // mise à jour du portfolio
                    const gallery = document.querySelector(".gallery");
                    gallery.innerHTML = "";
                    creationBalises(updatedWorks);

                    // Mise à jour de la mini-gallery de la modal1
                    const miniGallery = document.querySelector(".mini-gallery");
                    miniGallery.innerHTML = "";
                    creationMiniGallery(updatedWorks);          
            }
        })
    })
}
