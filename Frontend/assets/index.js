import { initPortfolio } from "./modules/works.js"

let token = window.localStorage.getItem("token");
if (token) {
    auth.innerText = "logout";
}

initPortfolio();


