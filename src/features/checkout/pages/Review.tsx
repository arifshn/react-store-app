import {
  Divider,
  Stack,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Chip,
  Fade,
  Grid,
} from "@mui/material";
import {
  DeliveryDining,
  Payments,
  PersonRounded,
  PhoneRounded,
  LocationOnRounded,
  CreditCardRounded,
  SecurityRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

export default function Review() {
  const { getValues } = useFormContext();

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "";
    const cleaned = cardNumber.replace(/\s+/g, "");
    if (cleaned.length >= 16) {
      return `**** **** **** ${cleaned.slice(-4)}`;
    }
    return cardNumber;
  };

  const firstName = getValues("firstname") || "";
  const lastName = getValues("lastname") || "";
  const phone = getValues("phone") || "";
  const addressLine = getValues("addressLine") || "";
  const city = getValues("city") || "";
  const cardName = getValues("card_name") || "";
  const cardNumber = getValues("card_number") || "";
  const cardExpiry = getValues("card_expiry_date") || "";

  return (
    <Fade in timeout={600}>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3} color="primary.main">
          📋 Sipariş Özeti
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Lütfen bilgilerinizi kontrol edin ve siparişinizi onaylayın.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <DeliveryDining
                      sx={{ color: "primary.main", fontSize: 24 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      Teslimat Bilgileri
                    </Typography>
                    <Chip
                      label="Onaylandı"
                      size="small"
                      color="success"
                      icon={<CheckCircleRounded />}
                    />
                  </Box>
                </Box>

                <Stack spacing={2}>
                  <Box display="flex" alignItems="center">
                    <PersonRounded
                      sx={{ color: "text.secondary", mr: 2, fontSize: 20 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Ad Soyad
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {firstName} {lastName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <PhoneRounded
                      sx={{ color: "text.secondary", mr: 2, fontSize: 20 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Telefon
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="flex-start">
                    <LocationOnRounded
                      sx={{
                        color: "text.secondary",
                        mr: 2,
                        fontSize: 20,
                        mt: 0.5,
                      }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Teslimat Adresi
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {addressLine}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {city}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "success.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Payments sx={{ color: "success.main", fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      Ödeme Bilgileri
                    </Typography>
                    <Chip
                      label="Güvenli"
                      size="small"
                      color="success"
                      icon={<SecurityRounded />}
                    />
                  </Box>
                </Box>

                <Stack spacing={2}>
                  <Box display="flex" alignItems="center">
                    <PersonRounded
                      sx={{ color: "text.secondary", mr: 2, fontSize: 20 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Kart Sahibi
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {cardName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <CreditCardRounded
                      sx={{ color: "text.secondary", mr: 2, fontSize: 20 }}
                    />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Kart Numarası
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ fontFamily: "monospace" }}
                      >
                        {formatCardNumber(cardNumber)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        bgcolor: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      📅
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Son Kullanım
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ fontFamily: "monospace" }}
                      >
                        {cardExpiry}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "primary.light",
            borderRadius: 3,
            border: 1,
            borderColor: "primary.main",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <CheckCircleRounded
              sx={{ color: "primary.main", mr: 2, fontSize: 28 }}
            />
            <Box textAlign="center">
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                Bilgileriniz Kontrol Edildi
              </Typography>
              <Typography variant="body2" color="primary.dark">
                Siparişinizi tamamlamak için "Siparişi Tamamla" butonuna
                tıklayın
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box mt={3} p={2} bgcolor="warning.light" borderRadius={2}>
          <Typography variant="body2" color="warning.dark" fontWeight="medium">
            ⚠️ <strong>Önemli:</strong> Siparişi tamamladıktan sonra
            bilgilerinizi değiştiremezsiniz. Lütfen tüm bilgilerin doğru
            olduğundan emin olun.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
