// This test will be concerned with the transition from the main page, as well as the rendering of multiple components that display more detailed information about a chosen rover.

// User flows to test will include: details, model, form, and gallery rendering and specific values within each component. 
// Sad path: Error handling for search refining that returns no results, EH for network errors when attempting to access rover details or images, too.
import roversFixture from "../fixtures/roversFixture";
import photosFixture from "../fixtures/imagesFixture";

describe('RoverPage user stories:', () => {

  const roversPath = 'https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=vnSCs1JJ7ERtXeAqN6cajKwEh99pz5q6xueRhxMV'
  const perseverancePhotosPath = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=100&api_key=vnSCs1JJ7ERtXeAqN6cajKwEh99pz5q6xueRhxMV'

  beforeEach(() => {

    cy.intercept({method:'GET', url: roversPath}, roversFixture);
    cy.intercept({method:'GET', url: perseverancePhotosPath}, photosFixture)
    cy.visit('http://localhost:3000/');

    cy.get('[href="/Perseverance"] > div')
      .click()

  })

  it('When a user chooses a rover, the rover icons should disappear but the header should remain:', () => {

    cy.get('h1')
      .should('exist').should('be.visible')
      .contains('Mars Chronicles');
  
    cy.get('[href="/Curiosity"] > div > .rover-icon-img')
     .should('not.exist')

    cy.get('[href="/Spirit"] > div > .rover-icon-img')
     .should('not.exist')
  })

  it('When the view switches to show details, multiple text fields will provide information:', ()=> {

    cy.get('.details-container')
      .should('exist').should('be.visible')
      .contains('Perseverance')

    cy.get('.data-label')
      .should('have.length', 4)
      .contains('Launch')

    cy.get('.data-label')
      .contains('Landing')

    cy.get('.data')
      .should('have.length', 4)
      .contains('2020-07-30')
    
    cy.get('.data')
      .contains('2021-02-18')

    cy.get('.mission-statement')
      .should('exist').should('be.visible')
      .contains('focuses on surface-based studies of the Martian environment')
  })
  
})