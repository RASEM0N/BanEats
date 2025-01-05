import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage } from '@pages/loggedOut/login';
import { RegisterPage } from '@pages/loggedOut/register';
import { NotFoundPage } from '@pages/common/404';
import { actualizeTitle, requiredAuth, role } from './guards';
import { HomePage } from '@pages/loggedIn/common/home';
import { ConfirmEmailPage } from '@pages/loggedIn/common/confirmEmail';
import { EditProfilePage } from '@pages/loggedIn/common/editProfile';
import { OrderPage } from '@pages/loggedIn/common/orders';
import { USER_ROLE } from '@entities/user';
import { RestaurantsPage } from '@pages/loggedIn/client/restaurants';
import { RestaurantPage } from '@pages/loggedIn/client/restaurant';
import { CategoryPage } from '@pages/loggedIn/client/category';
import { MyRestaurantsPage } from '@pages/loggedIn/owner/myRestaurants';
import { AddRestaurantPage } from '@pages/loggedIn/owner/addRestaurant';
import { MyRestaurantPage } from '@pages/loggedIn/owner/myRestaurant';
import { AddDishPage } from '@pages/loggedIn/owner/addDIsh';
import TestPage from '@pages/TestPage.vue';


/**
 * Важно:
 * 1. Если есть одинаковые path то всегда вызывается 1-ый из них (2-ой и т.д. никогда не вызовутся)
 * 2. Если вызвался дочерний маршут, то родительский не вызовется.
 *    У родителя вызовается только beforeEnter
 * 3. Родитель делится всей мета информацией с дочерними маршрутами
 *
 * Логика:
 * 1. Переходим на /
 * 2. Проверяем можем ли мы перейти в guard-е
 * 3. Переходим на /
 * 4. Рендарим HomePage
 * 5. Загружаем данные о пользователе
 * 6. Изменяем роут относительно нашей роли
 */

export const router = createRouter({
	history: createWebHistory(),
	routes: [

		{
			path: '',
			component: HomePage,
			meta: { requiredAuth: true },
			children: [
				{
					path: '/confirm',
					component: ConfirmEmailPage,
					meta: { title: 'Confirm | BanEats' },
				},
				{
					path: '/edit-profile',
					component: EditProfilePage,
					meta: { title: 'Profile | BanEats' },
				},
				{
					path: '/orders/:orderId',
					component: OrderPage,
					meta: { title: 'Order | BanEats' },
				},

				// тут просто для группировки так сделал
				// чтоб во всех роутах не прописывать role: USER_ROLE.client
				{
					path: '/',
					meta: { role: USER_ROLE.client },
					children: [
						{
							path: '/restaurants',
							component: RestaurantsPage,
							meta: { title: 'Restaurants | BanEats' },
						},
						{
							path: '/restaurants/:restaurantId',
							component: RestaurantPage,
							meta: { title: 'Restaurant | BanEats' },
						},
						{
							path: '/restaurants/category/:slug',
							component: CategoryPage,
							meta: { title: 'Category | BanEats' },
						},
					],
				},

				// тут просто для группировки так сделал
				// чтоб во всех роутах не прописывать role: USER_ROLE.owner
				{
					path: '/',
					meta: { role: USER_ROLE.owner },
					children: [
						{
							path: '/add-restaurant',
							component: AddRestaurantPage,
							meta: { title: 'Add Restaurant | BanEats' },
						},
						{
							path: '/my-restaurants',
							component: MyRestaurantsPage,
							meta: { title: 'My restaurants | BanEats' },
						},
						{
							path: '/my-restaurants/:restaurantId',
							component: MyRestaurantPage,
							meta: { title: 'My Restaurant | BanEats' },
						},
						{
							path: '/my-restaurants/:restaurantId/add-dish',
							component: AddDishPage,
							meta: { title: 'Add dish | BanEats' },
						},
					],
				},
			],
		},

		// тут просто для группировки так сделал
		// чтоб во всех роутах не прописывать requiredAuth: false
		{
			path: '/',
			meta: { requiredAuth: false },
			children: [
				{
					path: '/login',
					component: LoginPage,
					meta: { title: 'Login | BanEats' },
				},
				{
					path: '/register',
					component: RegisterPage,
					meta: { title: 'Register | BanEats' },
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			component: NotFoundPage,
			meta: { title: '404 | BanEats' },
		},
		{
			path: '/test',
			component: TestPage,
			meta: { title: 'Test | BanEats' },
		},
	],
});

router.beforeEach(actualizeTitle);
router.beforeEach(requiredAuth);
router.beforeEach(role);