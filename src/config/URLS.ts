// Auth
export const GOOGLE_LOGIN = () => `/oauth2/authorization/google`;
export const LOGOUT = () => `/auth/logout`;
export const LOGIN = () => `/auth/login`;

export const REGISTER = () => `/auth/register`;

export const ME = () => `/auth/me`;

// Courses
export const COURSES = () => `/courses`;
export const ENROLLED_COURSES = () => `/courses/enrolled`;
export const COURSE = (uuid: string) => `/courses/${uuid}`;
export const COURSE_SIGNUP = (uuid: string) => `/courses/${uuid}/sign-up`;
export const COURSE_DROPOUT = (uuid: string) => `/courses/${uuid}/drop-out`;
