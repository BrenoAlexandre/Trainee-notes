/**
 * @description
 * Retorna o token setado no localStorage.
 * @param {String} key
 * @return {String} Bearer eyJhbGciOiJIUzI1NiIsInR
 */

const getTokenStorage = (key = ''): string => {
  const token = localStorage.getItem(key);
  return token ? token : '';
};

export default getTokenStorage;
