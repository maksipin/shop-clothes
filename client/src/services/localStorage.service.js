const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const FAVORITE = "favorite";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function getFavoritesFromLocalStorage() {
  return JSON.parse(localStorage.getItem(FAVORITE));
}
export function addFavoritesToLocalStorage(product_id) {
  let favorites = JSON.parse(localStorage.getItem(FAVORITE));
  if (favorites) favorites.push(product_id);
  else favorites = [product_id];
  localStorage.setItem(FAVORITE, JSON.stringify(favorites));
}
export function removeFavoritesFromLocalStorage() {
  return localStorage.removeItem(FAVORITE);
}
export function removeFavoritesByProductIdFromLocalStorage(product_id) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE));
  const updateFavorites = favorites.filter(
    (item) => item.product_id !== product_id
  );
  localStorage.setItem(FAVORITE, JSON.stringify(updateFavorites));
}
export function getIsFavoriteProductIdFromLocalStorage(product_id) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITE));
  return favorites.find(product_id);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  removeFavoritesFromLocalStorage,
  removeFavoritesByProductIdFromLocalStorage,
  addFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  getIsFavoriteProductIdFromLocalStorage,
};
export default localStorageService;
