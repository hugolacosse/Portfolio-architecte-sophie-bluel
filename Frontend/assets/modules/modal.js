import { getCategories, displayModalGallery } from "./works.js";

const modalGallery = document.querySelector(".modal-gallery");
const modalForm = document.querySelector(".modal-form");

/*
*** Add click listeners
*/
// close modal and reset modal display
const modal = document.getElementById("modal");
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        if (modalForm.style.display === "flex") {
            modalForm.style.display = "none";
            modalGallery.style.display = "flex";
        }
    }
});

// close modal
const closeModalGalleryBtn = document.querySelector(".close-modal-gallery");
closeModalGalleryBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
});

// close modal and reset modal display
const closeModalFormBtn = document.querySelector(".close-modal-form");
closeModalFormBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
    modalForm.style.display = "none";
    modalGallery.style.display = "flex";
});

// reset modal display
const previousModalFormBtn = document.querySelector(".previous-modal-btn");
previousModalFormBtn.addEventListener("click", () => {
    const modalGallery = document.querySelector(".modal-gallery");
    const modalForm = document.querySelector(".modal-form");
    modalForm.style.display = "none";
    modalGallery.style.display = "flex";
});

// display modal form
const modalAddPhotoBtn = document.querySelector(".add-photo");
modalAddPhotoBtn.addEventListener("click", () => {
    modalGallery.style.display = "none";
    modalForm.style.display = "flex";
});


// Set modal form select options
let categories = await getCategories();
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText= categories[i].name;
    imgCategory.appendChild(option);
}


function submitPhoto() {
    // ....
}

async function openEditModal(event) {
    event.preventDefault();

    modal.style.display = "flex";

    displayModalGallery();
}

export { openEditModal };