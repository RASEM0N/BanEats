import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { useMe, validationSchema } from '@entities/user';
import { nullishWithTransform } from '@shared/lib/zod';
import { computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useUpdateUser } from '@features/user/update';

export const useUpdateUserForm = () => {
	const { user } = useMe();
	const { update, error, loading } = useUpdateUser();

	const { defineField, handleSubmit, meta, errors: formErrors } = useForm({
		initialValues: {
			email: user.value?.email,
			password: undefined,
		},
		validationSchema: toTypedSchema(object({
			email: validationSchema.user.email,
			password: nullishWithTransform(validationSchema.user.password, undefined),
		})),
	});
	const email = defineField('email');
	const password = defineField('password');

	const errors = computed(() => [...Object.values(formErrors.value), error.value]);

	const submit = handleSubmit(async (values) => {
		await update(values);
		toast('User data has changed', { position: toast.POSITION.TOP_RIGHT, type: 'success' });
	});

	return {
		submit,
		errors,
		loading,
		meta,
		fields: {
			email,
			password,
		},
	};
};