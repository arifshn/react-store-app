import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  alpha,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  Support,
  Chat,
  QuestionAnswer,
} from "@mui/icons-material";
import { useState } from "react";
// Statik Veriler Deneme Amaçlı
export default function ContactPage() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Telefon",
      info: "--------------",
      description: "Pazartesi - Cuma, 09:00 - 18:00",
      color: "primary.main",
    },
    {
      icon: <Email />,
      title: "E-posta",
      info: "info@calmora.com",
      description: "7/24 size dönüş yapıyoruz",
      color: "success.main",
    },
    {
      icon: <LocationOn />,
      title: "Adres",
      info: "----------------",
      description: "----------------",
      color: "error.main",
    },
    {
      icon: <AccessTime />,
      title: "Çalışma Saatleri",
      info: "Pazartesi - Cuma",
      description: "09:00 - 18:00",
      color: "warning.main",
    },
  ];

  const supportOptions = [
    {
      icon: <WhatsApp />,
      title: "WhatsApp Destek",
      description: "Anında yanıt alın",
      action: "Mesaj Gönder",
      color: "#25D366",
    },
    {
      icon: <Chat />,
      title: "Canlı Chat",
      description: "Online destek alın",
      action: "Sohbet Başlat",
      color: theme.palette.primary.main,
    },
    {
      icon: <Support />,
      title: "Destek Merkezi",
      description: "SSS ve yardım dokümanları",
      action: "Destek Merkezi",
      color: theme.palette.info.main,
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, name: "Facebook", color: "#1877F2" },
    { icon: <Twitter />, name: "Twitter", color: "#1DA1F2" },
    { icon: <Instagram />, name: "Instagram", color: "#E4405F" },
    { icon: <LinkedIn />, name: "LinkedIn", color: "#0077B5" },
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
                  label="📞 İletişim"
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
                  Bizimle
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
                    İletişime Geçin
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  Sorularınız, önerileriniz veya destek ihtiyaçlarınız için bize
                  ulaşın. Size en kısa sürede dönüş yapalım.
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
                    animation: "bounce 2s ease-in-out infinite",
                    "@keyframes bounce": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-15px)" },
                    },
                  }}
                >
                  📞
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
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
                      bgcolor: info.color,
                      color: "white",
                      mb: 2,
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                    {info.info}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Map */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: 1,
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      Mesaj Gönderin
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Formu doldurun, size en kısa sürede dönelim.
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Adınız Soyadınız"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="E-posta Adresiniz"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        label="Konu"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                      />

                      <TextField
                        fullWidth
                        label="Mesajınız"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        variant="outlined"
                        required
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          background:
                            "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Mesaj Gönder
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Map Placeholder */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  height: { xs: 300, md: "100%" },
                  minHeight: 400,
                  borderRadius: 3,
                  border: 1,
                  borderColor: "divider",
                  overflow: "hidden",
                  position: "relative",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
                      : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <LocationOn
                    sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    Ofis Konumumuz
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    -----------------
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    -----------------
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Support Options */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Hızlı Destek Seçenekleri
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Size en uygun iletişim kanalını seçin
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {supportOptions.map((option, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    border: 2,
                    borderColor: "divider",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: option.color,
                      transform: "translateY(-8px)",
                      boxShadow: `0 12px 24px ${alpha(option.color, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 3,
                      borderRadius: "50%",
                      bgcolor: alpha(option.color, 0.1),
                      color: option.color,
                      mb: 3,
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {option.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {option.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: option.color,
                      color: option.color,
                      "&:hover": {
                        borderColor: option.color,
                        bgcolor: alpha(option.color, 0.1),
                      },
                    }}
                  >
                    {option.action}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Social Media & FAQ */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Social Media */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: 1,
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      Sosyal Medyada Takip Edin
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Son haberler, kampanyalar ve daha fazlası için bizi takip
                      edin.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        sx={{
                          bgcolor: alpha(social.color, 0.1),
                          color: social.color,
                          border: 2,
                          borderColor: alpha(social.color, 0.2),
                          "&:hover": {
                            bgcolor: social.color,
                            color: "white",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Grid>

            {/* FAQ */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: 1,
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      Sık Sorulan Sorular
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Aradığınız cevap burada olabilir.
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    <Box
                      sx={{ p: 2, bgcolor: "action.hover", borderRadius: 2 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Kargo sürem ne kadar?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Siparişleriniz 1-3 iş günü içinde kargoya verilir.
                      </Typography>
                    </Box>

                    <Box
                      sx={{ p: 2, bgcolor: "action.hover", borderRadius: 2 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        İade şartları nelerdir?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        14 gün içinde koşulsuz iade hakkınız bulunmaktadır.
                      </Typography>
                    </Box>

                    <Button
                      variant="text"
                      endIcon={<QuestionAnswer />}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Tüm SSS'leri Görüntüle
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
