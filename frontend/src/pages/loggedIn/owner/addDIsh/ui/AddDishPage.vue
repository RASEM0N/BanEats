<script lang="ts" setup>
import { Field } from 'vee-validate';
import { MyButton } from '@shared/ui';
import { LoginForm } from '@widgets/loginContainer';
import { useRestaurantDishCreateForm } from '@features/restaurant/createDish';

const {
	submit,
	fields,
	meta,
	loading,
	errors,
} = useRestaurantDishCreateForm();

const {
	name: [name, nameProps],
	price: [price, priceProps],
	description: [description, descriptionProps],
	options,
} = fields;

const { fields: optionsFields } = options;


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
						@click="options.push({ name: '', choice: undefined })"
						type="button"
				>
					Add Dish Option
				</button>
				<div class="mt-5"
					 v-for="(field, idx) in optionsFields"
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
							@click="options.remove(idx)"
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