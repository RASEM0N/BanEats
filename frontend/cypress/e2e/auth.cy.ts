describe('Authorization', () => {
	const email = `email${new Date().getTime()}@mail.ru`;
	const password = `password12345678910`;

	it('Register', () => {
		cy.visit('/');

		cy.get('form ~ div a').click();
		cy.url().should('include', '/register?redirect=/restaurants');

		cy.get('form input[type="email"]').type(email);
		cy.get('form input[type="password"]').type(password).type('{enter}');

		cy.url().should('include', '/login?redirect=/restaurants');
	});

	it('Login', () => {
		cy.visit('/');
		cy.url().should('include', '/login?redirect=/restaurants');

		cy.get('form input[type="email"]').type(email);
		cy.get('form input[type="password"]').type(password).type('{enter}');

		cy.url().should('include', '/restaurants');
	});
});