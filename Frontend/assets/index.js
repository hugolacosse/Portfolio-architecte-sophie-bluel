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


function displayEditModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
function displayEditHeader() {
    const editHeader = document.querySelector(".edit-header")
    editHeader.style.display = "flex";
    editHeader.addEventListener("click", displayEditModal);
}

function displayEditSpan() {
    const editAnchor = document.querySelector(".portfolio-edit a");
    editAnchor.style.display = "inline";
    editAnchor.addEventListener("click", displayEditModal);
}

/*
https://www.youtube.com/watch?v=EIC1_0Dfa9o&t=3s
https://www.w3schools.com/howto/howto_css_modals.asp

<aside id="modal" class="modal" aria-hidden="true" role="dialog">
    <div class="modal-wrapper"></div>
</aside>


// addEventListenener -> click ->
    - style         :display       : flex
    - setAttribute  :aria-hidden   : true

// global variable -> let modal = Element

// se refermer au clic sur la croix ou en dehors de la modal

*/