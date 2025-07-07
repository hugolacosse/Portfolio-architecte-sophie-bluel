import { displayFilters, displayGallery } from "./modules/works.js";
import { openEditModal } from "./modules/modal.js";


let userToken = window.localStorage.getItem("token");
if (userToken) {
    // logout() from "user.js?"
    auth.innerText = "logout";
    auth.addEventListener("click", (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token");
        window.location.href = 'index.html';
    });

    displayEditHeader();
    displayEditAnchor();
} else {
    displayFilters();
}

displayGallery();

function displayEditHeader() {
    const editHeader = document.querySelector(".edit-header")
    editHeader.style.display = "flex";
    editHeader.addEventListener("click", openEditModal);
}

function displayEditAnchor() {
    const editAnchor = document.querySelector(".portfolio-edit a");
    editAnchor.style.display = "inline-flex";
    editAnchor.addEventListener("click", openEditModal);
}