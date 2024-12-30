<script lang="ts" setup>
import { MyButton } from '@shared/ui';
import { LoginForm } from '@widgets/loginContainer';
import { useRestaurantCreateForm } from '@features/restaurant/create';

const { submit, errors, meta, fields, loading } = useRestaurantCreateForm();

const {
	name: [name, nameProps],
	address: [address, addressProps],
	categoryName: [categoryName, categoryNameProps]
} = fields

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