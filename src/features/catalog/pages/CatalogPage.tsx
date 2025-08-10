import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import ProductList from "./ProductList";
import { selectAllProducts, fetchProducts } from "../slices/catalogSlice";
import { fetchFavorities } from "../../favorite/slices/favoriteSlice";

export default function CatalogPage() {
  const products = useAppSelector(selectAllProducts);
  const { status, isLoaded } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) dispatch(fetchProducts());
    dispatch(fetchFavorities());
  }, [isLoaded]);

  if (status === "pendingFetchProducts") return <CircularProgress />;

  return <ProductList products={products} />;
}
