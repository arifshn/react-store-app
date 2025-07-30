import { useEffect } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchProducts, selectAllProducts } from "../catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "@mui/material";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const isLoaded = useAppSelector((state) => state.catalog.isLoaded);
  const status = useAppSelector((state) => state.catalog.status);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isLoaded]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Ürün Adı", width: 200 },
    { field: "price", headerName: "Fiyat", width: 120 },
    { field: "stock", headerName: "Stok", width: 120 },
    { field: "description", headerName: "Açıklama", width: 120 },
    { field: "imageUrl", headerName: "Görsel", width: 120 },
    { field: "isActive", headerName: "Aktif", width: 120 },
    {
      field: "actions",
      headerName: "İşlemler",
      renderCell: (params) => (
        <>
          <Button onClick={() => console.log("Düzenle", params.row.id)}>
            Düzenle
          </Button>
          <Button onClick={() => console.log("Sil", params.row.id)}>Sil</Button>
        </>
      ),
      width: 250,
    },
  ];
  return (
    <Paper style={{ height: 600, width: "100%", padding: 16 }}>
      <h2>Ürün Listesi</h2>
      <DataGrid
        rows={products}
        columns={columns}
        loading={status === "pendingFetchProducts"}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 25, 50]}
        paginationModel={{ pageSize: 10, page: 0 }}
      />
    </Paper>
  );
}
