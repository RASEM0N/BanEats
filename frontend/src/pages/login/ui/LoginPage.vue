<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { MyButton } from '@shared/ui';
import { computed } from 'vue';
import { LoginContainer, LoginForm } from '@widgets/loginContainer';
import { useLogin } from '@features/auth';
import { useRoute, useRouter } from 'vue-router';
import { userSchema } from '@entities/user';

const route = useRoute();
const router = useRouter();

const login = useLogin();
const errors = computed(() => [...Object.values(formErrors.value), login.error]);

const { defineField, errors: formErrors, handleSubmit, meta } = useForm({
	initialValues: {
		email: '',
		password: '',
	},
	validationSchema: toTypedSchema(object({
		email: userSchema.email,
		password: userSchema.password,
	})),
});

const [email, emailProps] = defineField('email', {
	validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField('password', {
	validateOnModelUpdate: false,
});

const submit = handleSubmit(async (values) => {
	await login.mutate(values);

	if (route.query.redirect) {
		await router.push(route.query.redirect as string);
	} else {
		await router.push('/');
	}
});
</script>
<template>
	<login-container
		name="Welcome back"
		:link="{
			description: 'New to Eats?',
			toDescription: 'Create an Account',
			to: {
				path: '/register',
				query: {
					redirect: route.query.redirect,
				},
			},
	}">
		<login-form :errors="errors" @submit="submit">
			<input
				placeholder="Email"
				class="input"
				type="email"
				v-model="email"
				v-bind="emailProps"
			/>
			<input
				placeholder="Password"
				class="input"
				type="password"
				v-model="password"
				v-bind="passwordProps"
			/>
			<my-button
				:can-click="meta.valid"
				:is-loading="login.loading.value">
				Login
			</my-button>
		</login-form>
	</login-container>
</template>