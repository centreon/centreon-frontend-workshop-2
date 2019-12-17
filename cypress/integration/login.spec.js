/// <reference types="Cypress" />

import connection from '../support/db';

const username = 'Bobby';

context('Login', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('displays form errors if any and prevents from submitting', () => {
		cy.clickOnLoginInput();
		cy.clickOnPasswordInput();
		cy.contains('Login is required');

		cy.get('button').should('be.disabled');

		cy.clickOnLoginInput();
		cy.contains('Password is required');
		cy.get('button').should('be.disabled');
	});

	it('displays an error if the login and password have no match', () => {
		cy.typeOnLoginInput('Bobbby');

		cy.typeOnPasswordInput('goodpassword');

		cy.get('button').click();

		cy.contains('Login or password invalid');
	});

	it('redirects to homepage and welcomes the user when login is successful', () => {
		cy.fixture('Bobby.json').then(connection().put);

		cy.typeOnLoginInput(username);

		cy.typeOnPasswordInput('goodpassword');

		cy.get('button').click();

		cy.contains(`Welcome ${username}`);

		cy.url().should('eq', Cypress.config().baseUrl + '/');
	});

	it('logs out the User when the logout button is clicked', () => {
		cy.fixture('Bobby.json').then(connection().put);

		cy.typeOnLoginInput(username);

		cy.typeOnPasswordInput('goodpassword');

		cy.get('button').click();

		cy.contains('Logout').click();

		cy.contains('Logout').should('not.exist');

		cy.contains('Please register or login to continue');

		cy.contains('Login');

		cy.contains('Register');
	});
});
