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
import { Button } from "@mui/material";
import ProductForm from "./ProductForm";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchCategories } from "../../categories/slices/categoriesSlice";
import type { IProduct } from "../../catalog/models/IProduct";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const isLoaded = useAppSelector((state) => state.catalog.isLoaded);
  const status = useAppSelector((state) => state.catalog.status);

  const [openForm, setOpenForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, isLoaded]);

  const handleDelete = (id: number) => {
    if (window.confirm("Ürünü silmek istediğinize emin misiniz?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => dispatch(fetchProducts()));
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
        .then(() => dispatch(fetchProducts()));
    } else {
      dispatch(createProduct(data))
        .unwrap()
        .then(() => dispatch(fetchProducts()));
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
    <>
      <Button variant="contained" onClick={handleOpenCreate} sx={{ mb: 2 }}>
        Yeni Ürün Ekle
      </Button>
      <Paper style={{ height: 600, width: "100%", padding: 16 }}>
        <h2>Ürün Listesi</h2>
        <DataGrid
          rows={validProducts}
          columns={columns}
          loading={status === "pendingFetchProducts"}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={{ pageSize: 10, page: 0 }}
        />
      </Paper>

      {openForm && (
        <ProductForm
          productId={selectedProductId}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </>
  );
}
