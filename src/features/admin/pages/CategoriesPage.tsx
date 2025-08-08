import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  createCategories,
  deleteCategories,
  fetchCategories,
  selectAllCategories,
  updateCategories,
} from "../../categories/slices/categoriesSlice";
import type { ICategory } from "../../categories/models/ICategory";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import CategoriesForm from "./CategoriesForm";

export default function CategoriesPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const isLoaded = useAppSelector((state) => state.categories.isLoaded);
  const status = useAppSelector((state) => state.categories.status);

  const [openForm, setOpenForm] = useState(false);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isLoaded]);

  const handleDelete = (id: number) => {
    if (window.confirm("Kategoriyi Silmek İstediğinize emin misiniz?")) {
      dispatch(deleteCategories(id))
        .unwrap()
        .then(() => dispatch(fetchCategories()));
    }
  };

  const handleOpenCreate = () => {
    setSelectedCategoriesId(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (id: number) => {
    setSelectedCategoriesId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmitForm = (data: any) => {
    if (selectedCategoriesId) {
      dispatch(updateCategories(data))
        .unwrap()
        .then(() => dispatch(fetchCategories()));
    } else {
      dispatch(createCategories(data))
        .unwrap()
        .then(() => dispatch(fetchCategories()));
    }
    setOpenForm(false);
  };

  const columns: GridColDef<ICategory>[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "kategoriAdi", headerName: "Kategori Adı", width: 200 },
    { field: "url", headerName: "Kategori Url", width: 200 },
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
  const validCategories = categories.filter(
    (category) => category.id !== null && category.id !== undefined
  );

  return (
    <>
      <Button variant="contained" onClick={handleOpenCreate} sx={{ mb: 2 }}>
        Yeni Kategori Ekle
      </Button>
      <Paper style={{ height: 600, width: "100%", padding: 16 }}>
        <h2>Kategori Listesi</h2>
        <DataGrid
          rows={validCategories}
          columns={columns}
          loading={status === "pendingFetchCategories"}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={{ pageSize: 10, page: 0 }}
        ></DataGrid>
      </Paper>

      {openForm && (
        <CategoriesForm
          categoriesId={selectedCategoriesId}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}
    </>
  );
}
