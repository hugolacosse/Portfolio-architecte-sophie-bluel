

//      affiche la liste des travaux et un formulaire d'ajout des travaux

const modal = document.getElementById("modal");
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        if (modalForm.style.display === "flex") {
            modalForm.style.display = "none";
            modalGalery.style.display = "flex";
        }
    }
});

const modalGalery = document.querySelector(".modal-galery");
const modalForm = document.querySelector(".modal-form");

const closeModalGaleryBtn = document.querySelector(".close-modal-galery");
closeModalGaleryBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
});

const closeModalFormBtn = document.querySelector(".close-modal-form");
closeModalFormBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
    modalForm.style.display = "none";
    modalGalery.style.display = "flex";
});

const previousModalFormBtn = document.querySelector(".previous-modal-btn");
previousModalFormBtn.addEventListener("click", () => {
    const modalGalery = document.querySelector(".modal-galery");
    const modalForm = document.querySelector(".modal-form");
    modalForm.style.display = "none";
    modalGalery.style.display = "flex";
});

const modalAddPhotoBtn = document.querySelector(".add-photo");
modalAddPhotoBtn.addEventListener("click", addPhoto);

function submitPhoto() {
    // ....
}

function addPhoto() {
    modalGalery.style.display = "none";
    modalForm.style.display = "flex";
}

async function deleteItem() {
    let userToken = window.localStorage.getItem("token");
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1MTQ0
    //Mzc4NCwiZXhwIjoxNzUxNTMwMTg0fQ.K7yvUvLMEYoUrs-kTY-WG45jRtar4mQML6gVqEAiLfw

    const response = await fetch(`http://localhost:5678/api/works/${4}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
    });
    console.log(response)
    // if 200 remove item from DOM
    // else alert
}

function displayModalGallery(items) {
    const modalGallery = document.querySelector(".modal-galery-container");

    modalGallery.innerHTML = "";
    for (let i = 0; i < items.length; i++) {

        const item = document.createElement("div");

        item.style.backgroundImage = `url(${items[i].imageUrl})`
        item.classList.add("modal-galery-item");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-item-btn");
        const deleteSpan = document.createElement("span");
        deleteSpan.classList.add('fa-solid', 'fa-trash');

        deleteBtn.addEventListener("click", (e) => {
            console.log("todo delete API");
            //deleteItem();
        });
        deleteBtn.appendChild(deleteSpan);
        item.appendChild(deleteBtn);
        modalGallery.appendChild(item);
    }
}

async function openEditModal(event) {
    event.preventDefault();

    modal.style.display = "flex";

    const works = await (await fetch("http://localhost:5678/api/works")).json();
    displayModalGallery(works);
}

export { openEditModal };