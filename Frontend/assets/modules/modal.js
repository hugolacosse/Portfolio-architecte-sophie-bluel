import { getCategories, displayModalGallery, addItem } from "./works.js";

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

const imgWrapper = document.querySelector(".img-wrapper");
const imgContainer = document.querySelector(".img-wrapper .img-container");
const deleteImg = document.querySelector(".img-wrapper .delete-img-btn");
const inputWrapper = document.querySelector(".input-wrapper");

// Set select's options
let categories = await getCategories();
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerText= categories[i].name;
    imgCategory.appendChild(option);
}

// Enable / disable submit button
form.addEventListener('change', (event) => {
    //console.log(file) //console.log(imgTitle.value) //console.log(imgCategory.value)
    if (file && imgTitle.value !== "" && imgCategory.value !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

let file = null;
fileElem.addEventListener("change", updateImageDisplay);

function removeImg(event) {
    if (event !== null) {
        event.preventDefault();
    }
    file = null;
    imgWrapper.style.display = "none";
    inputWrapper.style.display = "flex";
}

function updateImageDisplay(event) {
    //console.log(event.target.files[0].size)
    if (event.target.files[0].size > 1e6 * 4) {
        // error
        console.log("Plus grand que 4 Mo");
    } else {
        if (file === null) {
            file = event.target.files[0];
            //style.backgroundImage = `url(${items[i].imageUrl})`
            imgContainer.style.backgroundImage = `url(${URL.createObjectURL(file)})`;

            deleteImg.addEventListener("click", removeImg);

            inputWrapper.style.display = "none";
            imgWrapper.style.display = "flex";
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
    formData.append("category", "1");

    console.log(formData);

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
        removeImg(null);
        submitButton.disabled = true;
        addItem(data);
    } else {
        // error
    }

}


/*
function displayLoginError(message) {
    let spanErrorMessage = document.getElementById("errorMessage");

    if (message === "" && spanErrorMessage) {
        spanErrorMessage.remove()
        return ;
    }

    if (message !== "" && !spanErrorMessage) {
        let container = document.querySelector(".errorContainer");
        
        spanErrorMessage = document.createElement("span");
        spanErrorMessage.id = "errorMessage";
        spanErrorMessage.innerText = message;
        container.append(spanErrorMessage);
    }
}
    */
