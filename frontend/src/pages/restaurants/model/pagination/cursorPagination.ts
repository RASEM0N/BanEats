import { TypePolicy } from '@apollo/client/cache/inmemory/policies';

const restaurantsInPage = 25;
export const restaurantsPaginationPolicy: TypePolicy['fields'] = {

	// https://my-js.org/docs/guide/apollo/client#пагинация
	RestaurantGetAll: {

		/*
			keyArgs: ['page']
			RestaurantsGetAll:{"page:1"}

			const result = apollo.cache.readQuery({
				query: RestaurantsQuery,
				variables: { page: 2 }
			})

			keyArgs: []
			RestaurantsGetAll:

			const result = apollo.cache.readQuery({
				query: RestaurantsQuery
			})
		*/


		keyArgs: ['page'],
		// keyArgs: [],
		read: (existing, options) => {

			if (!existing) {
				return existing;
			}

			return {
				...existing,
				restaurants: existing.restaurants.slice(
					restaurantsInPage * (options.args!.page - 1),
					restaurantsInPage * options.args!.page,
				),
			};
		},

		merge: (existing, incoming, options) => {

			if (!existing) {
				return incoming;
			}

			const { restaurants: existRestaurants } = existing;
			const { restaurants: incomRestaurants } = incoming;

			const mergedRestaurants = [...existRestaurants];

			for (let i = 0; i < incoming.restaurants.length; ++i) {
				mergedRestaurants[(options.args!.page - 1) * restaurantsInPage + i] = incomRestaurants[i];
			}

			return {
				...incoming,
				restaurants: mergedRestaurants,
			};
		},
	},
};