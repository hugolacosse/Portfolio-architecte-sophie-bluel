import { getCategories, displayModalGallery } from "./works.js";

export function openEditModal(event) {
    event.preventDefault();

    modal.style.display = "flex";

    displayModalGallery();
}

const modalGallery = document.querySelector(".modal-gallery");
const modalForm = document.querySelector(".modal-form"); // modalForm is a div
form.reset(); // form is the form

/* Click listeners */

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


/* Form listeners */

form.addEventListener('change', (event) => {
    //console.log(file) //console.log(imgTitle.value) //console.log(imgCategory.value)
    if (file && imgTitle.value !== "" && imgCategory.value !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

// Set select's options
let categories = await getCategories();
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText= categories[i].name;
    imgCategory.appendChild(option);
}

let file = null;
fileElem.addEventListener("change", updateImageDisplay);

// Grand nettoyage
function updateImageDisplay(event) {
    //console.log(event.target.files[0].size)
    if (event.target.files[0].size > 1e6 * 4) {
        // error
        console.log("Plus grand que 4 Mo");
    } else {
        if (file === null) {
            file = event.target.files[0];
            const image = document.createElement("img");
            image.src = URL.createObjectURL(event.target.files[0]);
            image.alt = image.title = event.target.name;
            const fileWrapper = document.querySelector(".file-wrapper");

            const icon = document.querySelector(".file-wrapper .fa-regular");
            const label = document.querySelector(".file-wrapper label");
            const text = document.querySelector(".file-wrapper p");
            icon.remove();
            label.remove();
            text.remove();

            fileWrapper.prepend(image);
        }
    }
}

const submitButton = document.querySelector('.submit-photo');
submitButton.addEventListener('click', submitPhoto);

async function submitPhoto(event) {
    event.preventDefault();
    let userToken = window.localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", imgTitle.value);
    formData.append("category", imgCategory.value);

    console.log(formData);

    /*
    const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`
        },
        body: formData
    });
    */

    form.reset();
    submitButton.disabled = true;
    // addItem()
}