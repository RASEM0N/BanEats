import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
// import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// vueDevTools({ launchEditor: 'webstorm' }),
		vue(),
		svgLoader(),
	],
	resolve: {
		alias: {
			'@app': path.join(__dirname, 'src/app'),
			'@pages': path.join(__dirname, 'src/pages'),
			'@widgets': path.join(__dirname, 'src/widgets'),
			'@features': path.join(__dirname, 'src/features'),
			'@entities': path.join(__dirname, 'src/entities'),
			'@shared': path.join(__dirname, 'src/shared'),
		},
	},
});
