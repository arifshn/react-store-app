import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Skeleton,
  IconButton,
  Chip,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import {
  fetchProducts,
  selectAllProducts,
} from "../../catalog/slices/catalogSlice";
import {
  deleteFavorities,
  fetchFavorities,
  selectAllFavorities,
} from "../../favorite/slices/favoriteSlice";

const FavoritePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const favorities = useAppSelector(selectAllFavorities);
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchFavorities());
    dispatch(fetchProducts());
  }, []);

  const handleRemoveFavorite = (id: number) => {
    dispatch(deleteFavorities(id));
  };

  if (favorities.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Favori Ürünlerim
        </Typography>

        <Card sx={{ mt: 4, textAlign: "center", py: 8 }}>
          <CardContent>
            <FavoriteBorderIcon
              sx={{ fontSize: 80, color: "grey.400", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom color="text.secondary">
              Henüz favori ürününüz yok
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Beğendiğiniz ürünleri favorilere ekleyerek kolayca erişebilirsiniz
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Favori Ürünlerim
        </Typography>
        <Chip
          label={`${favorities.length} ürün`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {favorities.map((fav) => {
          const product = products.find((p) => p.id === fav.productId);

          if (!product) {
            return (
              <Box key={fav.id}>
                <Card sx={{ height: "100%" }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" height={24} width="60%" />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width="100%" height={36} />
                  </CardActions>
                </Card>
              </Box>
            );
          }

          return (
            <Box key={fav.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
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
                      onClick={() =>
                        (window.location.href = `/catalog/${product.id}`)
                      }
                    />
                  </Typography>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "background.paper",
                      "&:hover": { bgcolor: "background.paper" },
                    }}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="h5"
                    color="success.main"
                    fontWeight="bold"
                  >
                    {product.price} TL
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveFavorite(fav.id)}
                    sx={{ borderRadius: 2 }}
                  >
                    Kaldır
                  </Button>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default FavoritePage;
