describe('ACO - Problem Komiwojażera Tests', () => {
  beforeEach(() => {
      cy.visit('https://aheaco.t24.ovh/');
  });

  it('should load the page and display main headings', () => {
      cy.get('h1').should('contain', 'Problem komiwojażera - Algorytm Mrówkowy ACO');
      cy.contains('h2', 'Konfiguracja').should('be.visible');
      cy.contains('h2', 'Operacje').should('be.visible');
      cy.contains('h2', 'Wizualizacja najkrótszej trasy').should('be.visible');
      cy.contains('h2', 'Statystyki').should('be.visible');
      cy.contains('h2', 'Lista miast').should('be.visible');
  });

  it('should allow input in configuration fields', () => {
      cy.contains('Liczba miast:')
          .next('input')
          .as('liczbaMiastInput')
          .clear()
          .type('15')
          .should('have.value', '15');
      cy.get('@liczbaMiastInput').clear().type('10').should('have.value', '10'); // Reset to default for other tests if needed

      cy.contains('Liczba iteracji:')
          .next('input')
          .clear()
          .type('500')
          .should('have.value', '500');

      cy.contains('Liczba mrówek:')
          .next('input')
          .clear()
          .type('20')
          .should('have.value', '20');

      cy.contains('Alpha (feromony):')
          .next('input')
          .clear()
          .type('1.5')
          .should('have.value', '1.5');

      cy.contains('Beta (widoczność):')
          .next('input')
          .clear()
          .type('3.0')
          .should('have.value', '3.0');

      cy.contains('Rho (parowanie):')
          .next('input')
          .clear()
          .type('0.05')
          .should('have.value', '0.05');

      cy.contains('Q (ilość feromonów):')
          .next('input')
          .clear()
          .type('500')
          .should('have.value', '500');
  });

  it('should generate cities when "Wygeneruj miasta" is clicked', () => {
      cy.contains('Liczba miast:')
          .next('input')
          .clear()
          .type('5');
      cy.contains('button', 'Wygeneruj miasta').click();
      cy.get('table').should('be.visible'); // Check if the table with cities appears
      cy.get('table tbody tr').should('have.length', 5); // Check if 5 cities are generated
  });

  it('should add a city when coordinates are entered and "Dodaj" is clicked', () => {
      // Initial number of cities
      cy.get('table tbody tr').its('length').then((initialLength) => {
          cy.contains('Dodaj miasto (X,Y):')
              .parent()
              .find('input[type="text"]')
              .eq(0)
              .type('100'); // X coordinate
          cy.contains('Dodaj miasto (X,Y):')
              .parent()
              .find('input[type="text"]')
              .eq(1)
              .type('200'); // Y coordinate
          cy.contains('Dodaj miasto (X,Y):')
              .parent()
              .find('button')
              .click(); // Click 'Dodaj' button

          cy.get('table tbody tr').should('have.length', initialLength + 1);
          cy.contains('td', '100').should('be.visible'); // Check if X coordinate is visible
          cy.contains('td', '200').should('be.visible'); // Check if Y coordinate is visible
      });
  });


  it('should remove a city when "Usuń" is clicked', () => {
      // Ensure there is at least one city to delete
      cy.contains('button', 'Wygeneruj miasta').click(); // Generate some cities
      cy.wait(500); // Give a small moment for cities to render

      cy.get('table tbody tr').its('length').then((initialLength) => {
          if (initialLength > 0) {
              cy.get('table tbody tr').first().find('button').contains('Usuń').click();
              cy.get('table tbody tr').should('have.length', initialLength - 1);
          } else {
              cy.log('No cities to remove for this test.');
          }
      });
  });

  it('should initiate route calculation when "Oblicz trasę" is clicked', () => {
      cy.contains('Liczba miast:')
          .next('input')
          .clear()
          .type('5');
      cy.contains('button', 'Wygeneruj miasta').click();
      cy.contains('button', 'Oblicz trasę').click();
      // Here you would add assertions to check if calculation has started,
      // for example, by checking if statistics update or a loading indicator appears.
      // For simplicity, we'll just check if the button becomes disabled or text changes.
      // This might require more specific selectors or state checks depending on implementation.
      cy.contains('Czas obliczeń')
          .next('span')
          .should('not.contain', '0.0s'); // Expect time to change from initial 0.0s
  });

  it('should stop calculation when "Zatrzymaj" is clicked', () => {
      cy.contains('Liczba miast:')
          .next('input')
          .clear()
          .type('5');
      cy.contains('button', 'Wygeneruj miasta').click();
      cy.contains('button', 'Oblicz trasę').click();
      cy.wait(1000); // Wait a moment for calculation to start
      cy.contains('button', 'Zatrzymaj').click();
      // Assertions to check if calculation has indeed stopped.
      // This could be checking if the time calculation freezes or if the "Oblicz trasę" button becomes active again.
  });

  it('should interact with the file input', () => {
      cy.contains('Import z pliku:')
          .parent()
          .find('input[type="file"]')
          .should('exist');
      // To test file upload, you would typically use `cy.fixture` and `attachFile`
      // Example (assuming you have a file named 'cities.txt' in your fixtures folder):
      // cy.contains('Import z pliku:')
      //     .parent()
      //     .find('input[type="file"]')
      //     .selectFile('cypress/fixtures/cities.txt');
      // Then, you would assert that the cities from the file are loaded into the table.
  });
});