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
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../../utils/formatCurrency";
import { addItemToCart, deleteItemFromCart } from "../slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart || cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde Ürün Yok</Alert>;

  return (
    <Box sx={{ p: { xs: 2, md: 0 } }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Görsel</TableCell>
                <TableCell>Ürün</TableCell>
                <TableCell align="right">Fiyat</TableCell>
                <TableCell align="right">Adet</TableCell>
                <TableCell align="right">Toplam Fiyat</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart?.cartItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={`http://localhost:5163/images/${item.imageUrl}`}
                      style={{
                        height: 60,
                        width: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" fontWeight="medium">
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {currencyTRY.format(item.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <LoadingButton
                        size="small"
                        loading={
                          status ===
                          "pendingDeleteItem" + item.productId + "single"
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
                      >
                        <RemoveCircleOutline />
                      </LoadingButton>
                      <Typography
                        variant="body1"
                        sx={{ minWidth: 30, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <LoadingButton
                        size="small"
                        loading={status === "pendingAddItem" + item.productId}
                        onClick={() =>
                          dispatch(addItemToCart({ productId: item.productId }))
                        }
                      >
                        <AddCircleOutline />
                      </LoadingButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="medium">
                      {currencyTRY.format(item.price * item.quantity)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      color="error"
                      size="small"
                      loading={
                        status === "pendingDeleteItem" + item.productId + "all"
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
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {cart?.cartItems.map((item, index) => (
          <Card
            key={item.name}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flexShrink: 0 }}>
                  <img
                    src={`http://localhost:5163/images/${item.imageUrl}`}
                    style={{
                      height: 80,
                      width: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    alt={item.name}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontSize: "1rem" }}>
                    {item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Birim Fiyat: {currencyTRY.format(item.price)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LoadingButton
                        size="small"
                        loading={
                          status ===
                          "pendingDeleteItem" + item.productId + "single"
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
                      >
                        <RemoveCircleOutline />
                      </LoadingButton>
                      <Typography
                        variant="h6"
                        sx={{
                          minWidth: 40,
                          textAlign: "center",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <LoadingButton
                        size="small"
                        loading={status === "pendingAddItem" + item.productId}
                        onClick={() =>
                          dispatch(addItemToCart({ productId: item.productId }))
                        }
                      >
                        <AddCircleOutline />
                      </LoadingButton>
                    </Box>

                    <IconButton
                      color="error"
                      onClick={() =>
                        dispatch(
                          deleteItemFromCart({
                            productId: item.productId,
                            quantity: item.quantity,
                            key: "all",
                          })
                        )
                      }
                      sx={{ p: 1 }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <Divider sx={{ mb: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Toplam:
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {currencyTRY.format(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        <CartSummary />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          px: { xs: 0, md: 0 },
        }}
      >
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            py: 1.5,
            px: 4,
            fontSize: { xs: "1rem", md: "0.875rem" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Ödeme Yap
        </Button>
      </Box>
    </Box>
  );
}
