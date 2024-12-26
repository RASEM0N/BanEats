describe('User', () => {

	beforeEach(() => {
		cy.quicklyLogin();
	});

	it('Edit user', () => {
		const newEmail = `email${new Date().getTime()}@mail.ru`;

		cy.get('#nav-edit-profile').click();
		cy.url().should('include', '/edit-profile');

		cy.get('form input[type="email"]').clear().type(newEmail).type('{enter}');

		cy.get('[data-testid]').should('exist');
		cy.get('form input[type="email"]').should('have.value', newEmail);
		cy.get('form input[type="password"]').should('have.value', '');
	});

	it('Confirm Email', () => {
		cy.mockGqlRequest({ operationName: 'UserVerifyEmailMutation' });

		cy.get('#user-confirm-email.no-verified').should('exist');
		cy.visit('/confirm?code=12345678910');

		cy.wait(1000);
		cy.get('#user-confirm-email.no-verified').should('not.exist');
		cy.url().should('include', '/restaurants');
	});
});