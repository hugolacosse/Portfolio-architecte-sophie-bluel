
// Gestion de l'authentification

async function login(event) {
    event.preventDefault();
    //console.log(form["email"].value);
    //console.log(form["password"].value);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `{"email": "sophie.bluel@test.tld", "password": "S0phie"}`,
    });
    const data = await response.json();
    console.log(data);
    
    //window.location.href = 'index.html';
}

const form = document.getElementById("loginForm");
if (form) {
    form.addEventListener("submit", login);
}

