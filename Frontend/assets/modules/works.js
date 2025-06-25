
/* ** Manage architect's works ** */

// Fetch data from the API
async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    return (works);
}

// Add data to the DOM
async function loadWorks() {
    const data = await fetchWorks();

    const gallery = document.querySelector(".gallery");
    if (gallery) {
        for (let i = 0; i < data.length; i++) {
            //console.log(data[i]);
            const work = document.createElement("figure");
            const img = document.createElement("img");
            img.setAttribute("src", data[i].imageUrl);
            img.setAttribute("alt", data[i].title);
            work.appendChild(img);
            const title = document.createElement("figcaption");
            title.innerText = data[i].title;
            work.appendChild(title);
            gallery.appendChild(work);
        }
    }
}

export { loadWorks };