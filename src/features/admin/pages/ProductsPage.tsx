import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  fetchProducts,
  selectAllProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../catalog/slices/catalogSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
  Chip,
  Skeleton,
  Alert,
  Snackbar,
  Fab,
} from "@mui/material";
import ProductForm from "./ProductForm";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchCategories,
  selectAllCategories,
} from "../../categories/slices/categoriesSlice";
import type { IProduct } from "../../catalog/models/IProduct";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectAllCategories);
  const isLoaded = useAppSelector((state) => state.catalog.isLoaded);
  const status = useAppSelector((state) => state.catalog.status);

  const [openForm, setOpenForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts({ showInactive: true }));
      dispatch(fetchCategories());
    }
  }, [dispatch, isLoaded]);

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRefresh = () => {
    dispatch(fetchProducts({ showInactive: true }));
    showSnackbar("Ürünler yenilendi", "success");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Ürünü silmek istediğinize emin misiniz?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts({ showInactive: true }));
          showSnackbar("Ürün başarıyla silindi", "success");
        })
        .catch(() => {
          showSnackbar("Ürün silinirken hata oluştu", "error");
        });
    }
  };

  const handleOpenCreate = () => {
    setSelectedProductId(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (id: number) => {
    setSelectedProductId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmitForm = (data: any) => {
    const action = selectedProductId
      ? updateProduct(data)
      : createProduct(data);
    const successMessage = selectedProductId
      ? "Ürün başarıyla güncellendi"
      : "Ürün başarıyla eklendi";

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(fetchProducts({ showInactive: true }));
        showSnackbar(successMessage, "success");
      })
      .catch(() => {
        showSnackbar("İşlem sırasında hata oluştu", "error");
      });
    setOpenForm(false);
  };

  const columns: GridColDef<IProduct>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Ürün Adı", width: 200 },
    {
      field: "price",
      headerName: "Fiyat",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium">
          {params.value} TL
        </Typography>
      ),
    },
    { field: "stock", headerName: "Stok", width: 120 },
    { field: "description", headerName: "Açıklama", width: 120 },
    { field: "imageUrl", headerName: "Görsel", width: 120 },
    {
      field: "isActive",
      headerName: "Durum",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Aktif" : "Pasif"}
          size="small"
          color={params.value ? "success" : "error"}
          variant="outlined"
        />
      ),
    },
    {
      field: "category",
      headerName: "Kategori",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value?.kategoriAdi ?? "Kategori yok"}
          size="small"
          variant="outlined"
          color="default"
        />
      ),
    },
    {
      field: "actions",
      headerName: "İşlemler",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => handleOpenEdit(params.row.id)}
          >
            Düzenle
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Sil
          </Button>
        </Box>
      ),
      width: 280,
    },
  ];

  const validProducts = products.filter(
    (product) => product.id !== null && product.id !== undefined
  );

  const isLoading = status === "pendingFetchProducts";

  const MobileSkeleton = () => (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, pb: { xs: 10, md: 2 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              mb: { xs: 0, sm: 0 },
            }}
          >
            Ürün Listesi
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {validProducts.length} ürün bulundu
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isLoading}
            sx={{ minHeight: 48 }}
          >
            Yenile
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
            size="large"
            sx={{ minHeight: 48, minWidth: 160 }}
          >
            Yeni Ürün Ekle
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            display: { xs: "flex", sm: "none" },
            minHeight: 48,
            borderRadius: 2,
            width: "100%",
          }}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Paper
          elevation={2}
          sx={{
            height: 600,
            width: "100%",
            p: 2,
            borderRadius: 2,
          }}
        >
          <DataGrid
            rows={validProducts}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={{ pageSize: 10, page: 0 }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover",
              },
            }}
          />
        </Paper>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {isLoading ? (
          <MobileSkeleton />
        ) : validProducts.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Henüz ürün bulunmuyor
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              İlk ürününüzü ekleyerek başlayabilirsiniz
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{ minHeight: 48, minWidth: 200 }}
            >
              İlk Ürününüzü Ekleyin
            </Button>
          </Box>
        ) : (
          validProducts.map((product) => (
            <Accordion
              key={product.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: 1,
                border: 1,
                borderColor: "divider",
                "&:before": { display: "none" },
                "&.Mui-expanded": {
                  boxShadow: 3,
                  borderColor: "primary.main",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  minHeight: 72,
                  px: 2,
                  py: 1,
                  "&.Mui-expanded": {
                    minHeight: 72,
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                }}
              >
                <Box sx={{ width: "100%", pr: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          lineHeight: 1.2,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        #{product.id} • {product.price} TL
                      </Typography>
                    </Box>
                    <Chip
                      label={product.isActive ? "Aktif" : "Pasif"}
                      size="small"
                      color={product.isActive ? "success" : "error"}
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Stok: <strong>{product.stock}</strong>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.category?.kategoriAdi ?? "Kategori yok"}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <strong>Açıklama:</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: "grey.50",
                        p: 1.5,
                        borderRadius: 1,
                        border: 1,
                        borderColor: "grey.200",
                      }}
                    >
                      {product.description || "Açıklama bulunmuyor"}
                    </Typography>
                  </Box>

                  {product.imageUrl && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        <strong>Görsel:</strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary.main"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {product.imageUrl}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenEdit(product.id)}
                    sx={{
                      minHeight: 48,
                      width: { xs: "100%", sm: "auto" },
                      flex: { sm: 1 },
                    }}
                  >
                    Düzenle
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(product.id)}
                    sx={{
                      minHeight: 48,
                      width: { xs: "100%", sm: "auto" },
                      flex: { sm: 1 },
                    }}
                  >
                    Sil
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <Fab
        color="primary"
        aria-label="add product"
        onClick={handleOpenCreate}
        sx={{
          position: "fixed",
          bottom: { xs: 24, sm: 32 },
          right: { xs: 24, sm: 32 },
          display: { xs: "flex", sm: "none" },
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      {openForm && (
        <ProductForm
          productId={selectedProductId}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
