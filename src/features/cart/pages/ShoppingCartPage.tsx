import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
  ShoppingCartOutlined,
  ArrowBack,
  ShoppingBag,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: isDark ? "grey.900" : "grey.50",
          minHeight: "100vh",
          py: isMobile ? 2 : 4,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            spacing={isMobile ? 1.5 : 2}
            mb={isMobile ? 3 : 4}
          >
            <Box
              sx={{
                p: isMobile ? 1 : 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartOutlined
                sx={{
                  fontSize: isMobile ? 24 : 28,
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
            <Stack spacing={0.5}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: isMobile
                    ? "1.5rem"
                    : { xs: "1.75rem", sm: "2.125rem" },
                  lineHeight: 1.2,
                }}
              >
                Sepetim
              </Typography>
              {!isMobile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Alışveriş sepetinizdeki ürünler
                </Typography>
              )}
            </Stack>
          </Stack>
          <Fade in timeout={500}>
            <Card
              sx={{
                p: isMobile ? 4 : 8,
                textAlign: "center",
                bgcolor: isDark ? "grey.800" : "background.paper",
                borderRadius: isMobile ? 3 : 4,
                border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                boxShadow: isDark ? "none" : theme.shadows[2],
                mx: isMobile ? 1 : 0,
              }}
            >
              <CardContent
                sx={{
                  p: isMobile ? 2 : 3,
                  "&:last-child": { pb: isMobile ? 2 : 3 },
                }}
              >
                <Box
                  sx={{
                    mb: isMobile ? 3 : 4,
                    display: "inline-flex",
                    p: isMobile ? 3 : 4,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                  }}
                >
                  <ShoppingBag
                    sx={{
                      fontSize: isMobile ? 48 : 64,
                      color: "warning.main",
                    }}
                  />
                </Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: isMobile ? 2 : 3,
                  }}
                >
                  Sepetiniz Boş
                </Typography>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  color="text.secondary"
                  sx={{
                    maxWidth: 400,
                    mx: "auto",
                    lineHeight: 1.6,
                    mb: isMobile ? 3 : 4,
                  }}
                >
                  Henüz sepetinizde ürün bulunmuyor. Alışverişe başlamak için
                  ürün kataloğumuzu inceleyebilirsiniz.
                </Typography>
                <Button
                  component={Link}
                  to="/catalog"
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  startIcon={<ArrowBack />}
                  sx={{
                    py: isMobile ? 1.5 : 2,
                    px: isMobile ? 3 : 4,
                    borderRadius: isMobile ? 2 : 3,
                    fontWeight: 600,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                  }}
                >
                  Alışverişe Başla
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: isDark ? "grey.900" : "grey.50",
        minHeight: "100vh",
        py: isMobile ? 2 : 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={isMobile ? 3 : 4}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={isMobile ? 1.5 : 2}
          >
            <Box
              sx={{
                p: isMobile ? 1 : 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartOutlined
                sx={{
                  fontSize: isMobile ? 24 : 28,
                  color: theme.palette.primary.main,
                }}
              />
            </Box>
            <Stack spacing={0.5}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: isMobile
                    ? "1.5rem"
                    : { xs: "1.75rem", sm: "2.125rem" },
                  lineHeight: 1.2,
                }}
              >
                Sepetim
              </Typography>
              {!isMobile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {cart.cartItems.length} ürün sepetinizde
                </Typography>
              )}
            </Stack>
          </Stack>

          <Button
            component={Link}
            to="/catalog"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: isMobile ? 2 : 3,
              fontWeight: 600,
            }}
          >
            {isMobile ? "Katalog" : "Kataloğa Dön"}
          </Button>
        </Stack>
        {isMobile && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, mb: 2, px: 1 }}
          >
            {cart.cartItems.length} ürün sepetinizde
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 2 : 3,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box sx={{ flex: 1 }}>
            {isMobile ? (
              <Stack spacing={2}>
                {cart.cartItems.map((item) => {
                  const isAddDisabled = item.quantity >= item.stock;

                  return (
                    <Card
                      key={item.productId}
                      sx={{
                        bgcolor: isDark ? "grey.800" : "background.paper",
                        borderRadius: 3,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.12
                        )}`,
                        boxShadow: isDark ? "none" : theme.shadows[1],
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 2,
                              overflow: "hidden",
                              flexShrink: 0,
                              bgcolor: alpha(theme.palette.grey[500], 0.1),
                            }}
                          >
                            <img
                              src={`http://localhost:5163/images/${item.imageUrl}`}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Stack spacing={1}>
                              <Typography
                                variant="body1"
                                fontWeight={600}
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {item.name}
                              </Typography>

                              <Typography
                                variant="h6"
                                color="primary.main"
                                fontWeight="bold"
                              >
                                {currencyTRY.format(item.price)}
                              </Typography>
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  <LoadingButton
                                    size="small"
                                    loading={
                                      status ===
                                      "pendingDeleteItem" +
                                        item.productId +
                                        "single"
                                    }
                                    onClick={() =>
                                      dispatch(
                                        deleteItemFromCart({
                                          productId: item.productId,
                                          quantity: 1,
                                          key: "single",
                                        })
                                      )
                                    }
                                    sx={{
                                      minWidth: 32,
                                      width: 32,
                                      height: 32,
                                      p: 0,
                                      borderRadius: 2,
                                      bgcolor: alpha(
                                        theme.palette.grey[500],
                                        0.1
                                      ),
                                    }}
                                  >
                                    <RemoveCircleOutline fontSize="small" />
                                  </LoadingButton>

                                  <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    sx={{
                                      minWidth: 40,
                                      textAlign: "center",
                                      bgcolor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                      ),
                                      py: 0.5,
                                      borderRadius: 1,
                                    }}
                                  >
                                    {item.quantity}
                                  </Typography>

                                  <LoadingButton
                                    size="small"
                                    loading={
                                      status ===
                                      "pendingAddItem" + item.productId
                                    }
                                    onClick={() => {
                                      if (item.quantity == item.stock) {
                                        toast.error(
                                          "Maksimum ürün adedine ulaştınız!"
                                        );
                                        return;
                                      }
                                      dispatch(
                                        addItemToCart({
                                          productId: item.productId,
                                          stock: item.stock,
                                        })
                                      );
                                    }}
                                    disabled={isAddDisabled}
                                    sx={{
                                      minWidth: 32,
                                      width: 32,
                                      height: 32,
                                      p: 0,
                                      borderRadius: 2,
                                      bgcolor: isAddDisabled
                                        ? alpha(theme.palette.grey[500], 0.1)
                                        : alpha(
                                            theme.palette.primary.main,
                                            0.1
                                          ),
                                    }}
                                  >
                                    <AddCircleOutline fontSize="small" />
                                  </LoadingButton>
                                </Stack>

                                <LoadingButton
                                  color="error"
                                  size="small"
                                  loading={
                                    status ===
                                    "pendingDeleteItem" + item.productId + "all"
                                  }
                                  onClick={() =>
                                    dispatch(
                                      deleteItemFromCart({
                                        productId: item.productId,
                                        quantity: item.quantity,
                                        key: "all",
                                      })
                                    )
                                  }
                                  sx={{
                                    minWidth: 32,
                                    width: 32,
                                    height: 32,
                                    p: 0,
                                    borderRadius: 2,
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </LoadingButton>
                              </Stack>

                              <Divider sx={{ my: 1 }} />

                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Toplam:
                                </Typography>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  color="primary.main"
                                >
                                  {currencyTRY.format(
                                    item.price * item.quantity
                                  )}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: 3,
                  boxShadow: isDark ? "none" : theme.shadows[2],
                  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="cart table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Görsel</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Ürün</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Fiyat
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Adet
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Toplam
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.cartItems.map((item) => {
                      const isAddDisabled = item.quantity >= item.stock;

                      return (
                        <TableRow
                          key={item.productId}
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.02),
                            },
                          }}
                        >
                          <TableCell>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 2,
                                overflow: "hidden",
                                bgcolor: alpha(theme.palette.grey[500], 0.1),
                              }}
                            >
                              <img
                                src={`http://localhost:5163/images/${item.imageUrl}`}
                                alt={item.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" fontWeight={500}>
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="primary.main"
                            >
                              {currencyTRY.format(item.price)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="flex-end"
                              spacing={1}
                            >
                              <LoadingButton
                                size="small"
                                loading={
                                  status ===
                                  "pendingDeleteItem" +
                                    item.productId +
                                    "single"
                                }
                                onClick={() =>
                                  dispatch(
                                    deleteItemFromCart({
                                      productId: item.productId,
                                      quantity: 1,
                                      key: "single",
                                    })
                                  )
                                }
                                sx={{
                                  minWidth: 32,
                                  width: 32,
                                  height: 32,
                                  p: 0,
                                  borderRadius: 2,
                                }}
                              >
                                <RemoveCircleOutline fontSize="small" />
                              </LoadingButton>

                              <Typography
                                variant="body1"
                                fontWeight={600}
                                sx={{
                                  minWidth: 40,
                                  textAlign: "center",
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  py: 0.5,
                                  borderRadius: 1,
                                }}
                              >
                                {item.quantity}
                              </Typography>

                              <LoadingButton
                                size="small"
                                loading={
                                  status === "pendingAddItem" + item.productId
                                }
                                onClick={() => {
                                  if (item.quantity == item.stock) {
                                    toast.error(
                                      "Maksimum ürün adedine ulaştınız!"
                                    );
                                    return;
                                  }
                                  dispatch(
                                    addItemToCart({
                                      productId: item.productId,
                                      stock: item.stock,
                                    })
                                  );
                                }}
                                disabled={isAddDisabled}
                                sx={{
                                  minWidth: 32,
                                  width: 32,
                                  height: 32,
                                  p: 0,
                                  borderRadius: 2,
                                }}
                              >
                                <AddCircleOutline fontSize="small" />
                              </LoadingButton>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="primary.main"
                            >
                              {currencyTRY.format(item.price * item.quantity)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <LoadingButton
                              color="error"
                              size="small"
                              loading={
                                status ===
                                "pendingDeleteItem" + item.productId + "all"
                              }
                              onClick={() =>
                                dispatch(
                                  deleteItemFromCart({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    key: "all",
                                  })
                                )
                              }
                              sx={{
                                minWidth: 32,
                                width: 32,
                                height: 32,
                                p: 0,
                                borderRadius: 2,
                              }}
                            >
                              <Delete fontSize="small" />
                            </LoadingButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
          <Box
            sx={{
              width: isMobile ? "100%" : 350,
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : 24,
              height: "fit-content",
            }}
          >
            <Card
              sx={{
                bgcolor: isDark ? "grey.800" : "background.paper",
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                boxShadow: isDark ? "none" : theme.shadows[2],
              }}
            >
              <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                <CartSummary />

                <Button
                  component={Link}
                  to="/checkout"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: isMobile ? 1.5 : 2,
                    borderRadius: isMobile ? 2 : 3,
                    fontWeight: 600,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                  }}
                >
                  Ödeme Yap (
                  {currencyTRY.format(
                    cart.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                  )
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
