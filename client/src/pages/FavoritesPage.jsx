import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getFavoritesList } from "../store/favorite";
import { getProductsList } from "../store/products";

const FavoritePage = () => {
  const favorites = useSelector(getFavoritesList());
  const products = useSelector(getProductsList());
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const list = favorites.map(
      (i) => products.filter((prod) => prod._id === i.product_id)[0]
    );
    setFavoriteProducts(list);
  }, [favorites]);

  return (
    <div className="m-auto pt-28">
      <div className="mt-5 flex flex-wrap justify-center">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((items, index) => {
            console.log(index);
            console.log(items[0]);
            return (
              <ProductCard
                key={items._id}
                quantityByRow="4"
                {...items}
                link={`../../products/${items.type_id}/`}
              />
            );
          })
        ) : (
          <div className="text-3xl text-center">Здесь пока пусто</div>
        )}
      </div>
    </div>
  );
};
export default FavoritePage;
