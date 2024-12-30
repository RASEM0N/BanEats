import { useRouter } from 'vue-router';
import { useRestaurantCreate } from '../model/service';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { computed } from 'vue';
import { toast } from 'vue3-toastify';
import { validationSchema } from '@entities/restaurant'

export const useRestaurantCreateForm = () => {
	const router = useRouter();

	const { create, error, loading } = useRestaurantCreate();
	const { defineField, handleSubmit, meta, errors: FormErrors } = useForm({
		validationSchema: toTypedSchema(object({
			name: validationSchema.restaurant.name,
			address: validationSchema.restaurant.address,
			categoryName: validationSchema.restaurantCategory.name,
		})),
	});

	const name = defineField('name');
	const address = defineField('address');
	const categoryName = defineField('categoryName');

	const errors = computed(() => [...Object.values(FormErrors.value), error.value]);
	const submit = handleSubmit(async (values) => {
		await create({
			...values,

			// @TODO заменить на каритнку
			coverImage: 'https://avatars.mds.yandex.net/i?id=2cf404e3e491efaa734ff0d33e1f354c3d979617-10121887-images-thumbs&n=13',
		});
		toast('User data has changed', {
			position: toast.POSITION.TOP_RIGHT,
			type: toast.TYPE.SUCCESS,
			onClose: () => {
				router.push('/');
			},
		});
	});

	return {
		errors,
		submit,
		meta,
		loading,
		fields: {
			name,
			address,
			categoryName
		}
	}
}