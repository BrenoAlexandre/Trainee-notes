/**
 * @description
 * Define o token no localStorage.
 * @param {String} key
 * @param {String} token
 * @return {String} Bearer eyJhbGciOiJIUzI1NiIsInR
 */

const setTokenStorage = (key = '', token = ''): string => {
  localStorage.setItem(key, token);
  return `Bearer ${token}`;
};

export default setTokenStorage;
