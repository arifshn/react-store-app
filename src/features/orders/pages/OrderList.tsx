import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
  Box,
  Chip,
  Avatar,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Order } from "../models/IOrder";
import { currencyTRY } from "../../../utils/formatCurrency";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ordersApi } from "../api/ordersApi";

const orderStatus = ["Pending", "Approved", "PaymentFailed", "Completed"];

const statusColors = {
  0: { color: "warning", label: "Beklemede" },
  1: { color: "success", label: "Onaylandı" },
  2: { color: "error", label: "Ödeme Başarısız" },
  3: { color: "info", label: "Tamamlandı" },
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const subTotal =
    selectedOrder?.orderItems.reduce(
      (toplam, item) => toplam + item.quantity * item.price,
      0
    ) ?? 0;
  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  function handleDialogOpen(order: Order) {
    setOpen(true);
    setSelectedOrder(order);
  }

  function handleDialogClose() {
    setOpen(false);
    setSelectedOrder(null);
  }

  useEffect(() => {
    setLoading(true);
    ordersApi
      .getOrders()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Siparişlerim
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {orders?.length || 0} sipariş bulundu
        </Typography>
      </Box>

      {/* --- Masaüstü Görünümü --- */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[2],
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "grey.50" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Sipariş No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Durum</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tarih</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Toplam</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": { bgcolor: "grey.50", transition: "all 0.2s" },
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: "primary.light" }}
                      >
                        <ShoppingBagIcon fontSize="small" />
                      </Avatar>
                      <Typography fontWeight="medium">#{order.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        statusColors[
                          order.orderStatus as keyof typeof statusColors
                        ].label
                      }
                      color={
                        statusColors[
                          order.orderStatus as keyof typeof statusColors
                        ].color as any
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        {new Date(order.orderDate).toLocaleDateString("tr-TR")}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" color="success.main">
                      {currencyTRY.format(order.subTotal)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<ArrowRightIcon />}
                      onClick={() => handleDialogOpen(order)}
                      sx={{ borderRadius: 2 }}
                    >
                      Detaylar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* --- Mobil Görünümü --- */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {orders?.map((order) => (
          <Card
            key={order.id}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: (theme) => theme.shadows[2],
              "&:hover": {
                boxShadow: (theme) => theme.shadows[4],
                transition: "box-shadow 0.2s",
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: "primary.light" }}
                  >
                    <ShoppingBagIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Sipariş #{order.id}
                  </Typography>
                </Box>
                <Chip
                  label={
                    statusColors[order.orderStatus as keyof typeof statusColors]
                      .label
                  }
                  color={
                    statusColors[order.orderStatus as keyof typeof statusColors]
                      .color as any
                  }
                  size="small"
                  variant="outlined"
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Tutar
                  </Typography>
                  <Typography fontWeight="bold" color="success.main">
                    {currencyTRY.format(order.subTotal)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ArrowRightIcon />}
                  onClick={() => handleDialogOpen(order)}
                  sx={{ borderRadius: 2 }}
                >
                  Detaylar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* --- Sipariş Detayları Dialog'u --- */}
      <Dialog
        onClose={handleDialogClose}
        open={open}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: 2,
            m: { xs: 1, md: 4 },
            maxHeight: { xs: "95vh", md: "unset" },
          },
        }}
      >
        <DialogTitle sx={{ p: { xs: 2, md: 3 }, pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <ShoppingBagIcon color="primary" />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Sipariş Detayları - #{selectedOrder?.id}
            </Typography>
          </Box>
        </DialogTitle>
        <IconButton
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: { xs: 8, md: 16 },
            top: { xs: 8, md: 16 },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mb: 3,
            }}
          >
            {/* Teslimat Bilgileri */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOnIcon color="primary" />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                    >
                      Teslimat Bilgileri
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography
                      sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                    >
                      {selectedOrder?.fistName} {selectedOrder?.lastName}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography
                      sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                    >
                      {selectedOrder?.phone}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography
                      sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                    >
                      {selectedOrder?.city}
                    </Typography>
                  </Box>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1, fontSize: { xs: "0.8rem", md: "0.9rem" } }}
                  >
                    {selectedOrder?.addresLine}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Sipariş Özeti */}
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Sipariş Özeti
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="text.secondary">Ara Toplam:</Typography>
                    <Typography fontWeight="medium">
                      {currencyTRY.format(subTotal)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography color="text.secondary">Vergi (20%):</Typography>
                    <Typography fontWeight="medium">
                      {currencyTRY.format(tax)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold">
                      Toplam:
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {currencyTRY.format(total)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          {/* Ürün Listesi */}
          <Box sx={{ overflowX: "auto" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Sipariş Edilen Ürünler
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: { xs: 550, md: "auto" } }}>
                <TableHead sx={{ bgcolor: "grey.50" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Ürün</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Ad</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Fiyat
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Adet
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Toplam
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder?.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={`http://localhost:5163/images/${item.productImage}`}
                          alt={item.productName}
                          style={{
                            height: 60,
                            width: 60,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="medium">
                          {item.productName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="success.main" fontWeight="medium">
                          {currencyTRY.format(item.price)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={item.quantity}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="bold">
                          {currencyTRY.format(item.price * item.quantity)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, md: 3 } }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
