<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';

/**
 * @see https://vee-validate.logaretm.com/
 * - множество способов валидации формы (ленивая, агресивная и т.д...)
 * - взаимодействие с разными кейсами: touched, dirty ...
 */

const { defineField, handleSubmit } = useForm({
	initialValues: {
		email: '',
		password: '',
	},
	validationSchema: toTypedSchema(object({
		email: string().email(),
		password: string().min(4).max(40),
	})),
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const submit = handleSubmit((values) => {
	alert(JSON.stringify(values));
});

</script>
<template>
	<div>
		<h1>Login</h1>
		<form @submit="submit">
			<div>
				<input
					v-model="email"
					v-bind="emailProps"
					type="text"
					placeholder="email"
				/>
			</div>
			<div>
				<input
					v-model="password"
					v-bind="passwordProps"
					type="password"
					placeholder="password"
				/>
			</div>
			<button class="bg-yellow-300 text-white">Submit</button>
		</form>
	</div>
</template>
