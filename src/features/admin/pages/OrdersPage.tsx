import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchOrders, selectAllOrder } from "../../orders/slices/orderSlice";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const columns: GridColDef[] = [
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
    <Box sx={{ width: "100%", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Siparişler Listesi
        </Typography>
      </Paper>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Paper
          elevation={2}
          sx={{
            height: "calc(100vh - 200px)",
            borderRadius: 2,
          }}
        >
          <DataGrid
            rows={validOrder}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={{ pageSize: 10, page: 0 }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontSize: "1rem",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
          />
        </Paper>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {validOrder.map((order) => (
          <Accordion
            key={order.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 1,
              "&.Mui-expanded": {
                boxShadow: 3,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${order.id}-content`}
              id={`panel-${order.id}-header`}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Sipariş No: #{order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "grid",
                  gap: 1,
                  textAlign: "left",
                  p: 1,
                }}
              >
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Müşteri:
                  </Box>{" "}
                  {order.fistName} {order.lastName}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Telefon:
                  </Box>{" "}
                  {order.phone}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Şehir:
                  </Box>{" "}
                  {order.city}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Adres:
                  </Box>{" "}
                  {order.addresLine}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Durum:
                  </Box>{" "}
                  {order.orderStatus}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Toplam Tutar: {order.subTotal}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
