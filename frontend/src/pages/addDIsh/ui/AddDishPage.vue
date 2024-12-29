<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useForm, useFieldArray, Field } from 'vee-validate';
import { LoginForm } from '@widgets/loginContainer';
import { toTypedSchema } from '@vee-validate/zod';
import { array, number, object, string } from 'zod';
import { MyButton } from '@shared/ui';
import { computed } from 'vue';

interface RestaurantDishCreateMutationVars {
	name: string;
	description: string;
	price: number;
	restaurantId: string;
	options: { name: string, extra?: number }[];
}

interface RestaurantDishCreateMutationResult {
	RestaurantDishCreate: {
		dish: {
			id: number
			name: string
			description: string
			restaurantId: number
			price: number
			photo: string
		}
	};
}

const route = useRoute();
const restaurantId = String(route.params.restaurantId);

const { mutate, loading, error } = useMutation<RestaurantDishCreateMutationResult, RestaurantDishCreateMutationVars>(gql`
	mutation RestaurantDishCreateMutation(
		$name: String!
		$description: String!
		$price: Float!
		$restaurantId: Float!
		$options: [DishOptionInput!]
	) {
		RestaurantDishCreate(
			name: $name
			price: $price
			description: $description
			restaurantId: $restaurantId
			options: $options
		) {
			dish {
				id
				name
				description
				restaurantId
				price
				photo
			}
		}
	}
`);

const { defineField, handleSubmit, errors: formErrors, meta } = useForm({
	initialValues: {
		name: '',
		description: '',
		price: undefined,
		options: [],
	},
	validationSchema: toTypedSchema(object({
		name: string().min(4).max(255),
		price: number().positive(),
		description: string().min(4).max(255),
		options: array(object({
			name: string().min(4),
			extra: number().int().positive().optional(),
		})),
	})),
});

const [name, nameProps] = defineField('name');
const [price, priceProps] = defineField('price');
const [description, descriptionProps] = defineField('description');
const { fields, remove, push } = useFieldArray('options');

const submit = handleSubmit((values) => {
	mutate({
		name: values.name,
		description: values.description,
		price: values.price,
		options: values.options ?? [],
		restaurantId,
	});
});

const errors = computed(() => [...Object.values(formErrors.value), error.value])


</script>
<template>
	<div class="container flex flex-col items-center mt-52 px-10">
		<h4 class="font-semibold text-2xl mb-3">Add Dish</h4>
		<login-form @submit="submit" :errors="errors">
			<input
				class="input"
				type="text"
				placeholder="Name"
				v-model="name"
				v-bind="nameProps"
			/>
			<input
				class="input"
				type="number"
				placeholder="Price"
				v-model="price"
				v-bind="priceProps"
			/>
			<input
				class="input"
				type="text"
				placeholder="Description"
				v-model="description"
				v-bind="descriptionProps"
			/>
			<div class="my-10">
				<h4 class="font-medium  mb-3 text-lg">Dish Options</h4>
				<button class="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
						@click="push({ name: '', choice: undefined })"
						type="button"
				>
					Add Dish Option
				</button>
				<div class="mt-5"
					 v-for="(field, idx) in fields"
					 :key="field.key"
				>
					<field
						:name="`options[${idx}].name`"
						class="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
						type="text"
						min="0"
						placeholder="Option Name"
					/>
					<field
						:name="`options[${idx}].extra`"
						class="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
						type="number"
						min="0"
						placeholder="Option Extra"
					/>
					<button class="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5"
							@click="remove(idx)"
							type="button"
					>
						Delete Option
					</button>
				</div>
			</div>
			<my-button
				:is-loading="loading"
				:can-click="meta.valid"
			>
				Create dish
			</my-button>
		</login-form>
	</div>
</template>