/// <reference types="Cypress" />

context('Todos', () => {
	beforeEach(() => {
		cy.loginAsBobby();
		cy.contains('Welcome Bobby');
		cy.visit('/todos');
	});

	it('adds todos and marks them as done', () => {
		cy.contains('No todos');

		cy.get('input[aria-label="New todo"]').type('First task');

		cy.contains('Add').click();

		cy.contains('No todos').should('not.exist');

		cy.contains('First task').should('have.attr', 'style', 'text-decoration: none;');

		cy.get('input[aria-label="Check First task"]').click();

		cy.contains('First task').should('have.attr', 'style', 'text-decoration: line-through;');
	});


	it('cannot add already existing or empty todos', () => {
		cy.get('input[aria-label="New todo"]').type('First task');

		cy.contains('Add').click();

		cy.get('input[aria-label="New todo"]').type('First task');

		cy.contains('Todo already in the list');

		cy.contains('Add').should('be.disabled');

		cy.get('input[aria-label="New todo"]').clear().type('Second task');

		cy.contains('Add').should('be.enabled');

		cy.contains('Todo already in the list').should('not.exist');

		cy.get('input[aria-label="New todo"]').clear();

		cy.contains('Add').should('be.disabled');
	});
});
