import { displayFilters, displayGallery } from "./modules/works.js";
import { isUserLoggedIn, logout } from "./modules/user.js";
import { openEditModal } from "./modules/modal.js";

if (isUserLoggedIn()) {
    displayUserHeader();
    displayUserMenu();

    auth.innerText = "logout";
    auth.addEventListener("click", (event) => {
        event.preventDefault();
        logout();
    });

} else {
    // if user ISN'T logged in
    displayFilters();
}

displayGallery(null);

function displayUserHeader() {
    const userHeader = document.querySelector(".user-header")
    userHeader.style.display = "flex";
    userHeader.addEventListener("click", openEditModal);
}

function displayUserMenu() {
    const userMenu = document.querySelector(".user-menu a");
    userMenu.style.display = "inline-flex";
    userMenu.addEventListener("click", openEditModal);
}
