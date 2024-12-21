import { computed, onUnmounted, ref, Ref } from 'vue';
import { ApolloError } from '@apollo/client';

interface RenderConfirmResult {
	title: string,
	description: string,
	cssClass?: string
}

interface RenderConfirmParams {
	code: string
	isVerified: Ref<boolean>,
	loading: Ref<boolean>
	error: Ref<ApolloError | null>
	seconds: number
}

export const useRenderConfirm = ({ isVerified, loading, error, code, seconds }: RenderConfirmParams) => {
	let guardTimeout: number | undefined;
	let redirectInterval: number | undefined;

	const secondsLeft = ref(seconds);

	const renderResult = computed<RenderConfirmResult>(() => {

		if (!code) {
			return {
				title: 'Error confirm email',
				description: 'Code is empty.',
				cssClass: 'text-red',
			};
		}

		if (isVerified.value) {
			return {
				title: 'Success confirm email',
				description: 'You will be redirected to the main page in 3 seconds.',
				cssClass: 'text-green',
			};
		}

		if (error.value) {
			return {
				title: 'Error confirm email',
				description: String(error.value),
				cssClass: 'text-red',
			};
		}

		if (loading.value) {
			return {
				title: 'Confirming email...',
				description: 'Please wait, don\'t close this page...',
			};
		}

		return {
			title: 'Unknown state',
			description: 'Plz reload page.',
		};
	});

	const stopVerifiedRedirect = () => {
		window.clearTimeout(guardTimeout);
		window.clearInterval(redirectInterval);

		guardTimeout = undefined;
		redirectInterval = undefined;
	};

	const startVerifiedRedirect = (): Promise<void> => {
		stopVerifiedRedirect();

		return new Promise((res, rej) => {

			guardTimeout = window.setTimeout(() => {
				stopVerifiedRedirect();
				rej('Exceeded the allowed limit');
			}, 60_000);

			redirectInterval = window.setInterval(() => {
				secondsLeft.value -= 1;

				if (secondsLeft.value <= 0) {
					res();
				}
			}, 1000);
		});
	};

	onUnmounted(() => {
		stopVerifiedRedirect();
	});

	return {
		renderResult,
		startVerifiedRedirect,
		stopVerifiedRedirect,
	};
};

