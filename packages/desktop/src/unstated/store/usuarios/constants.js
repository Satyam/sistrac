export const NAME = 'usuarios';

export const STATUS_INITIAL = 0;
export const STATUS_UNAUTHORIZED = 1;
export const STATUS_LOGGED_IN = 2;
export const STATUS_GETTING_CURRENT_USER = 3;
export const STATUS_LOGGED_OUT = 4;

export type StatusUsuario = 0 | 1 | 2 | 3 | 4;
