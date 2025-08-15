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
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart || cart.cartItems.length === 0) {
    return <Alert severity="warning">Sepetinizde Ürün Yok</Alert>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 0 } }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="cart table">
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
            {cart.cartItems.map((item) => {
              const isAddDisabled = item.quantity >= item.stock;

              return (
                <TableRow key={item.productId}>
                  <TableCell>
                    <img
                      src={`http://localhost:5163/images/${item.imageUrl}`}
                      alt={item.name}
                      style={{
                        height: 60,
                        width: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">
                    {currencyTRY.format(item.price)}
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
                        onClick={() => {
                          if (item.quantity == item.stock) {
                            toast.error("Maksimum ürün adedine ulaştınız!");
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
                      >
                        <AddCircleOutline />
                      </LoadingButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {currencyTRY.format(item.price * item.quantity)}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <CartSummary />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          size="large"
          sx={{ py: 1.5, px: 4 }}
        >
          Ödeme Yap
        </Button>
      </Box>
    </Box>
  );
}
