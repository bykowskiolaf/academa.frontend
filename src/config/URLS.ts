// Auth
export const GOOGLE_LOGIN = () => `/oauth2/authorization/google`;
export const LOGOUT = () => `/auth/logout`;
export const LOGIN = () => `/auth/login`;

export const REGISTER = () => `/auth/register`;

export const ME = () => `/auth/me`;

// Courses
export const COURSES = () => `/courses`;
export const COURSE = (uuid: string) => `/courses/${uuid}`;
