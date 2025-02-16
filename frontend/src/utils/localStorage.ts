import { UserType } from './types';

export const addUserToLocalStorage = (user: UserType) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};
