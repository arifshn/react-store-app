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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@mui/material";
import CategoriesForm from "./CategoriesForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Fade in timeout={800}>
        <Box>
          <Paper
            elevation={1}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: "white",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                component="h1"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
              >
                Kategoriler Yönetimi
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                Mağazanızdaki kategorileri buradan yönetin.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleOpenCreate}
              size="large"
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: "bold",
                bgcolor: "success.main",
                "&:hover": {
                  bgcolor: "success.dark",
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => theme.shadows[8],
                },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Yeni Kategori Ekle
            </Button>
          </Paper>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Paper
              elevation={1}
              sx={{
                height: "auto",
                width: "100%",
                borderRadius: 3,
                p: 2,
              }}
            >
              <DataGrid
                rows={validCategories}
                columns={columns}
                loading={status === "pendingFetchCategories"}
                getRowId={(row) => row.id}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    bgcolor: "background.neutral",
                    fontWeight: "bold",
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                  "& .MuiDataGrid-row:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              />
            </Paper>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            {validCategories.map((category) => (
              <Accordion
                key={category.id}
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
                  aria-controls={`panel-${category.id}-content`}
                  id={`panel-${category.id}-header`}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {category.kategoriAdi}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      ID: #{category.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      URL: {category.url}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => handleOpenEdit(category.id)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      Sil
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {openForm && (
            <CategoriesForm
              categoriesId={selectedCategoriesId}
              onClose={handleCloseForm}
              onSubmit={handleSubmitForm}
            />
          )}
        </Box>
      </Fade>
    </Container>
  );
}
