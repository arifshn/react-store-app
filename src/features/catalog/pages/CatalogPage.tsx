import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Search, Clear, GridView, ViewList } from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import ProductList from "./ProductList";
import {
  selectAllProducts,
  fetchProducts,
  setFilters,
  clearFilters,
  selectFilters,
} from "../slices/catalogSlice";
import { fetchFavorities } from "../../favorite/slices/favoriteSlice";
import {
  selectAllCategories,
  fetchCategories,
} from "../../categories/slices/categoriesSlice";

export default function CatalogPage() {
  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectAllCategories);
  const filters = useAppSelector(selectFilters);
  const { status, isLoaded } = useAppSelector((state) => state.catalog);
  const { isLoaded: categoriesLoaded } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState(filters?.search || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchCategories());
    }
    if (!isLoaded) {
      dispatch(fetchProducts(filters));
    }
    dispatch(fetchFavorities());
  }, [dispatch]);

  useEffect(() => {
    if (filters) {
      dispatch(fetchProducts(filters));
    }
  }, [filters, dispatch]);

  const handleCategoryFilter = (categoryId?: number) => {
    dispatch(setFilters({ categoryId, page: 1 }));
  };

  const handleSearch = () => {
    dispatch(setFilters({ search: searchInput.trim(), page: 1 }));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(setFilters({ search: "", page: 1 }));
  };

  const handleClearAllFilters = () => {
    setSearchInput("");
    dispatch(clearFilters());
  };

  const isFilterActive = filters?.categoryId || filters?.search;

  if (status === "pendingFetchProducts") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh" }}>
      <Paper
        elevation={1}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "white",
          borderRadius: 0,
        }}
      >
        <Container maxWidth="xl">
          <Box py={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              mb={3}
            >
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                color="text.primary"
              >
                Ürün Kataloğu
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ürün ara..."
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 300 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "white",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchInput && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={handleClearSearch}
                          edge="end"
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  <Search />
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              mb={2}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                label="Tüm Kategoriler"
                onClick={() => handleCategoryFilter()}
                color={!filters?.categoryId ? "primary" : "default"}
                variant={!filters?.categoryId ? "filled" : "outlined"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: 1,
                  },
                  transition: "all 0.2s",
                }}
              />
              {categories.map((category: any) => (
                <Chip
                  key={category.id}
                  label={category.kategoriAdi || category.name}
                  onClick={() => handleCategoryFilter(category.id)}
                  color={
                    filters?.categoryId === category.id ? "primary" : "default"
                  }
                  variant={
                    filters?.categoryId === category.id ? "filled" : "outlined"
                  }
                  sx={{
                    borderRadius: 2,
                    fontWeight: 500,
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: 1,
                    },
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                {products.length} ürün bulundu
                {filters?.categoryId && (
                  <span>
                    {" "}
                    -{" "}
                    {categories.find((c: any) => c.id === filters.categoryId)
                      ?.kategoriAdi ||
                      categories.find((c: any) => c.id === filters.categoryId)
                        ?.kategoriAdi}{" "}
                    kategorisi
                  </span>
                )}
                {filters?.search && <span> - "{filters.search}" araması</span>}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {isFilterActive && (
                  <Chip
                    label="Filtreleri Temizle"
                    onDelete={handleClearAllFilters}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                )}
                <IconButton
                  onClick={() => setViewMode("grid")}
                  color={viewMode === "grid" ? "primary" : "default"}
                  size="small"
                >
                  <GridView />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode("list")}
                  color={viewMode === "list" ? "primary" : "default"}
                  size="small"
                >
                  <ViewList />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {status === "pendingFetchProducts" ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box>
            {products.length > 0 ? (
              <ProductList products={products} />
            ) : (
              <Paper
                sx={{
                  p: 8,
                  textAlign: "center",
                  bgcolor: "white",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" color="text.secondary" mb={2}>
                  Aradığınız kriterlere uygun ürün bulunamadı
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Farklı kategoriler veya arama terimleri deneyebilirsiniz
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
