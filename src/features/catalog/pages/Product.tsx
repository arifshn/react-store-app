import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Search,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { addItemToCart } from "../../cart/slices/cartSlice";
import {
  selectAllFavorities,
  deleteFavorities,
  createFavorities,
} from "../../favorite/slices/favoriteSlice";
import type { IProduct } from "../models/IProduct";
import { currencyTRY } from "../../../utils/formatCurrency";

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { status, cart } = useAppSelector((state) => state.cart);
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

  const existingItem = cart?.cartItems.find(
    (item) => item.productId === product.id
  );
  const existingQuantity = existingItem ? existingItem.quantity : 0;

  const isDisabled = existingQuantity >= product.stock;

  return (
    <Card
      sx={{
        borderRadius: isMobile ? 2 : 3,
        boxShadow: isMobile
          ? "0 2px 8px rgba(0,0,0,0.08)"
          : "0 8px 16px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          transform: isMobile ? "none" : "translateY(-5px)",
          boxShadow: isMobile
            ? "0 4px 12px rgba(0,0,0,0.12)"
            : "0 12px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <IconButton
        aria-label="favorite"
        onClick={handleFavoriteToggle}
        color={isFavorited ? "error" : "default"}
        sx={{
          position: "absolute",
          top: isMobile ? 4 : 8,
          right: isMobile ? 4 : 8,
          zIndex: 1,
          bgcolor: "background.paper",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: isMobile ? 28 : 36,
          height: isMobile ? 28 : 36,
          "&:hover": {
            bgcolor: alpha(theme.palette.error.main, 0.1),
          },
        }}
      >
        {isFavorited ? (
          <Favorite sx={{ fontSize: isMobile ? 16 : 20 }} />
        ) : (
          <FavoriteBorder sx={{ fontSize: isMobile ? 16 : 20 }} />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height={isMobile ? 140 : isTablet ? 160 : 200}
        image={`http://localhost:5163/images/${product.imageUrl}`}
        alt={product.name}
        sx={{
          objectFit: "contain",
          p: isMobile ? 1 : 2,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = `/catalog/${product.id}`)}
      />

      <CardContent
        sx={{
          pb: isMobile ? 1 : 1,
          pt: isMobile ? 1 : 2,
          px: isMobile ? 1.5 : 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant={isMobile ? "body2" : "h6"}
          component="h3"
          fontWeight={isMobile ? 500 : "bold"}
          sx={{
            fontSize: isMobile ? "0.875rem" : "1.25rem",
            lineHeight: isMobile ? 1.3 : 1.4,
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 2 : 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: isMobile ? 0.5 : 1,
            minHeight: isMobile ? "2.3em" : "auto",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant={isMobile ? "h6" : "h5"}
          color="primary.main"
          fontWeight="bold"
          sx={{
            fontSize: isMobile ? "1.1rem" : "1.5rem",
            mt: "auto",
          }}
        >
          {currencyTRY.format(product.price)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: isMobile ? 1.5 : 2,
          pt: 0,
          gap: isMobile ? 0.5 : 1,
        }}
      >
        <LoadingButton
          loading={status === "pendingAddItem" + product.id}
          variant="contained"
          size={isMobile ? "small" : "medium"}
          startIcon={isMobile ? undefined : <AddShoppingCart />}
          onClick={() =>
            dispatch(
              addItemToCart({ productId: product.id, stock: product.stock })
            )
          }
          sx={{
            flexGrow: 1,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            py: isMobile ? 0.75 : 1,
            borderRadius: isMobile ? 1.5 : 2,
            fontWeight: 600,
          }}
          disabled={isDisabled}
        >
          {isMobile
            ? isDisabled
              ? "Stok Yok"
              : "Sepete Ekle"
            : isDisabled
            ? "Stok Yetersiz"
            : "Sepete Ekle"}
        </LoadingButton>

        <IconButton
          aria-label="view details"
          component={Link}
          href={`/catalog/${product.id}`}
          size={isMobile ? "small" : "medium"}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <Search sx={{ fontSize: isMobile ? 16 : 20 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
