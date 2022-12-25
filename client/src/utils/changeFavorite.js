import {
  addFavoritesToLocalStorage,
  getUserId,
  removeFavoritesByProductIdFromLocalStorage,
} from "../services/localStorage.service";
import {
  addFavoritesById,
  getFavoriteById,
  getIsFavorite,
  loadFavoritesList,
  removeFavoritesById,
} from "../store/favorite";

const userId = getUserId();

export const onChangeFavorite = (id, dispatch, isFavorite, favorite) => {
  if (userId) {
    if (isFavorite) dispatch(removeFavoritesById(favorite._id));
    else dispatch(addFavoritesById({ user_id: userId, product_id: id }));
  } else {
    if (isFavorite) removeFavoritesByProductIdFromLocalStorage(id);
    else addFavoritesToLocalStorage({ product_id: id });
    dispatch(loadFavoritesList());
  }
};
