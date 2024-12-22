import { computed, onUnmounted, ref, Ref } from 'vue';
import { ApolloError } from '@apollo/client';

interface RenderConfirmResult {
	title: string,
	description: string,
	highlighted?: string
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

	const isInitVerified = isVerified.value;
	const secondsLeft = ref(seconds);

	const renderResult = computed<RenderConfirmResult>(() => {

		if (isInitVerified) {
			return {
				title: 'Email has been confirmed',
				description: 'You have already confirmed it before',
				cssClass: 'text-green-500',
			};
		}

		if (!code) {
			return {
				title: 'Error confirm email',
				description: 'Code is empty',
				cssClass: 'text-red-400',
			};
		}

		if (isVerified.value) {
			return {
				title: 'Success confirm email',
				description: 'You will be redirected to the main page in',
				highlighted: `${secondsLeft.value} seconds`,
				cssClass: 'text-green-500',
			};
		}

		if (error.value) {
			return {
				title: 'Error confirm email',
				description: String(error.value),
				cssClass: 'text-red-400',
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
			description: 'Plz reload page',
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
					stopVerifiedRedirect();
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

