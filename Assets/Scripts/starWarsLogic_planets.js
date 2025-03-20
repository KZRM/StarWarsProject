// ---------------------------------------------------- Planeter sektion ----------------------------------------------------

// Variabler til planeter
let allPlanets = [];
let planetsLoaded = false;
let currentPlanetsPage = 1;
let planetsPerPage = 12; // Antal planeter per side
let selectedClimate = '';

// Hent alle planeter fra API'et
function fetchAllPlanets(url = 'https://swapi.py4e.com/api/planets/') {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allPlanets = allPlanets.concat(data.results); // Tilføj resultater til listen
            if (data.next) {
                fetchAllPlanets(data.next); // Hent næste side hvis der er en
            } else {
                displayPlanets(); // Vis planeter når alle er hentet
            }
        })
        .catch(error => console.error('Fejl ved hentning af planeter:', error));
}

// Vis planeter på siden
function displayPlanets() {
    const list = document.getElementById('planets-list');
    list.innerHTML = '';
    let filteredPlanets = allPlanets;
    if (selectedClimate) {
        // Filtrer planeter efter valgt klima
        filteredPlanets = allPlanets.filter(planet => planet.climate.includes(selectedClimate));
    }
    // Udræk den aktuelle side af planeter med SLICE metode
    const start = (currentPlanetsPage - 1) * planetsPerPage;
    const end = start + planetsPerPage;
    const paginatedPlanets = filteredPlanets.slice(start, end);

    paginatedPlanets.forEach(planet => {

        var container = createInfoContainer(); // Genbruger funktionen fra Characters.js

        container.inner.innerHTML = `
            <h3>${planet.name}</h3>
            <p>Befolkning: ${planet.population}</p>
            <p>Klima: ${planet.climate}</p>
            <p>Terræn: ${planet.terrain}</p>
        `;
        list.appendChild(container.outer);
    });

    // Opdater pagination-knapper
    document.getElementById('planets-prev-page').disabled = currentPlanetsPage === 1;
    document.getElementById('planets-next-page').disabled = end >= filteredPlanets.length;
}

// Filtrer planeter efter klima
function filterPlanets() {
    selectedClimate = document.getElementById('climate-filter').value;
    currentPlanetsPage = 1; // Nulstil til side 1 ved nyt filter
    displayPlanets();
}

// Gå til næste side af planeter
function planetsNextPage() {
    currentPlanetsPage++;
    displayPlanets();
}

// Gå til forrige side af planeter
function planetsPrevPage() {
    if (currentPlanetsPage > 1) {
        currentPlanetsPage--;
        displayPlanets();
    }
}

