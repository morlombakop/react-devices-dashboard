/* eslint-disable no-undef */
// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('App UI tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have title and root element', () => {
    cy.title().should('eq', 'Devices Dashboard');
    cy.root().should('match', 'html');
  });

  it('Should have Header component and Table component', () => {
    cy.get('[data-testid="header-component"]').within(() => {
      cy.get('h2').should('contain', 'Devices Dashboard');
      cy.get('input[type="text"]').should('have.length', 1);
    });
    cy.get('[data-testid="devices-list-container"]').should('exist');
  });

  it('Display no results', () => {
    cy.get('input[type="text"]')
      .type('invalid-devices-names')
      .should('have.value', 'invalid-devices-names');

    cy.get('table').should('not.exist');
    cy.get('h1').should('contain', 'No results ...');
  });

  it('Filter table results', () => {
    cy.get('[data-testid="devices-list-container"]').within(() => {
      cy.get('tr').should('have.length', '12');
    });

    cy.get('input[type="text"]')
      .type('acceleration')
      .should('have.value', 'acceleration');

    cy.get('[data-testid="devices-list-container"]').within(() => {
      cy.get('tr').should('have.length', '4');
    });

    cy.contains('No results ...').should('not.exist');
  });

  it('Show spinner', async () => {
    cy.server({
      method: 'PATCH',
      delay: 50000,
      status: 200,
      response: {},
    });

    cy.get('input[type="checkbox"]')
      .first()
      .click();
    cy.get('[data-testid="loader-container"]').should('exist');
    cy.get('[data-testid="devices-list-container"]').should('not.exist');
  });

  it('Should show success toast message', async () => {
    cy.server({
      method: 'PATCH',
      status: 200,
      response: {},
    });

    cy.get('input[type="checkbox"]')
      .first()
      .click();
    cy.contains('Device status updated').should('exist');
  });

  it('Should show failure toast message', async () => {
    cy.server({
      method: 'PATCH',
      status: 400,
      response: {},
    });

    cy.get('input[type="checkbox"]')
      .first()
      .click();
    cy.contains('Failed to patch device status, please try again !').should('exist');
  });

  it('Should have proper styles', () => {
    cy.get('#root')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(0, 0, 0)');
    cy.get('#root').should('have.css', 'min-height', '100%');
    cy.get('#root').should('have.css', 'min-width', '100%');
    cy.get('#root').should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get('body').should(
      'have.css',
      'font-family',
      '"Helvetica Neue", Helvetica, Arial, sans-serif',
    );
  });
});
