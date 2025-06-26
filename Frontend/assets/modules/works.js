
/* ** Manage architect's works ** */

function createGallery(works) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        //console.log(works[i]);
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

function createFilters(categories, works) {
    const filtersContainer = document.querySelector(".filters-container");

    const firstButton = document.createElement("button");
    firstButton.innerText = "Tous";
    firstButton.classList.add("filter-button");
    firstButton.classList.add("filter-button-selected");
    firstButton.addEventListener("click", function (event) {
        updateFilters(event.target);
        createGallery(works);
    });
    filtersContainer.appendChild(firstButton);

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

    createGallery(works);
}

async function createFiltersAndGallery() {
    const works = await (await fetch("http://localhost:5678/api/works")).json();
    const categories = await (await fetch("http://localhost:5678/api/categories")).json();
    
    if (works && categories) {
        createFilters(categories, works);
    }
}

export { createFiltersAndGallery };