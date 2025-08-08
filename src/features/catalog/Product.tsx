import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import type { IProduct } from "../../model/IProduct";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Search,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  createFavorities,
  deleteFavorities,
  selectAllFavorities,
} from "../favorite/favoriteSlice";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const favorities = useAppSelector(selectAllFavorities);
  const isFavorited = favorities.some((fav) => fav.productId === product.id);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      const favToRemove = favorities.find(
        (fav) => fav.productId === product.id
      );
      if (favToRemove) dispatch(deleteFavorities(favToRemove.id));
    } else {
      dispatch(createFavorities({ productId: product.id }));
    }
  };
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:5163/images/${product.imageUrl}`}
        alt={product.name}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent sx={{ pb: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          fontWeight="bold"
          noWrap
        >
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary.dark" fontWeight="bold">
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
        <LoadingButton
          loading={status === "pendingAddItem" + product.id}
          variant="contained"
          size="medium"
          startIcon={<AddShoppingCart />}
          onClick={() => dispatch(addItemToCart({ productId: product.id }))}
          sx={{ flexGrow: 1, mr: 1 }}
        >
          Sepete Ekle
        </LoadingButton>

        <IconButton
          aria-label="favorite"
          onClick={handleFavoriteToggle}
          color={isFavorited ? "error" : "default"}
          sx={{ transition: "color 0.2s, transform 0.2s" }}
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>

        <IconButton
          aria-label="view details"
          component={Link}
          href={`/catalog/${product.id}`}
        >
          <Search />
        </IconButton>
      </CardActions>
    </Card>
  );
}
