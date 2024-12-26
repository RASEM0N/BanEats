declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Chainable<void>;

			register(email: string, password: string): Chainable<void>;

			quicklyLogin(): Chainable<void>;

			inputAuthData(email: string, password: string): Chainable<JQuery<HTMLElement>>;

			assertAuth(): Chainable<void>;

			assertNoAuth(): Chainable<void>;
		}
	}
}

Cypress.Commands.add('login', (email: string, password: string) => {
	cy.visit('/login')
		.assertNoAuth()
		.inputAuthData(email, password).type('{enter}')
		.assertAuth();

	cy.url().should('not.include', '/login');
});

Cypress.Commands.add('register', (email: string, password: string) => {
	cy.visit('/register')
		.assertNoAuth()
		.inputAuthData(email, password).type('{enter}')
		.assertNoAuth();

	cy.url().should('include', '/login');
});

Cypress.Commands.add('quicklyLogin', () => {
	const email = `test__${new Date().getTime()}@mail.ru`;
	const password = `password12345678910`;

	cy.register(email, password);

	cy.login(email, password);
});

Cypress.Commands.add('inputAuthData', (email: string, password: string) => {
	cy.get('form input[type="email"]').type(email);
	return cy.get('form input[type="password"]').type(password);
});

Cypress.Commands.add('assertAuth', () => {
	cy.window()
		.its('localStorage.auth:authorization_key')
		.should('not.be.undefined');
});

Cypress.Commands.add('assertNoAuth', () => {
	cy.window()
		.its('localStorage.auth:authorization_key')
		.should('be.undefined');
});
