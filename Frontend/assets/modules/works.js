
/* ** Manage architect's works ** */

export async function getCategories() {
    const categories = await (await fetch("http://localhost:5678/api/categories")).json();
    return categories;
}

export async function getItems() {
    const items = await (await fetch("http://localhost:5678/api/works")).json();
    return items;
}

export function displayFilters(categories, items) {
    const filtersContainer = document.querySelector(".filters-container");

    // firstButton display every items
    const firstButton = document.createElement("button");
    firstButton.innerText = "Tous";
    firstButton.classList.add("filter-button");
    firstButton.classList.add("filter-button-selected");
    firstButton.addEventListener("click", function (event) {
        updateFilters(event.target);
        displayGallery(items);
    });
    filtersContainer.appendChild(firstButton);

    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        button.classList.add("filter-button");
        button.addEventListener("click", function (event) {
            const id = i + 1;
            const filteredItems = items.filter(function (item) {
                return item.categoryId === id;
            });
            updateFilters(event.target);
            displayGallery(filteredItems);
        });
        filtersContainer.appendChild(button);
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

export function displayGallery(items) {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const item = document.createElement("figure");

        const img = document.createElement("img");
        img.setAttribute("src", items[i].imageUrl);
        img.setAttribute("alt", items[i].title);
        item.appendChild(img);

        const title = document.createElement("figcaption");
        title.innerText = items[i].title;
        item.appendChild(title);

        gallery.appendChild(item);
    }
}