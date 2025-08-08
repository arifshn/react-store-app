import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchOrders, selectAllOrder } from "../../orders/slices/orderSlice";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Order } from "../../orders/models/IOrder";
import { Paper } from "@mui/material";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrder);
  const isLoaded = useAppSelector((state) => state.order.isLoaded);
  const status = useAppSelector((state) => state.order.status);

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isLoaded]);

  const columns: GridColDef<Order>[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "orderDate", headerName: "Sipariş Tarihi", width: 200 },
    { field: "fistName", headerName: "Adı", width: 200 },
    { field: "lastName", headerName: "Soyadı", width: 200 },
    { field: "phone", headerName: "Telefon", width: 200 },
    { field: "city", headerName: "Şehir", width: 200 },
    { field: "addresLine", headerName: "Adres", width: 200 },
    { field: "orderStatus", headerName: "Sipariş Durumu", width: 200 },
    { field: "subTotal", headerName: "Toplam Tutar", width: 200 },
  ];

  const validOrder = orders.filter(
    (order) => order.id !== null && order.id !== undefined
  );
  return (
    <>
      <Paper style={{ height: 600, width: "100%", padding: 16 }}>
        <h2>Siparişler Listesi</h2>
        <DataGrid
          rows={validOrder}
          columns={columns}
          loading={status === "pendingFetchOrders"}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={{ pageSize: 10, page: 0 }}
        ></DataGrid>
      </Paper>
    </>
  );
}
