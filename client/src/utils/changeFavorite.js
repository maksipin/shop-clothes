import {
  addFavoritesToLocalStorage,
  getUserId,
  removeFavoritesByProductIdFromLocalStorage,
} from "../services/localStorage.service";
import {
  addFavoritesById,
  loadFavoritesList,
  removeFavoritesById,
} from "../store/favorite";

const userId = getUserId();

export const onChangeFavorite = (id, dispatch, favorite) => {
  if (userId) {
    if (favorite) dispatch(removeFavoritesById(favorite._id));
    else dispatch(addFavoritesById({ user_id: userId, product_id: id }));
  } else {
    if (favorite) removeFavoritesByProductIdFromLocalStorage(id);
    else addFavoritesToLocalStorage({ product_id: id });
    dispatch(loadFavoritesList());
  }
};
