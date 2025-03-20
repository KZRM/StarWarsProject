// ---------------------------------------------------- Film sektion ----------------------------------------------------
// Variabler til film
let allFilms = [];

// Hent film fra API'et (Triggered af navigations button press i HTML)
function fetchFilms() {
    fetch('https://swapi.py4e.com/api/films/')
        .then(response => response.json())
        .then(data => {
            allFilms = data.results;
            displayFilms(); // Vis filmene
        })
        .catch(error => console.error('Fejl ved hentning af film:', error));
}

// Lav DIV container setup fo hver film
function displayFilms() {
    const list = document.getElementById('films-list');
    list.innerHTML = '';
    allFilms.forEach(film => {
        var container = createInfoContainer();

        container.inner.innerHTML = `
            <h3>${film.title}</h3>
            <p>Udgivelsesdato: ${film.release_date}</p>
            <button>Vis åbningscrawl</button>
        `;

        const button = container.inner.querySelector('button');

        button.addEventListener('click', () => showOpeningCrawl(film.opening_crawl, film.title));

        list.appendChild(container.outer);
    });
}

// Vis åbningscrawl i modal
function showOpeningCrawl(filmDescription, filmTitle) {

    document.getElementById('modal-content').innerHTML = `
    <div class="crawl">
    <h1>${filmTitle}</h1>
    <p> ${filmDescription} </p>
    </div>
    `;
    //console.log(text);
    document.getElementById('modal').style.display = 'flex';

}

// Luk modal
function closeModal() {

    document.getElementById('modal').style.display = 'none';

}