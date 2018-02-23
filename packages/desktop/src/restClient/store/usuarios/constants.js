export const NAME = 'usuarios';

export const GET_USUARIOS = `${NAME} / get usuarios`;

export const GET_USUARIO = `${NAME} / get usuario`;
export const UPDATE_USUARIO = `${NAME} / update usuario`;
export const CREATE_USUARIO = `${NAME} / create usuario`;
export const DELETE_USUARIO = `${NAME} / delete usuario`;

export const LOGIN = `${NAME} / login`;
export const GET_USUARIO_ACTUAL = `${NAME} / get usuario actual`;
export const LOGOUT = `${NAME} / logout`;

export const STATUS_INITIAL = 0;
export const STATUS_UNAUTHORIZED = 1;
export const STATUS_LOGGED_IN = 2;
export const STATUS_GETTING_CURRENT_USER = 3;
export const STATUS_LOGGED_OUT = 4;
