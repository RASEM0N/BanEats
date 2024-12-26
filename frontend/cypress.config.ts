import { defineConfig } from 'cypress';

export default defineConfig({

	// https://docs.cypress.io/app/end-to-end-testing
	e2e: {
		baseUrl: 'http://localhost:5173/',
	},

	// https://docs.cypress.io/app/component-testing
	component: {
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
	},
});
