import { useRegister } from '@features/auth/register';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { USER_ROLE, validationSchema } from '@entities/user';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { computed } from 'vue';

export const useRegisterForm = () => {
	const route = useRoute();
	const router = useRouter();

	const { register, error, loading } = useRegister();
	const { defineField, handleSubmit, meta, errors: formErrors } = useForm({
		initialValues: {
			email: '',
			password: '',
			role: USER_ROLE.client,
		},
		validationSchema: toTypedSchema(object({
			email: validationSchema.user.email,
			password: validationSchema.user.password,
			role: validationSchema.user.role,
		})),
	});

	const role = defineField('role');
	const email = defineField('email');
	const password = defineField('password');

	const submit = handleSubmit(async (values) => {
		await register(values);
		await router.push({
			path: '/login',
			query: {
				redirect: route.query.redirect,
			},
		});
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
			role,
		},
	};
};