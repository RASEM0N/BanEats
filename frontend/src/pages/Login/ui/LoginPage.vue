<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { MyButton } from '@shared/ui';
import { computed } from 'vue';
import { LoginContainer, LoginForm } from '@widgets/LoginContainer';
import { useLogin } from '@pages/Login/model/useLogin';


const login = useLogin();

const { defineField, errors: formErrors, handleSubmit, meta } = useForm({
	initialValues: {
		email: '',
		password: '',
	},
	validationSchema: toTypedSchema(object({
		email: string().email(),
		password: string().min(4).max(40),
	})),
});

const [email, emailProps] = defineField('email', {
	validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField('password', {
	validateOnModelUpdate: false,
});

const submit = handleSubmit((values) => {
	login.mutate(values);
});

const errors = computed(() => [...Object.values(formErrors.value), login.error]);
const canSubmit = computed(() => login.loading.value && meta.value.valid);

</script>
<template>
	<login-container
		name="Welcome back"
		:link="{
			description: 'New to Eats?',
			to: '/register',
			toDescription: 'Create an Account'
	}">
		<login-form :errors="errors" @submit="submit">
			<input
				placeholder="Email"
				class="input" type="text"
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
			<my-button :can-click="canSubmit" :is-loading="login.loading.value">Submit</my-button>
		</login-form>
	</login-container>
</template>