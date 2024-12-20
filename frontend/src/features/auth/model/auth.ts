const LC_AUTH_KEY = 'auth:authorization_key';

export const getAuthToken = (): string => {
	return localStorage.getItem(LC_AUTH_KEY) ?? '';
};

export const setAuthToken = (token: string) => {
	localStorage.setItem(LC_AUTH_KEY, token);
};

export const resetAuthToken = () => {
	localStorage.removeItem(LC_AUTH_KEY);
}


