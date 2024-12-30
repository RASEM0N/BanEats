import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import { object } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useLogin } from '@features/auth/login';
import { validationSchema } from '@entities/user';

export const useLoginForm = () => {
	const route = useRoute();
	const router = useRouter();

	const { login, loading, error } = useLogin();
	const { defineField, errors: formErrors, handleSubmit, meta } = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: toTypedSchema(object({
			email: validationSchema.user.email,
			password: validationSchema.user.password,
		})),
	});

	const email = defineField('email');
	const password = defineField('password');

	const submit = handleSubmit(async (values) => {
		await login(values);

		if (route.query.redirect) {
			await router.push(route.query.redirect as string);
		} else {
			await router.push('/');
		}
	});

	const errors = computed(() => [...Object.values(formErrors.value), error.value]);

	return {
		meta,
		loading,
		errors,
		submit,
		fields: {
			email,
			password,
		},
	};
};