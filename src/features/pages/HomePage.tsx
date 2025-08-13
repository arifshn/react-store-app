import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
  Chip,
  IconButton,
} from "@mui/material";
import {
  ShoppingBag,
  LocalShipping,
  Security,
  Support,
  Star,
  ArrowForward,
  Favorite,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
// Statik Veriler Deneme Amaçlı
export default function HomePage() {
  const theme = useTheme();

  const features = [
    {
      icon: <LocalShipping />,
      title: "Ücretsiz Kargo",
      description: "500₺ ve üzeri alışverişlerde ücretsiz kargo",
    },
    {
      icon: <Security />,
      title: "Güvenli Ödeme",
      description: "256-bit SSL şifreleme ile güvenli ödeme",
    },
    {
      icon: <Support />,
      title: "7/24 Destek",
      description: "Her zaman yanınızdayız, sorularınızı yanıtlıyoruz",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "DENEME",
      price: "0000",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      rating: 4.8,
    },
    {
      id: 2,
      name: "DENEME",
      price: "0000",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      rating: 4.9,
    },
    {
      id: 3,
      name: "DENEME",
      price: "0000",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      rating: 4.7,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Chip
                  label="🎉 Yeni Koleksiyon"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: alpha(theme.palette.common.white, 0.2),
                    color: "white",
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Calmora ile
                  <Box
                    component="span"
                    sx={{
                      background:
                        "linear-gradient(45deg, #FFD700 30%, #FFA500 90%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "block",
                    }}
                  >
                    Tarzını Keşfet
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    maxWidth: 500,
                    lineHeight: 1.6,
                  }}
                >
                  En kaliteli ürünler, en uygun fiyatlar ve hızlı teslimat ile
                  alışveriş deneyiminizi yeniden tanımlıyoruz.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={Link}
                    to="/catalog"
                    variant="contained"
                    size="large"
                    endIcon={<ShoppingBag />}
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.common.white, 0.9),
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Alışverişe Başla
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: alpha(theme.palette.common.white, 0.1),
                      },
                    }}
                  >
                    Daha Fazla
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 300, md: 400 },
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8rem",
                    animation: "float 3s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-20px)" },
                    },
                  }}
                >
                  🛍️
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 20px 40px rgba(255,255,255,0.1)"
                        : "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "white",
                    mb: 3,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Öne Çıkan Ürünler
              </Typography>
              <Typography variant="h6" color="text.secondary">
                En çok satılan ve beğenilen ürünlerimizi keşfedin
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.image}
                        alt={product.name}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: alpha(theme.palette.common.white, 0.9),
                          "&:hover": {
                            bgcolor: "white",
                            color: "error.main",
                          },
                        }}
                      >
                        <Favorite />
                      </IconButton>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Star sx={{ color: "warning.main", fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {product.rating}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {product.name}
                        </Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="h6"
                            color="primary.main"
                            sx={{ fontWeight: 700 }}
                          >
                            {product.price}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<ArrowForward />}
                          >
                            İncele
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 6,
            borderRadius: 4,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                10K+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Mutlu Müşteri
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                500+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Ürün Çeşidi
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                50+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Şehir
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                99%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Memnuniyet
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
