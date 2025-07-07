
// Gestion de l'authentification

// Redirect user to index.html if he is already logged in.
if (window.localStorage.getItem("token")) {
    //console.log("login.html: User already logged in, redirecting to index.html.");
    window.location.href = 'index.html';
}

// Listen for submit
loginForm.addEventListener("submit", login);

function displayError(message) {
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

async function login(event) {
    event.preventDefault();
    submitButton.disabled = true;

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: loginForm.email.value,
            password: loginForm.password.value
        })
    });
    if (response.status !== 200) {
        displayError("Erreur dans l'identifiant ou le mot de passe");
        submitButton.disabled = false;
        return ;
    }

    const data = await response.json();
    window.localStorage.setItem("token", data.token);
    window.location.href = 'index.html';
}
