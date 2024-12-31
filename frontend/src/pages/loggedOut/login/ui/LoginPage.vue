<script setup lang="ts">
import { MyButton } from '@shared/ui';
import { LoginContainer } from '@widgets/loginContainer';
import { useRoute } from 'vue-router';
import { useLoginForm } from '@features/auth/login';
import { MyForm } from '@shared/ui/MyForm';

const route = useRoute();

const {
	errors,
	submit,
	meta,
	loading,
	fields,
} = useLoginForm();

const {
	email: [email, emailProps],
	password: [password, passwordProps],
} = fields;

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
		<my-form :errors="errors" @submit="submit">
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
				:is-loading="loading">
				Login
			</my-button>
		</my-form>
	</login-container>
</template>