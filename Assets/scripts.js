


// Funktion til at vise en sektion og skjule de andre
function showSection(sectionId) {
    
    // Først så - skjuler vi alle sektioner
    document.getElementById('home').style.display = 'none';
    document.getElementById('characters').style.display = 'none';
    document.getElementById('planets').style.display = 'none';
    document.getElementById('films').style.display = 'none';

    // Vis den valgte sektion
    document.getElementById(sectionId).style.display = 'block';

    // Hent data når en sektion vises
    if (sectionId === 'characters') {
        fetchCharacters();
    } else if (sectionId === 'planets' && !planetsLoaded) {
        fetchAllPlanets();
        planetsLoaded = true; // Sørg for kun at hente planeter én gang
    } else if (sectionId === 'films') {
        fetchFilms();
    }
}




