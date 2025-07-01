import { initPortfolio } from "./modules/works.js"

let userToken = window.localStorage.getItem("token");
if (userToken) {
    auth.innerText = "logout";
    auth.addEventListener("click", (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token");
        window.location.href = 'index.html';
    });

    displayEditHeader();
    displayEditSpan();
}

initPortfolio();



function displayEditHeader() {
    const editHeader = document.querySelector(".edit-header")
    editHeader.style.display = "flex";
}

function displayEditSpan() {
    const editspan = document.querySelector(".portfolio-edit-span");
    editspan.style.display = "inline";
}
