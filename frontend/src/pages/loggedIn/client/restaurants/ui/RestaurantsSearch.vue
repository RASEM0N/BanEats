<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { nullishWithTransform } from '@shared/lib/zod';

const emits = defineEmits<{
	search: [query: string]
}>();

const { defineField, handleSubmit } = useForm({
	initialValues: {
		value: null,
	},
	validationSchema: toTypedSchema(object({
		value: nullishWithTransform(string().min(3), null),
	})),
});

const [value, valueProps] = defineField('value');
const submit = handleSubmit(({ value }) => emits('search', value!));

</script>
<template>
	<form @submit="submit" class="bg-gray-800 w-full py-40 flex items-center justify-center">
		<input
			type="search"
			class="input rounded-md border-0 w-3/4 md:w-3/12"
			placeholder="Search restaurants..."
			v-model="value"
			v-bind="valueProps"
		/>
	</form>
</template>