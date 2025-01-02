import { useRoute } from 'vue-router';
import { useFieldArray, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { array, number, object, string } from 'zod';
import { computed } from 'vue';
import { useRestaurantDishCreate } from '../model/service';

export const useRestaurantDishCreateForm = () => {
	const route = useRoute();
	const restaurantId = +route.params.restaurantId
	const { create, loading, error } = useRestaurantDishCreate()

	const { defineField, handleSubmit, errors: formErrors, meta } = useForm({
		initialValues: {
			name: '',
			description: '',
			price: undefined,
			options: [],
		},
		validationSchema: toTypedSchema(object({
			name: string().min(4).max(255),
			price: number().positive(),
			description: string().min(4).max(255),
			options: array(object({
				name: string().min(4),
				extra: number().int().positive().optional(),
			})),
		})),
	});

	const name = defineField('name');
	const price = defineField('price');
	const description = defineField('description');
	const options = useFieldArray('options');

	const submit = handleSubmit((values) => {
		create({
			name: values.name,
			description: values.description,
			price: values.price,
			options: values.options ?? [],
			restaurantId,
		});
	});

	const errors = computed(() => [...Object.values(formErrors.value), error.value])

	return {
		errors,
		loading,
		submit,
		meta,
		fields: {
			name,
			price,
			description,
			options
		}
	}
}