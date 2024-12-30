import { afterEach, beforeEach, describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Pagination } from '@shared/ui';

const slotText = (page: number, total: number) => `Page ${page} of ${total}`;
const mountPagination = (props: { totalPages: number }) => {
	return mount(Pagination, {
		props,
		slots: {
			default: `
				<template v-slot="{ page, totalPages }">
					<span>Page {{ page }} of {{ totalPages }}</span>
				</template>
			`,
		},
	});
};

describe('Pagination', () => {

	describe.each([
		{
			total: 0,
			blockNext: true,
			text: slotText(0, 0),
		},
		{
			total: 1,
			blockNext: true,
			text: slotText(1, 1),
		},
		{
			total: 5,
			text: slotText(1, 5),
		},
	])('', ({ total, blockNext, text }) => {
		let pagination: ReturnType<typeof mountPagination>;

		beforeEach(() => {
			pagination = mountPagination({ totalPages: total });
		});

		afterEach(() => {
			pagination.setProps({ totalPages: total });
		});

		test(`totalPages ${total}`, () => {
			expect(pagination.get('span').text()).equal(text);
		});

		test('action prev', async () => {
			const button = pagination.get('[data-action="prev"]');
			expect(button.classes()).include('pointer-events-none');
		});

		test('action next', async () => {
			const button = pagination.get('[data-action="next"]');

			if (blockNext) {
				return expect(button.classes()).include('pointer-events-none');
			}

			for (let i = 2; true; i++) {
				await button.trigger('click');
				expect(pagination.get('span').text()).equal(slotText(i, total));

				if (i >= total) {
					break;
				}
			}
		});
	});
});