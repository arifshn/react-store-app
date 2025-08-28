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
  Card,
  CardContent,
  Fade,
  Divider,
  Badge,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { Search, Clear, ShoppingBag, Inventory } from "@mui/icons-material";
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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAppSelector((state) => state.account);

  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectAllCategories);
  const filters = useAppSelector(selectFilters);
  const { status, isLoaded } = useAppSelector((state) => state.catalog);
  const { isLoaded: categoriesLoaded } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState(filters?.search || "");

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchFavorities());
    }
  }, [dispatch, user?.token]);

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
  const activeFilterCount =
    (filters?.categoryId ? 1 : 0) + (filters?.search ? 1 : 0);

  if (status === "pendingFetchProducts" && !isLoaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{
          bgcolor: isDark ? "grey.900" : "grey.50",
          px: 2,
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <CircularProgress
            size={isMobile ? 48 : 64}
            thickness={3.6}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Ürünler yükleniyor...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: isDark ? "grey.900" : "grey.50",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      <Paper
        elevation={isDark ? 0 : 2}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          bgcolor: isDark ? "grey.800" : "background.paper",
          borderRadius: 0,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          backdropFilter: "blur(20px)",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Box py={isMobile ? 2 : 3}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={isMobile ? 1.5 : 2}
              mb={isMobile ? 2 : 3}
            >
              <Box
                sx={{
                  p: isMobile ? 1 : 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Inventory
                  sx={{
                    fontSize: isMobile ? 24 : 28,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
              <Stack spacing={0.5}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: isMobile
                      ? "1.5rem"
                      : { xs: "1.75rem", sm: "2.125rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Ürün Kataloğu
                </Typography>
                {!isMobile && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Geniş ürün yelpazemizi keşfedin
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? 1.5 : 1}
              alignItems="stretch"
              mb={isMobile ? 2 : 3}
            >
              <TextField
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ürün ara..."
                size={isMobile ? "small" : "medium"}
                fullWidth={isMobile}
                sx={{
                  flex: 1,
                  maxWidth: isMobile ? "100%" : 400,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: isMobile ? 2 : 3,
                    bgcolor: isDark
                      ? alpha(theme.palette.background.paper, 0.8)
                      : "background.paper",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: `0 0 0 2px ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search
                        sx={{
                          color: "text.secondary",
                          fontSize: isMobile ? 18 : 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: searchInput && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        edge="end"
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.error.main, 0.1),
                            color: "error.main",
                          },
                        }}
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton
                onClick={handleSearch}
                size={isMobile ? "medium" : "large"}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "primary.contrastText",
                  borderRadius: isMobile ? 2 : 3,
                  px: isMobile ? 2 : 3,
                  py: isMobile ? 1 : 1.5,
                  minWidth: isMobile ? 48 : 56,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    transform: "translateY(-1px)",
                    boxShadow: theme.shadows[4],
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Search fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              spacing={isMobile ? 1 : 1.5}
              mb={isMobile ? 2 : 3}
              sx={{
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": {
                  height: isMobile ? 4 : 6,
                },
                "&::-webkit-scrollbar-track": {
                  bgcolor: alpha(theme.palette.divider, 0.1),
                  borderRadius: 3,
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: alpha(theme.palette.text.secondary, 0.3),
                  borderRadius: 3,
                },
              }}
            >
              <Chip
                label="Tümü"
                onClick={() => handleCategoryFilter()}
                color={!filters?.categoryId ? "primary" : "default"}
                variant={!filters?.categoryId ? "filled" : "outlined"}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderRadius: isMobile ? 2 : 3,
                  fontWeight: 600,
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  px: isMobile ? 1.5 : 2,
                  py: 0.5,
                  minWidth: "auto",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: isMobile ? "none" : "translateY(-2px)",
                    boxShadow: isDark || isMobile ? "none" : theme.shadows[2],
                  },
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
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    borderRadius: isMobile ? 2 : 3,
                    fontWeight: 600,
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    px: isMobile ? 1.5 : 2,
                    py: 0.5,
                    minWidth: "auto",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: isMobile ? "none" : "translateY(-2px)",
                      boxShadow: isDark || isMobile ? "none" : theme.shadows[2],
                    },
                  }}
                />
              ))}
            </Stack>

            <Divider sx={{ mb: 2, opacity: 0.6 }} />
            <Stack
              direction={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isMobile ? "flex-start" : "center"}
              spacing={isMobile ? 1.5 : 2}
            >
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                spacing={isMobile ? 1 : 2}
              >
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {products.length} ürün bulundu
                </Typography>
                {(filters?.categoryId || filters?.search) && (
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{
                      "& > *": {
                        mb: isMobile ? 0.5 : 0,
                      },
                    }}
                  >
                    {filters?.categoryId && (
                      <Chip
                        size="small"
                        label={
                          categories.find(
                            (c: any) => c.id === filters.categoryId
                          )?.kategoriAdi || "Kategori"
                        }
                        color="primary"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          fontSize: isMobile ? "0.7rem" : "0.75rem",
                        }}
                      />
                    )}
                    {filters?.search && (
                      <Chip
                        size="small"
                        label={`"${
                          filters.search.length > 10 && isMobile
                            ? filters.search.substring(0, 10) + "..."
                            : filters.search
                        }"`}
                        color="secondary"
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          fontSize: isMobile ? "0.7rem" : "0.75rem",
                        }}
                      />
                    )}
                  </Stack>
                )}
              </Stack>
              {isFilterActive && (
                <Badge badgeContent={activeFilterCount} color="error">
                  <Chip
                    label={isMobile ? "Temizle" : "Filtreleri Temizle"}
                    onClick={handleClearAllFilters}
                    size="small"
                    color="error"
                    variant="outlined"
                    icon={<Clear fontSize="small" />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      fontSize: isMobile ? "0.7rem" : "0.75rem",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  />
                </Badge>
              )}
            </Stack>
          </Box>
        </Container>
      </Paper>
      <Container
        maxWidth="xl"
        sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : undefined }}
      >
        {status === "pendingFetchProducts" ? (
          <Box display="flex" justifyContent="center" py={isMobile ? 4 : 8}>
            <CircularProgress size={isMobile ? 32 : 48} thickness={4} />
          </Box>
        ) : (
          <Fade in timeout={500}>
            <Box>
              {products.length > 0 ? (
                <ProductList products={products} />
              ) : (
                <Card
                  sx={{
                    p: isMobile ? 3 : 6,
                    textAlign: "center",
                    bgcolor: isDark ? "grey.800" : "background.paper",
                    borderRadius: isMobile ? 3 : 4,
                    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                    boxShadow: isDark ? "none" : theme.shadows[2],
                    mx: isMobile ? 1 : 0,
                  }}
                >
                  <CardContent
                    sx={{
                      p: isMobile ? 2 : 3,
                      "&:last-child": { pb: isMobile ? 2 : 3 },
                    }}
                  >
                    <Box
                      sx={{
                        mb: isMobile ? 2 : 3,
                        display: "inline-flex",
                        p: isMobile ? 2 : 3,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette.text.secondary, 0.1),
                      }}
                    >
                      <ShoppingBag
                        sx={{
                          fontSize: isMobile ? 36 : 48,
                          color: "text.secondary",
                        }}
                      />
                    </Box>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mb: isMobile ? 1.5 : 2,
                      }}
                    >
                      Ürün bulunamadı
                    </Typography>
                    <Typography
                      variant={isMobile ? "body2" : "body1"}
                      color="text.secondary"
                      sx={{
                        maxWidth: 400,
                        mx: "auto",
                        lineHeight: 1.6,
                        fontSize: isMobile ? "0.875rem" : "1rem",
                      }}
                    >
                      Aradığınız kriterlere uygun ürün bulunamadı. Farklı
                      kategoriler veya arama terimleri deneyebilirsiniz.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}
