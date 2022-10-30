/* eslint-disable no-console */

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { version } from '../package.json';
import App from './app.vue';
import { registerComponents } from './components/register';
import { DIRECTUS_LOGO } from './constants';
import { registerDirectives } from './directives/register';
import { registerPanels } from './panels/register';
import { registerDisplays } from './displays/register';
import { registerInterfaces } from './interfaces/register';
import { i18n } from './lang/';
import { registerLayouts } from './layouts/register';
import { loadModules } from './modules/register';
import { router } from './router';
import './styles/main.scss';
import { registerViews } from './views/register';
import { registerOperations } from './operations/register';

init();

async function init() {
	const app = createApp(App);

	app.use(router);
	app.use(i18n);
	app.use(createPinia());

	registerDirectives(app);
	registerComponents(app);
	registerViews(app);

	await Promise.all([
		registerInterfaces(app),
		registerPanels(app),
		registerDisplays(app),
		registerLayouts(app),
		registerOperations(app),
		loadModules(),
	]);

	app.mount('#app');

	// Prevent the browser from opening files that are dragged on the window
	window.addEventListener('dragover', (e) => e.preventDefault(), false);
	window.addEventListener('drop', (e) => e.preventDefault(), false);
}
