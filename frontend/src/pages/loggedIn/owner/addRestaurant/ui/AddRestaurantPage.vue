<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { MyButton } from '@shared/ui';
import { computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { LoginForm } from '@widgets/loginContainer';
import { useRestaurantCreate, validationSchema } from '@entities/restaurant';

const router = useRouter();
const restaurantCreate = useRestaurantCreate();

const { defineField, handleSubmit, meta, errors: FormErrors } = useForm({
	validationSchema: toTypedSchema(object({
		name: validationSchema.restaurant.name,
		address: validationSchema.restaurant.address,
		categoryName: validationSchema.restaurantCategory.name,
	})),
});

const [name, nameProps] = defineField('name');
const [address, addressProps] = defineField('address');
const [categoryName, categoryNameProps] = defineField('categoryName');

const errors = computed(() => [...Object.values(FormErrors.value), restaurantCreate.error.value]);
const submit = handleSubmit(async (values) => {
	await restaurantCreate.mutate({
		...values,

		// @TODO заменить на каритнку
		coverImage: 'https://avatars.mds.yandex.net/i?id=2cf404e3e491efaa734ff0d33e1f354c3d979617-10121887-images-thumbs&n=13',
	});
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
				:is-loading="restaurantCreate.loading"
				:can-click="meta.valid"
			>
				Create restaurant
			</my-button>
		</login-form>
	</div>
</template>