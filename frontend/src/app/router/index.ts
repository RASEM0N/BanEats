import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { actualizeTitle, requiredAuth } from '@app/router/guards';
import { HomePage } from '@pages/home';
import { NotFoundPage } from '@pages/404';
import { ConfirmEmailPage } from '@pages/confirmEmail';
import { EditProfilePage } from '@pages/editProfile';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			meta: {
				title: 'BatEats',
				requiredAuth: true,
			},
			children: [
				{
					path: '/confirm',
					component: ConfirmEmailPage,
				},

				// @TODO под вопром название станицы и путь
				// по идее это просто идет

				// ProfilePage
				// и EditProfileFeature

				// надо будет разнести потом это
				{
					path: '/edit-profile',
					component: EditProfilePage,
				},
			],
		},
		{
			path: '/login',
			component: LoginPage,
			meta: {
				title: 'Login | BanEats',
				requiredAuth: false,
			},
		},
		{
			path: '/register',
			component: RegisterPage,
			meta: {
				title: 'Register | BanEats',
				requiredAuth: false,
			},
		},
		{
			path: '/:pathMatch(.*)*',
			component: NotFoundPage,
			meta: {
				title: '404 | BanEats',
			},
		},
	],
});

router.beforeEach(actualizeTitle);
router.beforeEach(requiredAuth);