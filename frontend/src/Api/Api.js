// api.js
export const BASE_URL = 'http://localhost:4067';

export const API_LOGIN = `${BASE_URL}/auth/login`;
export const API_REGISTER = `${BASE_URL}/auth/register`;
export const API_LOGOUT_ALL = `${BASE_URL}/auth/logoutAll`;
export const GET_API_TODOS = `${BASE_URL}/todo/todos`;
export const CREATE_API_TODOS = `${BASE_URL}/todo/create`;
export const DEL_API_TODOS = `${BASE_URL}/todo/delete`;
export const UPDATE_API_TODOS = `${BASE_URL}/todo/update`;
