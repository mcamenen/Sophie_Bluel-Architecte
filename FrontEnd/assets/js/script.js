// BALISES

// Appel de API/WORKS + Remplacement des balises

async function remplacementBalises () {

    const response = await fetch("http://localhost:5678/api/works")
        
    const works = await response.json()
            
    creationBalises (works)
}     


remplacementBalises ()


// Création des images et du texte à remplacer dans le html

function creationBalises(works) {

    const gallery = document.querySelector(".gallery");
  
    for (let i = 0; i < works.length; i++) {

      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const figcaption = document.createElement("figcaption");
  
      figure.id = works[i].category.name;
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
  

  