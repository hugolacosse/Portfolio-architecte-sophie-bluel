import { isUserLoggedIn, login} from "./modules/user.js"

// Redirect user if he is already logged in
if (isUserLoggedIn()) {
    window.location.href = 'index.html';
}

// Listen form submit
loginForm.addEventListener("submit", login);