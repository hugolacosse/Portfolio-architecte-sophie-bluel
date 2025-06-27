import { initPortfolio } from "./modules/works.js"

let token = window.localStorage.getItem("token");
if (token) {
    auth.innerText = "logout";
    auth.addEventListener("click", (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token");
        window.location.href = 'index.html';
    });
}

initPortfolio();


