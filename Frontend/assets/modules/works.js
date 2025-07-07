
/* ** Manage architect's works ** */

let categories = await (await fetch("http://localhost:5678/api/categories")).json();
let items = await (await fetch("http://localhost:5678/api/works")).json();

export async function getCategories() {
    return categories;
}

export function addItem(item) {
}


export function displayFilters() {
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

// Display main gallery
export function displayGallery() {
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

/* Display modal gallery */
export function displayModalGallery() {
    const modalGallery = document.querySelector(".modal-gallery-container");

    modalGallery.innerHTML = "";
    for (let i = 0; i < items.length; i++) {

        const item = document.createElement("div");

        item.style.backgroundImage = `url(${items[i].imageUrl})`
        item.classList.add("modal-gallery-item");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-item-btn");
        const deleteSpan = document.createElement("span");
        deleteSpan.classList.add('fa-solid', 'fa-trash');

        deleteBtn.dataset.id = items[i].id;
        deleteSpan.dataset.id = items[i].id;
        deleteBtn.addEventListener("click", deleteItem);
        
        deleteBtn.appendChild(deleteSpan);
        item.appendChild(deleteBtn);
        modalGallery.appendChild(item);
    }
}

// Delete API item 
async function deleteItem(event) {

    let userToken = window.localStorage.getItem("token");
    const id = parseInt(event.target.dataset.id);

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
    });
    if (response.ok) {
        removeItems(id);
    }
}

// Remove in-memory item and update content
function removeItems(id) {
    items = items.filter(function (item) {
        return item.id !== id;
    });
    displayGallery();
    displayModalGallery();
}

