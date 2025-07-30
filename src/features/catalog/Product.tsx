import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import type { IProduct } from "../../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import { addItemToCart } from "../cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5163/images/${product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text.secondary.dark"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {(product.price / 100).toFixed(2)} $
        </Typography>
        <CardActions>
          <LoadingButton
            loading={status === "pendingAddItem" + product.id}
            size="small"
            loadingPosition="start"
            variant="outlined"
            startIcon={<AddShoppingCart />}
            onClick={() => dispatch(addItemToCart({ productId: product.id }))}
          >
            Sepete Ekle
          </LoadingButton>

          <Button
            component={Link}
            href={`/catalog/${product.id}`}
            variant="outlined"
            startIcon={<SearchIcon />}
            size="small"
            color="warning"
          >
            İncele
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
