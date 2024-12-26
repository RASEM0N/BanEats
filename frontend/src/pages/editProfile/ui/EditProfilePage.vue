<script lang="ts" setup>
import { useMe } from '@features/auth';
import { LoginForm } from '@widgets/loginContainer';
import { useForm } from 'vee-validate';
import { MyButton } from '@shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { userSchema } from '@entities/user';
import { useEditUser } from '@pages/editProfile/model/useEditUser';
import { computed } from 'vue';
import { nullishWithTransform } from '@shared/lib/zod';
import { toast } from 'vue3-toastify';

const editUser = useEditUser();
const { user } = useMe();

const { defineField, handleSubmit, meta, errors: formErrors } = useForm({
	initialValues: {
		email: user.value?.email,
		password: undefined,
	},
	validationSchema: toTypedSchema(object({
		email: userSchema.email,
		password: nullishWithTransform(userSchema.password, undefined),
	})),
});
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const errors = computed(() => [...Object.values(formErrors.value), editUser.error.value]);


const submit = handleSubmit((values) => {
	editUser.mutate(values).then(() => {
		toast('User data has changed', {
			position: toast.POSITION.TOP_RIGHT,
			type: 'success',
		});
	});
});
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
				:is-loading="editUser.loading.value"
				:can-click="meta.valid"
			>
				Save Profile
			</my-button>
		</login-form>
	</div>
</template>