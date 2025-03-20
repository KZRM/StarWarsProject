// ---------------------------------------------------- Karakterer sektion ----------------------------------------------------
// Variabler til at holde styr på side og søgning
let characterCurrentPage = 1;
let characterCurrentSearch = '';

// Hent karakterer fra APIet
function fetchCharacters() {
    let url = `https://swapi.py4e.com/api/people/?page=${characterCurrentPage}`;
    if (characterCurrentSearch) {
        url += `&search=${characterCurrentSearch}`; // Tilføj søgeparameter hvis der er en søgning
    }
    fetch(url)
        .then(response => response.json()) //Lav til JSON string...
        .then(data => {
            displayCharacters(data.results); // Vis karaktererne
            // Opdater pagination-knapper (Så de er disabled hvis vi er på første eller sidste side)
            document.getElementById('prev-page').disabled = characterCurrentPage === 1;
            document.getElementById('next-page').disabled = !data.next;
        })
        .catch(error => console.error('Fejl ved hentning af karakterer:', error));
}

// Vis karakterer på siden
function displayCharacters(characters) {
    const list = document.getElementById('characters-list');
    list.innerHTML = ''; // Ryd listen

    characters.forEach(character => {

        var container = createInfoContainer();

        let genderCol;  // Farve på genders
        if (character.gender == 'male') {
            genderCol = 'cyan';
        } else if (character.gender == 'female') {
            genderCol = 'Pink';
        } else {
            genderCol = 'lightgray';
        }

        container.inner.innerHTML = `
            <h3>${character.name}</h3>
            <p>Højde: ${character.height}</p>
            <p>Fødselsår: ${character.birth_year}</p>
            <p style="color: ${genderCol}">Køn: ${character.gender}</p>
        `;
        list.appendChild(container.outer);
    });
}

function createInfoContainer() {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('infoContainer');

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('HoloContainer', 'infoContainerInner');

    outerDiv.appendChild(innerDiv);

    return { outer: outerDiv, inner: innerDiv };
}

// Søg efter karakterer
function searchCharacters() {
    characterCurrentSearch = document.getElementById('character-search').value;
    characterCurrentPage = 1; // Nulstil til side 1 ved ny søgning
    fetchCharacters();
}

// Triggered af button til næste side
function nextPage() {
    characterCurrentPage++;
    fetchCharacters();
}

// Triggered af button til forrige side
function prevPage() {
    if (characterCurrentPage > 1) {
        characterCurrentPage--;
        fetchCharacters();
    }
}