/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://aheaco.t24.ovh/');
  });
  it('Sprawdzenie generatora miast', () => {
    cy.get('#generateBtn').click(); // Kliknij przycisk "Wygeneruj miasta"
    cy.get('.city').should('have.length.at.least', 1); // Sprawdź, czy miasta zostały wygenerowane
  });
  it('Sprawdzenie elementów strony', () => {
    cy.get('header').should('be.visible'); // Sprawdź, czy nagłówek jest widoczny
    cy.get('button').should('have.length.at.least', 1); // Sprawdź, czy są przyciski
    cy.get('#map').should('exist'); // Sprawdź, czy mapa istnieje
  });

  it('Sprawdzenie generatora miast', () => {
    cy.get('#generate-cities').click(); // Kliknij przycisk generatora
    cy.get('.city').should('have.length.at.least', 1); // Sprawdź, czy miasta zostały wygenerowane
  });

  it('Sprawdzenie dodawania miast przez kliknięcie', () => {
    cy.get('#add-city').click(); // Kliknij przycisk dodawania miasta
    cy.get('.city').should('have.length.at.least', 1); // Sprawdź, czy miasto zostało dodane
  });

  it('Sprawdzenie usuwania miast', () => {
    cy.get('#generate-cities').click(); // Wygeneruj miasta
    cy.get('.city').first().find('.delete-button').click(); // Usuń pierwsze miasto
    cy.get('.city').should('have.length.lessThan', 5); // Sprawdź, czy liczba miast się zmniejszyła
  });

  it('Sprawdzenie obliczanie najkrótszej trasy', () => {
    cy.get('#calculate-route').click(); // Kliknij przycisk obliczania trasy
    cy.get('.route').should('exist'); // Sprawdź, czy trasa została obliczona
  });

  it('Sprawdzenie istnienia legendy', () => {
    cy.get('#legend').should('be.visible'); // Sprawdź, czy legenda jest widoczna
  });

  it('Sprawdzenie istnienia 5 tras po obliczeniu tras', () => {
    cy.get('#calculate-route').click(); // Kliknij przycisk obliczania tras
    cy.get('.route').should('have.length', 5); // Sprawdź, czy wygenerowano 5 tras
  });

  it('Sprawdzenie istnienia statystyk po obliczeniu tras', () => {
    cy.get('#calculate-route').click(); // Kliknij przycisk obliczania tras
    cy.get('#statistics').should('be.visible'); // Sprawdź, czy statystyki są widoczne
  });
});
