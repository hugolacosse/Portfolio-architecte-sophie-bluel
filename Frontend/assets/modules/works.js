
/* ** Manage architect's works ** */

const works = await (await fetch("http://localhost:5678/api/works")).json();
const categories = await (await fetch("http://localhost:5678/api/categories")).json();

// Clear and add works to the gallery
function createGallery(works) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const work = document.createElement("figure");

        const img = document.createElement("img");
        img.setAttribute("src", works[i].imageUrl);
        img.setAttribute("alt", works[i].title);
        work.appendChild(img);

        const title = document.createElement("figcaption");
        title.innerText = works[i].title;
        work.appendChild(title);

        gallery.appendChild(work);
    }
}

// Update filter buttons style
function updateFilters(target) {
    const filters = document.getElementsByClassName("filter-button");

    for (let i = 0; i < filters.length; i++) {
        if (filters[i] !== target && filters[i].classList.contains("filter-button-selected")) {
            //console.log("selected: " + filters[i].innerText + "!" );
            filters[i].classList.remove("filter-button-selected");
        } else {
            if (filters[i] === target) {
                //console.log("target: " + filters[i].innerText + "!" );
                filters[i].classList.add("filter-button-selected");
            }
        }
    }
}

// Add filter buttons
function createFilters(categories, works) {
    const filtersContainer = document.querySelector(".filters-container");

    // firstButton does not filter works
    const firstButton = document.createElement("button");
    firstButton.innerText = "Tous";
    firstButton.classList.add("filter-button");
    firstButton.classList.add("filter-button-selected");
    firstButton.addEventListener("click", function (event) {
        updateFilters(event.target);
        createGallery(works);
    });
    filtersContainer.appendChild(firstButton);

    // other buttons filter works
    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        button.classList.add("filter-button");
        button.addEventListener("click", function (event) {
            const id = i + 1;
            const filteredWorks = works.filter(function (work) {
                return work.categoryId === id;
            });
            updateFilters(event.target);
            createGallery(filteredWorks);
        });
        filtersContainer.appendChild(button);
    }

    
}

// get list of categories from the list of works
function getCategories() {}

async function initPortfolio() {
    if (works && categories) {
        // createGallery(works);
        createFilters(categories, works);
    }
}

export { initPortfolio };