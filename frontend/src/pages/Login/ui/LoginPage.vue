<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { useMutation } from '@vue/apollo-composable';
import { LogoIcon } from '@shared/ui/icons';
import gql from 'graphql-tag';
import { MyButton } from '@shared/ui';
import { computed } from 'vue';

/**
 * @see https://vee-validate.logaretm.com/
 * - множество способов валидации формы (ленивая, агресивная и т.д...)
 * - взаимодействие с разными кейсами: touched, dirty ...
 */

const login = useMutation(gql`
	mutation LoginMutation($email: String!, $password: String!) {
		AuthLogin(email: $email, password: $password) {
			token
			user {
				email
			}
		}
	}
`);

const { defineField, errors, handleSubmit, meta } = useForm({
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

const canSubmit = computed(() => login.loading.value && meta.value.valid);

</script>
<template>
	<div class="h-screen flex items-center flex-col mt-10 lg:mt-28">
		<div class="w-full max-w-screen-sm flex flex-col px-5 items-center">
			<logo-icon class="w-52 mb-10" />
			<h4 class="w-full font-medium text-left text-3xl mb-5">
				Welcome back
			</h4>
			<span v-if="login.error" class="font-medium text-red-500">{{ login.error }}</span>
			<form class="flex flex-col mt-5 w-full mb-5" @submit="submit">
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
				<template v-for="error in Object.values(errors)">
					<span class="font-medium text-red-500">{{ error }}</span>
				</template>
				<my-button :can-click="canSubmit" :is-loading="login.loading.value">Submit</my-button>
			</form>
			<div>
				New to Eats?
				<router-link to="/register" class="link">
					Create an Account
				</router-link>
			</div>
		</div>
	</div>
</template>