describe('Authorization', () => {
	const email = `email${new Date().getTime()}@mail.ru`;
	const password = `password12345678910`;

	beforeEach(() => {
		cy.visit('/');
	});

	it('Register', () => {
		cy.get('form ~ div a').click();

		cy.url().should('include', '/register?redirect=/restaurants');
		cy.inputAuthData(email, password).type('{enter}');
		cy.url().should('include', '/login?redirect=/restaurants');
	});

	it('Login', () => {
		cy.assertNoAuth()
		cy.url().should('include', '/login?redirect=/restaurants');
		cy.inputAuthData(email, password).type('{enter}');
		cy.url().should('include', '/restaurants');
		cy.assertAuth()
	});
});