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

	it('Edit user', () => {
		const newEmail = `email${new Date().getTime()}@mail.ru`;

		cy.visit('/');
		cy.get('form input[type="email"]').type(email);
		cy.get('form input[type="password"]').type(password).type('{enter}');

		cy.get('#nav-edit-profile').click();
		cy.url().should('include', '/edit-profile');

		cy.get('form input[type="email"]').clear()
		cy.get('form input[type="email"]').type(newEmail).type('{enter}');

		cy.get('[data-testid]').should('exist');
		cy.get('form input[type="email"]').should('have.value', newEmail);
		cy.get('form input[type="password"]').should('have.value', '');
	});
});