import { getCategories, getItems, displayFilters, displayGallery } from "./modules/works.js";
import { openEditModal } from "./modules/modal.js";

let categories = await getCategories();
let items = await getItems()

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
    displayFilters(categories, items);
}

displayGallery(items);

function displayEditHeader() {
    const editHeader = document.querySelector(".edit-header")
    editHeader.style.display = "flex";
    editHeader.addEventListener("click", openEditModal);
}

function displayEditAnchor() {
    const editAnchor = document.querySelector(".portfolio-edit a");
    editAnchor.style.display = "inline";
    editAnchor.addEventListener("click", openEditModal);
}

/*
https://www.youtube.com/watch?v=EIC1_0Dfa9o&t=3s
https://www.w3schools.com/howto/howto_css_modals.asp


// addEventListenener -> click ->
    - style         :display       : flex
    - setAttribute  :aria-hidden   : true

// global variable -> let modal = Element

*/