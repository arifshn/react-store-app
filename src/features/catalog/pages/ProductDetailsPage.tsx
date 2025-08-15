import {
  Box,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Fade,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";

import { LoadingButton } from "@mui/lab";
import {
  AddShoppingCart,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  CheckCircle,
} from "@mui/icons-material";
import NotFound from "../../../errors/NotFound";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { addItemToCart } from "../../cart/slices/cartSlice";
import { selectProductById, fetchProductsById } from "../slices/catalogSlice";
import ProductReview from "../../review/pages/ProductReview";
import { toast } from "react-toastify";

export default function ProductDetailsPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    selectProductById(state, Number(id))
  );
  const { status: loading } = useAppSelector((state) => state.catalog);

  const item = cart?.cartItems.find((i) => i.productId == product?.id);

  useEffect(() => {
    if (!product && id) dispatch(fetchProductsById(parseInt(id)));
  }, [id]);

  if (loading === "pendingFetchProductById") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  if (!product) return <NotFound />;
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in={true} timeout={800}>
          <Grid container spacing={4}>
            <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(255,255,255,0.1)"
                      : "0 8px 32px rgba(0,0,0,0.12)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 12px 48px rgba(255,255,255,0.15)"
                        : "0 12px 48px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:5163/images/${product.imageUrl}`}
                  alt={product.name}
                  sx={{
                    height: { xs: 300, sm: 400, md: 500 },
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Grid>

            <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)"
                          : "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <FavoriteBorder />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Stack>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                    }}
                  >
                    ${(product.price / 100).toFixed(2)}
                  </Typography>
                  <Chip
                    label={product.stock > 0 ? "Stokta" : "Stokta Yok"}
                    color={product.stock > 0 ? "success" : "error"}
                    icon={<CheckCircle />}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Ürün Özellikleri
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow sx={{ "&:last-child td": { border: 0 } }}>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "text.secondary",
                              border: 0,
                              py: 1,
                            }}
                          >
                            Ürün Adı
                          </TableCell>
                          <TableCell sx={{ border: 0, py: 1 }}>
                            {product.name}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ "&:last-child td": { border: 0 } }}>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: "text.secondary",
                              border: 0,
                              py: 1,
                            }}
                          >
                            Fiyat
                          </TableCell>
                          <TableCell sx={{ border: 0, py: 1 }}>
                            ${(product.price / 100).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Stack direction="row" spacing={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      flex: 1,
                      textAlign: "center",
                      bgcolor: "action.hover",
                      borderRadius: 2,
                    }}
                  >
                    <LocalShipping
                      color="primary"
                      sx={{ fontSize: 32, mb: 1 }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      fontWeight={600}
                    >
                      Ücretsiz Kargo
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      flex: 1,
                      textAlign: "center",
                      bgcolor: "action.hover",
                      borderRadius: 2,
                    }}
                  >
                    <Security color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography
                      variant="caption"
                      display="block"
                      fontWeight={600}
                    >
                      Güvenli Alışveriş
                    </Typography>
                  </Paper>
                </Stack>
                <Stack spacing={2}>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    loadingPosition="start"
                    startIcon={<AddShoppingCart />}
                    loading={status === "pendingAddItem" + product.id}
                    onClick={() => {
                      if ((item?.quantity ?? 0) >= product.stock) {
                        toast.error("Ürün Stokta Bulunmuyor");
                        return;
                      }
                      dispatch(
                        addItemToCart({
                          productId: product.id,
                          stock: product.stock,
                        })
                      );
                    }}
                    disabled={item?.quantity! >= product.stock}
                    sx={{
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      background:
                        "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                      boxShadow: "0 4px 20px rgba(25, 118, 210, 0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                        boxShadow: "0 6px 24px rgba(25, 118, 210, 0.5)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Sepete Ekle
                  </LoadingButton>

                  {item?.quantity! > 0 && (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: "success.main",
                        color: "success.contrastText",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        <CheckCircle sx={{ mr: 1, verticalAlign: "middle" }} />
                        Sepetinizde {item?.quantity} adet ürün bulunuyor
                      </Typography>
                    </Paper>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <ProductReview productId={product.id} reviewId={null} />
    </>
  );
}
