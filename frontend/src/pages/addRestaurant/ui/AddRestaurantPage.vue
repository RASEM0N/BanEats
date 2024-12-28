<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { LoginForm } from '@widgets/loginContainer';
import { MyButton } from '@shared/ui';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

// @TODO бан,
// надо логику с ресторанами вынести в отдельный модуль
// заебешься а то говно писать
import { MyRestaurantsQuery } from '@pages/myRestaurant/gql';

interface RestaurantCreateMutationResult {
	RestaurantCreate: {
		restaurant: {
			id: number
			name: string
			address: string
			category: {
				id: number
				name: string
			}
		}
	};
}

interface RestaurantCreateMutationVariables {
	name: string;
	address: string;
	categoryName: string;
}

const router = useRouter();

// @TODO добавить coverImage
const { mutate, loading, error } = useMutation<RestaurantCreateMutationResult, RestaurantCreateMutationVariables>(gql`
	mutation RestaurantCreateMutation(
		$name: String!,
		$address: String!,
		$categoryName: String!
	) {

		RestaurantCreate(
			name: $name,
			categoryName: $categoryName,
			address: $address,
			coverImage: "https://new-retail.ru/upload/iblock/5e0/5e0b2ae2365021519cdb15cee263ae18.jpg"
		) {
			restaurant {
				id
				name
				address
				coverImage
				category {
					id
					name
				}
			}
		}
	}
`, {
	fetchPolicy: 'network-only',
	update: (cache, result) => {
		const resultQuery = cache.readQuery({ query: MyRestaurantsQuery });

		if (!resultQuery) {
			return;
		}

		// @TODO покрасивее надо сделать
		cache.writeQuery({
			query: MyRestaurantsQuery,
			data: {
				RestaurantGetAllMy: {
					restaurants: [
						...resultQuery.RestaurantGetAllMy.restaurants,
						result.data.RestaurantCreate.restaurant,
					],
				},
			},
		});
	},
});

const { defineField, handleSubmit, meta, errors: FormErrors } = useForm({
	validationSchema: toTypedSchema(object({
		name: string().min(4).max(255),
		address: string().min(4).max(255),
		categoryName: string().min(5).max(60),
	})),
});

const [name, nameProps] = defineField('name');
const [address, addressProps] = defineField('address');
const [categoryName, categoryNameProps] = defineField('categoryName');

const errors = computed(() => [...Object.values(FormErrors.value), error.value]);
const submit = handleSubmit(async (values) => {
	await mutate(values);
	toast('User data has changed', {
		position: toast.POSITION.TOP_RIGHT,
		type: toast.TYPE.SUCCESS,
		onClose: () => {
			router.push('/');
		},
	});
});

</script>
<template>
	<div class="container flex flex-col items-center mt-40 px-10">
		<h1>Add Restaurant</h1>
		<login-form @submit="submit" :errors="errors">
			<input
				class="input"
				type="text"
				placeholder="Restaurant's name"
				v-model="name"
				v-bind="nameProps">
			<input
				class="input"
				type="text"
				placeholder="Category"
				v-model="address"
				v-bind="addressProps">
			<input
				class="input"
				type="text"
				placeholder="Address"
				v-model="categoryName"
				v-bind="categoryNameProps">
			<my-button
				:is-loading="loading"
				:can-click="meta.valid"
			>
				Create restaurant
			</my-button>
		</login-form>
	</div>
</template>