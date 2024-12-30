<script setup lang="ts">
import { LoginContainer, LoginForm } from '@widgets/loginContainer';
import { USER_ROLE } from '@entities/user';
import { MyButton } from '@shared/ui';
import { useRegisterForm } from '@features/auth/register';
import { useRoute } from 'vue-router';

const route = useRoute();

const {
	errors,
	submit,
	meta,
	loading,
	fields,
} = useRegisterForm();

const {
	role: [role, roleProps],
	email: [email, emailProps],
	password: [password, passwordProps]
} = fields;

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
				:is-loading="loading"
			>
				Create Account
			</MyButton>
		</login-form>
	</login-container>
</template>
<style></style>