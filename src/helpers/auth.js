const TOKEN_KEY = 'JWT_TOKEN';

export const isLogin = () => !!localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export const getToken = () => localStorage.getItem(TOKEN_KEY);