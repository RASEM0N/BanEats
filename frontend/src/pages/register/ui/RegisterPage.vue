<script setup lang="ts">
import { LoginContainer, LoginForm } from '@widgets/loginContainer';
import { computed } from 'vue';
import { useRegister } from '@features/auth';
import { useForm } from 'vee-validate';
import { USER_ROLE } from '@entities/user';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { nativeEnum } from 'zod';
import { MyButton } from '@shared/ui';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const register = useRegister();
const errors = computed(() => [...Object.values(formErrors.value), register.error.value]);

const { defineField, handleSubmit, meta, errors: formErrors } = useForm({
	initialValues: {
		email: '',
		password: '',
		role: USER_ROLE.client,
	},
	validationSchema: toTypedSchema(object({
		email: string().email(),
		password: string().min(10).max(40),
		role: nativeEnum(USER_ROLE),
	})),
});

const [email, emailProps] = defineField('email', {
	validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField('password', {
	validateOnModelUpdate: false,
});
const [role, roleProps] = defineField('role', {
	validateOnModelUpdate: false,
});

const submit = handleSubmit(async (values) => {
	await register.mutate(values);
	await router.push({
		path: '/login',
		query: {
			redirect: route.query.redirect,
		},
	});
});

</script>
<template>
	<login-container
		name="Let's get started"
		:link="{
			toDescription: 'Log in now',
			description: 'Already have an account?',
			to: {
				path: '/login',
				query: {
					redirect: route.query.redirect,
				},
			},
		}"
	>
		<login-form :errors="errors" @submit="submit">
			<input
				class="input"
				placeholder="Email"
				type="email"
				v-model="email"
				v-bind="emailProps"
			/>
			<input
				class="input"
				placeholder="Password"
				type="password"
				v-model="password"
				v-bind="passwordProps"
			/>
			<select
				class="input"
				name="role"
				v-bind="roleProps"
				v-model="role"
			>
				<option v-for="role in Object.values(USER_ROLE)" :key="role">{{ role }}</option>
			</select>
			<MyButton
				:can-click="meta.valid"
				:is-loading="register.loading.value"
			>
				Create Account
			</MyButton>
		</login-form>
	</login-container>
</template>
<style></style>