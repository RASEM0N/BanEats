import { useMutation } from '@vue/apollo-composable';
import { ORDER_CREATE_MUTATION, OrderCreateMutationVars, OrderItem } from './schema';
import { IOrderItemOptionFragment } from '@entities/order';
import { ref } from 'vue';

export const useOrderCreate = (restaurantId: number) => {
	const { mutate, ...mutation } = useMutation<void, OrderCreateMutationVars>(ORDER_CREATE_MUTATION);
	const items = ref<OrderItem[]>([]);

	const selectItem = (itemId: number) => {
		isSelectItem(itemId)
			? removeItem(itemId)
			: addItem(itemId);
	};

	const selectItemOption = (itemId: number, option: IOrderItemOptionFragment) => {
		isSelectItemOption(itemId, option.name)
			? addItemOption(itemId, option)
			: removeItemOption(itemId, option.name);
	};

	const isSelectItem = (itemId: number): boolean => {
		return items.value.some((v) => v.dishId === itemId);
	};

	const isSelectItemOption = (itemId: number, name: string): boolean => {
		return items.value.some((v) =>
			v.dishId === itemId && v.options.some((v) => v.name === name),
		);
	};

	const addItem = (itemId: number) => {
		items.value.push({ dishId: itemId, options: [] });
	};

	const removeItem = (itemId: number) => {
		items.value = items.value.filter((v) => v.dishId !== itemId);
	};

	const addItemOption = (itemId: number, option: IOrderItemOptionFragment) => {
		const item = itemById(itemId);
		if (!item) {
			return
		}

		item.options.push(option);
	};

	const removeItemOption = (itemId: number, name: string) => {
		const item = itemById(itemId);
		if (!item) {
			return
		}

		item.options = item.options.filter((v) => v.name !== name)
	};

	const itemById = (itemId: number): OrderItem | undefined => {
		return items.value.find((v) => v.dishId === itemId);
	};

	const create = () => {
		return mutate({ restaurantId, items: items.value })
	}

	const isValid = () => {
		return items.value.some((v) => v.options.length)
	}

	return {
		...mutation,
		isValid,
		create,
		selectItem,
		selectItemOption,
		isSelectItem,
		isSelectItemOption,
	};
};