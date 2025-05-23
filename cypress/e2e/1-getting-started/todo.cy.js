/// <reference types="cypress" />

// Testy dostosowane do strony https://aheaco.t24.ovh/
// Używają aktualnych id przycisków: addCityBtn, generateBtn, calculateBtn, stopBtn, addCoordBtn

describe('ACO TSP App - https://aheaco.t24.ovh/', () => {
  beforeEach(() => {
    cy.visit('https://aheaco.t24.ovh/');
  });

  it('Powinien wygenerować miasta po kliknięciu "Wygeneruj miasta"', () => {
    cy.get('#generateBtn').click();
    cy.get('.city').should('have.length.at.least', 1);
  });

  it('Powinien dodać miasto po kliknięciu "Dodaj"', () => {
    // Wprowadź przykładowe współrzędne X i Y, jeśli są wymagane
    cy.get('input[placeholder="X"]').type('100');
    cy.get('input[placeholder="Y"]').type('200');
    cy.get('#addCoordBtn').click();
    cy.get('.city').should('have.length.at.least', 1);
  });

  it('Powinien umożliwić dodawanie miast klikając "Dodaj klikając"', () => {
    cy.get('#addCityBtn').click();
    // Załóżmy, że po aktywacji trybu można kliknąć na mapie (np. #map)
    cy.get('#map').click(100, 100);
    cy.get('.city').should('have.length.at.least', 1);
  });

  it('Powinien usuwać miasto (jeśli przycisk usuwania istnieje)', () => {
    cy.get('#generateBtn').click();
    // Zakładamy, że przycisk usuwania miasta ma klasę .delete-button
    cy.get('.city').first().find('.delete-button').click({force: true});
    cy.get('.city').should('have.length.lessThan', 10); // 10 to domyślna liczba miast
  });

  it('Powinien obliczać trasę po kliknięciu "Oblicz trasę"', () => {
    cy.get('#calculateBtn').click();
    cy.get('.route').should('exist');
  });

  it('Powinien mieć widoczną legendę, jeśli istnieje', () => {
    cy.get('#legend').should('be.visible');
  });

  it('Powinien wyświetlić statystyki po obliczeniu tras', () => {
    cy.get('#calculateBtn').click();
    cy.get('#statistics').should('be.visible');
  });

  it('Powinien mieć widoczne przyciski operacji', () => {
    cy.get('#generateBtn').should('be.visible');
    cy.get('#addCityBtn').should('be.visible');
    cy.get('#calculateBtn').should('be.visible');
    cy.get('#stopBtn').should('exist');
  });

  it('Powinien mieć widoczny input do importu pliku', () => {
    cy.contains('Wybierz plik...').should('be.visible');
  });

  it('Powinien mieć widoczne sekcje "Wizualizacja najkrótszej trasy" oraz "Histogram odległości tras"', () => {
    cy.contains('Wizualizacja najkrótszej trasy').should('be.visible');
    cy.contains('Histogram odległości tras').should('be.visible');
  });
});