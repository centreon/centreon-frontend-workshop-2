/// <reference types="Cypress" />

import connection from "../support/db";

context('Registration', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

	it('displays forms errors if any and prevents from submitting', () => {
    cy.get('button').should('be.disabled');

    cy.clickOnLoginInput()
    cy.clickOnPasswordInput();

    cy.contains('Login is required');
    cy.get('button').should('be.disabled');

    cy.clickOnPasswordConfirmInput();

    cy.contains('Password is required');
    cy.get('button').should('be.disabled');

    cy.clickOnLoginInput();

    cy.contains('Password confirmation is required');
    cy.get('button').should('be.disabled');

    cy.typeOnLoginInput('Bobby');
    cy.get('button').should('be.disabled');

    cy.typeOnPasswordInput('short');
    cy.clickOnPasswordConfirmInput();
    cy.contains('Password is too short');
    cy.get('button').should('be.disabled');

    cy.typeOnPasswordInput('goodpassword');
    cy.typeOnPasswordConfirmInput('goodpasswor');
    cy.contains('Passwords must match');
    cy.get('button').should('be.disabled');
  });

  it('display an error if Login is already taken', () => {
    cy.fixture('Bobby.json').then(connection().put);

    cy.typeOnLoginInput('Bobby');

    cy.typeOnPasswordInput('goodpassword');

    cy.typeOnPasswordConfirmInput('goodpassword');

    cy.get('button').click();

    cy.contains('Login already taken')
  });

  it('redirects to homepage and welcomes the user when registration is successful', () => {
    cy.typeOnLoginInput('Bobby');

    cy.typeOnPasswordInput('goodpassword');

    cy.typeOnPasswordConfirmInput('goodpassword');

    cy.get('button').click();

    cy.contains(`Welcome Bobby`);

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
