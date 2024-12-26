interface MockGqlRequestParams {
	operationName: string;
	data?: any;
}

declare global {
	namespace Cypress {
		interface Chainable {
			mockGqlRequest({ operationName, data }: MockGqlRequestParams): Chainable<void>;
		}
	}
}

Cypress.Commands.add('mockGqlRequest', ({ operationName, data }: MockGqlRequestParams) => {

	cy.intercept('/graphql', (req) => {
		if (req.body.operationName === operationName) {
			req.reply((res) => res.send({ data: data ?? {} }));
		}
	});
});