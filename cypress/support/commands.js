import connection from '../support/db';

const loginInputSelector = 'input[aria-label="Login"]';
const passwordInputSelector = 'input[aria-label="Password"]';
const passwordConfirmInputSelector = 'input[aria-label="Confirm password"]';

Cypress.Commands.add('typeOnLoginInput', text => cy.get(loginInputSelector).type(text));
Cypress.Commands.add('clickOnLoginInput', () => cy.get(loginInputSelector).click());

Cypress.Commands.add('typeOnPasswordInput', text => cy.get('input[aria-label="Password"]').type(text));
Cypress.Commands.add('clickOnPasswordInput', () => cy.get(passwordInputSelector).click());

Cypress.Commands.add('typeOnPasswordConfirmInput', text => cy.get('input[aria-label="Confirm password"]').type(text));
Cypress.Commands.add('clickOnPasswordConfirmInput', () => cy.get(passwordConfirmInputSelector).click());

Cypress.Commands.add('loginAsBobby', () => {

  cy.visit('/login'); 
  const dbConnection = connection();

	cy.fixture('Bobby.json')
		.then(dbConnection.put)

	cy.typeOnLoginInput('Bobby');

	cy.typeOnPasswordInput('goodpassword');

	cy.get('button').click();
});
