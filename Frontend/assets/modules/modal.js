import { getCategories, displayModalGallery, addItem } from "./works.js";

export function openUserModal(event) {
    event.preventDefault();

    modal.style.display = "flex";
    displayModalGallery();
}

/**** Managing modal display ****/
const modal = document.getElementById("modal");
const modalGallery = document.querySelector(".modal-gallery");
const modalForm = document.querySelector(".modal-form");
const form = document.querySelector(".modal-form form");

function closeModal() {
    modal.style.display = "none";
    modalForm.style.display = "none";
    modalGallery.style.display = "flex";
}

function showModalGallery() {
    modalForm.style.display = "none";
    modalGallery.style.display = "flex";
}

function showModalform() {
    form.reset();
    displayError("");
    clearImgWrapper();
    modalGallery.style.display = "none";
    modalForm.style.display = "flex";
}

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

const closeModalGalleryBtn = document.querySelector(".close-modal-gallery");
closeModalGalleryBtn.addEventListener("click", closeModal);

const closeModalFormBtn = document.querySelector(".close-modal-form");
closeModalFormBtn.addEventListener("click", closeModal);

const previousModalFormBtn = document.querySelector(".previous-modal-btn");
previousModalFormBtn.addEventListener("click", showModalGallery);

const modalAddPhotoBtn = document.querySelector(".add-photo");
modalAddPhotoBtn.addEventListener("click", showModalform);

const submitButton = document.querySelector('.submit-photo');
submitButton.addEventListener('click', submitPhoto);

form.addEventListener('change', (event) => {
    if (file && imgTitle.value !== "" && imgCategory.value !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

/**** Add form select options ****/
let categories = await getCategories();
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement('option');
    option.value = i + 1;
    option.innerText= categories[i].name;
    imgCategory.appendChild(option);
}

/**** Handle file input ****/
let file = null;
fileElem.addEventListener("change", updateImageDisplay);

const imgWrapper = document.querySelector(".img-wrapper");
const imgContainer = document.querySelector(".img-wrapper .img-container");
const inputWrapper = document.querySelector(".input-wrapper");

function clearImgWrapper() {
    file = null;
    imgWrapper.style.display = "none";
    inputWrapper.style.display = "flex";
    submitButton.disabled = true;
}

function updateImageDisplay(event) {
    if (event.target.files[0].size > 1e6 * 4) {
        displayError("Erreur, l'image est trop volumineuse");
    } else {
        displayError("");
        if (file === null) {
            file = event.target.files[0];

            imgContainer.style.backgroundImage = `url(${URL.createObjectURL(file)})`;

            inputWrapper.style.display = "none";
            imgWrapper.style.display = "flex";
        }
    }
}

/**** Handle submit form ****/
async function submitPhoto(event) {
    event.preventDefault();
    let userToken = window.localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", imgTitle.value);
    formData.append("category", imgCategory.value);

    const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`
        },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        form.reset();
        addItem(data);
        modal.style.display = "none";
        modalForm.style.display = "none";
        clearImgWrapper();
        modalGallery.style.display = "flex";
    } else {
        if (response.message) {
            displayError(response.message);
        } else {
            displayError("Une erreur s'est produite lors de l'envoi du formulaire");
        }
    }
}

function displayError(message) {
    let spanErrorMessage = document.getElementById("error-message");

    if (message === "" && spanErrorMessage) {
        spanErrorMessage.remove()
        return ;
    }

    if (message !== "" && !spanErrorMessage) {
        let container = document.querySelector(".error-container");
        
        spanErrorMessage = document.createElement("span");
        spanErrorMessage.id = "error-message";
        spanErrorMessage.innerText = message;
        container.append(spanErrorMessage);
    }
}
