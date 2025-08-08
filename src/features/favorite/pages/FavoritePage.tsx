import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  selectAllFavorities,
  fetchFavorities,
  deleteFavorities,
} from "../slices/favoriteSlice";

const FavoritePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorities = useAppSelector(selectAllFavorities);

  useEffect(() => {
    dispatch(fetchFavorities());
  }, []);

  const handleRemoveFavorite = (id: number) => {
    dispatch(deleteFavorities(id));
  };

  if (favorities.length === 0) return <p>Favori Ürün Yok</p>;
  return (
    <>
      <div>
        <h2>Favori Ürünlerim</h2>
        <ul>
          {favorities.map((fav) => (
            <li key={fav.id}>
              <span>Ürün ID: {fav.productId} </span>
              <button onClick={() => handleRemoveFavorite(fav.id)}>
                Kaldır
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavoritePage;
