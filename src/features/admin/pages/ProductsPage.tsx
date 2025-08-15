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
} from "@mui/material";
import ProductForm from "./ProductForm";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchCategories,
  selectAllCategories,
} from "../../categories/slices/categoriesSlice";
import type { IProduct } from "../../catalog/models/IProduct";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts({ showInactive: true }));
      dispatch(fetchCategories());
    }
  }, [dispatch, isLoaded]);

  const handleDelete = (id: number) => {
    if (window.confirm("Ürünü silmek istediğinize emin misiniz?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => dispatch(fetchProducts({ showInactive: true })));
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
    if (selectedProductId) {
      dispatch(updateProduct(data))
        .unwrap()
        .then(() => dispatch(fetchProducts({ showInactive: true })));
    } else {
      dispatch(createProduct(data))
        .unwrap()
        .then(() => dispatch(fetchProducts({ showInactive: true })));
    }
    setOpenForm(false);
  };

  const columns: GridColDef<IProduct>[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Ürün Adı", width: 200 },
    { field: "price", headerName: "Fiyat", width: 120 },
    { field: "stock", headerName: "Stok", width: 120 },
    { field: "description", headerName: "Açıklama", width: 120 },
    { field: "imageUrl", headerName: "Görsel", width: 120 },
    { field: "isActive", headerName: "Aktif", width: 120 },
    {
      field: "category",
      headerName: "Kategori",
      width: 150,
      renderCell: (params) => params.value?.kategoriAdi ?? "Belirtilmemiş",
    },
    {
      field: "actions",
      headerName: "İşlemler",
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenEdit(params.row.id)}>Düzenle</Button>
          <Button color="error" onClick={() => handleDelete(params.row.id)}>
            Sil
          </Button>
        </>
      ),
      width: 250,
    },
  ];

  const validProducts = products.filter(
    (product) => product.id !== null && product.id !== undefined
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Ürün Listesi
        </Typography>
        <Button variant="contained" onClick={handleOpenCreate} size="large">
          Yeni Ürün Ekle
        </Button>
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Paper style={{ height: 600, width: "100%", padding: 16 }}>
          <DataGrid
            rows={validProducts}
            columns={columns}
            loading={status === "pendingFetchProducts"}
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={{ pageSize: 10, page: 0 }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default",
                fontWeight: "bold",
              },
            }}
          />
        </Paper>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {validProducts.map((product) => (
          <Accordion
            key={product.id}
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
              aria-controls={`panel-${product.id}-content`}
              id={`panel-${product.id}-header`}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: #{product.id}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2, display: "grid", gap: 1 }}>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Fiyat:
                  </Box>{" "}
                  {product.price} TL
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Stok:
                  </Box>{" "}
                  {product.stock}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Açıklama:
                  </Box>{" "}
                  {product.description}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Kategori:
                  </Box>{" "}
                  {product.category?.kategoriAdi ?? "Belirtilmemiş"}
                </Typography>
                <Typography variant="body2">
                  <Box component="span" fontWeight="bold">
                    Aktif:
                  </Box>{" "}
                  {product.isActive ? "Evet" : "Hayır"}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleOpenEdit(product.id)}
                >
                  Düzenle
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  Sil
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {openForm && (
        <ProductForm
          productId={selectedProductId}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </Box>
  );
}
