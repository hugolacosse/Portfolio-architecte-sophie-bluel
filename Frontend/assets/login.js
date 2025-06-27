
// Gestion de l'authentification

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
    //console.log("click");
    submitButton.disabled = true;

    //`{"email": "sophie.bluel@test.tld", "password": "S0phie"}`,
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: loginForm.email.value,
            password: loginForm.password.value
        })
    });

    //console.log(response);
    if (response.status !== 200) {
        displayError("Erreur dans l'identifiant ou le mot de passe");
        submitButton.disabled = false;
        return ;
    }
    displayError("");
    const data = await response.json();
    
    //console.log(data.token);
    window.localStorage.setItem("token", data.token);
    // window.location.href = 'index.html';
}
