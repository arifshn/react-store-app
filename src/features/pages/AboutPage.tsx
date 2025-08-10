import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Visibility,
  EmojiObjects,
  Favorite,
  Security,
  Speed,
  Support,
} from "@mui/icons-material";
// Statik Veriler Deneme Amaçlı
export default function AboutPage() {
  const theme = useTheme();

  const values = [
    {
      icon: <Favorite />,
      title: "Müşteri Memnuniyeti",
      description:
        "Müşterilerimizin memnuniyeti bizim için en önemli önceliktir.",
      color: "error.main",
    },
    {
      icon: <Security />,
      title: "Güvenilirlik",
      description:
        "Güvenilir ve kaliteli hizmet sunmak temel değerlerimizdendir.",
      color: "primary.main",
    },
    {
      icon: <Speed />,
      title: "Hızlı Teslimat",
      description: "Siparişlerinizi en kısa sürede kapınıza ulaştırıyoruz.",
      color: "warning.main",
    },
    {
      icon: <Support />,
      title: "7/24 Destek",
      description: "Her zaman yanınızdayız, sorularınızı yanıtlıyoruz.",
      color: "success.main",
    },
  ];

  const team = [
    {
      name: "Deneme Deneme",
      role: "deneme",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b193?w=150",
      description: "lorem",
    },
    {
      name: "Deneme Deneme",
      role: "deneme",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b193?w=150",
      description: "lorem",
    },
    {
      name: "Deneme Deneme",
      role: "deneme",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b193?w=150",
      description: "lorem",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "-----------------",
      description: "-----------------",
    },
    {
      year: "2021",
      title: "-----------------",
      description: "-----------------",
    },
    {
      year: "2022",
      title: "-----------------",
      description: "-----------------",
    },
    {
      year: "2023",
      title: "-----------------",
      description: "-----------------",
    },
    {
      year: "2024",
      title: "-----------------",
      description: "-----------------",
    },
  ];

  const stats = [
    { value: "99%", label: "Müşteri Memnuniyeti" },
    { value: "24/7", label: "Müşteri Desteği" },
    { value: "48 Saat", label: "Ortalama Teslimat" },
    { value: "50+", label: "Şehir" },
  ];

  return (
    <Box>
      {/* Hero Section */}
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
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Chip
                  label="📖 Hikayemiz"
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
                  Calmora
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
                    Hakkında
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  2020 yılında kurulan Calmora, müşterilerine en kaliteli
                  ürünleri en uygun fiyatlarla sunma vizyonuyla yola çıkmış bir
                  e-ticaret platformudur.
                </Typography>
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
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8rem",
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                    },
                  }}
                >
                  🏢
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                    : "linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)",
              }}
            >
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                    }}
                  >
                    <Visibility />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Vizyonumuz
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
                >
                  Türkiye'nin en güvenilir ve kullanıcı dostu e-ticaret
                  platformu olmak. Müşterilerimize her zaman en iyi alışveriş
                  deneyimini sunarak, onların hayatlarını kolaylaştırmak ve
                  mutlu etmek.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                    : "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
              }}
            >
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      bgcolor: "warning.main",
                      color: "white",
                    }}
                  >
                    <EmojiObjects />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Misyonumuz
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
                >
                  Kaliteli ürünleri uygun fiyatlarla müşterilerimize ulaştırmak.
                  Hızlı, güvenli ve sorunsuz alışveriş deneyimi sunarak, müşteri
                  memnuniyetini her zaman ön planda tutmak.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Değerlerimiz
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Bizi biz yapan temel değerler
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: value.color,
                          color: "white",
                          mb: 2,
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Tarihçemiz
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Calmora'nın başarı hikayesi
            </Typography>
          </Box>
          <Box sx={{ position: "relative", maxWidth: 800, mx: "auto" }}>
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{ display: "flex", mb: 4, alignItems: "center" }}
              >
                <Box
                  sx={{
                    minWidth: 80,
                    textAlign: "center",
                    mr: 4,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      bgcolor: "primary.main",

                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                    }}
                  >
                    {milestone.year.slice(-2)}
                  </Typography>
                </Box>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    flex: 1,
                    border: 2,
                    borderColor: "primary.main",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {milestone.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box textAlign="center">
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Ekibimiz
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Calmora ailesinin değerli üyeleri
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {team.map((member, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 3,
                      border: 1,
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Avatar
                      src={member.image}
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 3,
                        border: 4,
                        borderColor: "primary.main",
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary.main"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Statistics */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 6,
            borderRadius: 4,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                : "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
          }}
        >
          <Stack spacing={4}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontWeight: 700 }}
            >
              Başarılarımız
            </Typography>
            <Grid container spacing={4} textAlign="center">
              {stats.map((stat, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "success.main", mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
