
export function isUserLoggedIn() {
    if (window.localStorage.getItem("token")) {
        return true;
    }
    return false;
}

// Display error if login failed
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

export async function login(event) {
    event.preventDefault();
    submitButton.disabled = true;

    // Send authentication request
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": email.value,
            "password": password.value
        })
    });

    // Check response
    if (response.status !== 200) {
        displayLoginError("Erreur dans l'identifiant ou le mot de passe");
        submitButton.disabled = false;
        return ;
    }
    const data = await response.json();

    // Store user token and redirect
    window.localStorage.setItem("token", data.token);
    window.location.href = 'index.html';
}

export function logout() {
    window.localStorage.removeItem("token");
    window.location.href = 'index.html';
}