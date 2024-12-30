import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { MyButton } from '@shared/ui';

describe('@components/MyButton', () => {

	test('Slot text', () => {
		const button = mount(MyButton, {
			slots: {
				default: 'Submit',
			},
		});

		expect(button.get('button').text()).equal('Submit');
		expect(button.get('button').classes()).not.include('pointer-events-none');
	});

	test('Loading', () => {
		const button = mount(MyButton, {
			props: {
				isLoading: true,
			},
			slots: {
				default: 'Submit',
			},
		});

		expect(button.get('button').text()).equal('Loading...');
		expect(button.get('button').classes()).include('pointer-events-none');
	});

	test('CanClick', () => {
		const button = mount(MyButton, {
			props: {
				canClick: false,
			},
			slots: {
				default: 'Submit',
			},
		});

		expect(button.get('button').text()).equal('Submit');
		expect(button.get('button').classes()).include('pointer-events-none');
	});
});