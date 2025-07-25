import { TableCell, TableRow } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";

export default function CartSummary() {
  const { cart } = useAppSelector((state) => state.cart);
  const subTotal =
    cart?.cartItems.reduce(
      (toplam, item) => toplam + item.quantity * item.price,
      0
    ) ?? 0;
  const tax = subTotal * 0.2;
  const total = subTotal + tax;
  return (
    <>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Ara Toplam
        </TableCell>
        <TableCell align="center">{subTotal}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Vergi (%20)
        </TableCell>
        <TableCell align="center">{tax}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Toplam
        </TableCell>
        <TableCell align="center">{total}</TableCell>
      </TableRow>
    </>
  );
}
