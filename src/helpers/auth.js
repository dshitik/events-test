const TOKEN_KEY = 'JWT_TOKEN';
export const DEFAULT_TOKEN = '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b';

export const isLogin = () => !!localStorage.getItem(TOKEN_KEY);

export const login = (token = DEFAULT_TOKEN) => localStorage.setItem(TOKEN_KEY, token);

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export const getToken = () =>  localStorage.getItem(TOKEN_KEY);