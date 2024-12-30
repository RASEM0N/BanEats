<script lang="ts" setup>
import { MyButton } from '@shared/ui';
import { LoginForm } from '@widgets/loginContainer';
import { useUpdateUserForm } from '@features/user/update';

const {
	loading,
	meta,
	submit,
	errors,
	fields,
} = useUpdateUserForm();

const {
	email: [email, emailProps],
	password: [password, passwordProps]
} = fields


</script>
<template>
	<div class="mt-52 flex flex-col justify-center items-center">
		<h4 class="font-semibold text-2xl mb-3">Edit Profile</h4>
		<login-form @submit="submit" :errors="errors" class="gap-3 max-w-screen-sm">
			<input
				type="email"
				placeholder="Email"
				class="input"
				v-model="email"
				v-bind="emailProps"
			>
			<input
				type="password"
				placeholder="Password"
				class="input"
				v-model="password"
				v-bind="passwordProps"
			>
			<my-button
				:is-loading="loading"
				:can-click="meta.valid"
			>
				Save Profile
			</my-button>
		</login-form>
	</div>
</template>