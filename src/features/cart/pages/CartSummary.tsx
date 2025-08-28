import { TableCell, TableRow } from "@mui/material";
import { useAppSelector } from "../../../store/store";

export default function CartSummary() {
  const { cart } = useAppSelector((state) => state.cart);
  const subTotal =
    cart?.cartItems.reduce(
      (toplam, item) => toplam + item.quantity * item.price,
      0
    ) ?? 0;

  const deliveryFee = subTotal >= 500 ? 0 : 29.9;
  const total = subTotal + deliveryFee;

  return (
    <>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Ara Toplam
        </TableCell>
        <TableCell align="center">{subTotal.toFixed(2)} ₺</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Kargo Ücreti
        </TableCell>
        <TableCell align="center">
          {deliveryFee === 0 ? "Ücretsiz" : `${deliveryFee.toFixed(2)} ₺`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Toplam
        </TableCell>
        <TableCell align="center">{total.toFixed(2)} ₺</TableCell>
      </TableRow>
    </>
  );
}
