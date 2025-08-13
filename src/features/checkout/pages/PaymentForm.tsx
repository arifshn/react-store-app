import {
  Grid,
  TextField,
  Typography,
  Paper,
  Box,
  Fade,
  InputAdornment,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import {
  CreditCardRounded,
  SecurityRounded,
  CalendarTodayRounded,
  PersonRounded,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const cardName = watch("cardname") || "";
  const cardNumber = watch("cardnumber") || "";
  const cardExpireMonth = watch("cardexpiremonth") || "";
  const cardExpireYear = watch("cardexpireyear") || "";
  const cardCvv = watch("cardcvc") || "";

  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return "";
    }
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s+/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5")) return "mastercard";
    if (cleaned.startsWith("3")) return "amex";
    return "generic";
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case "visa":
        return "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)";
      case "mastercard":
        return "linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)";
      case "amex":
        return "linear-gradient(135deg, #059669 0%, #10b981 100%)";
      default:
        return "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)";
    }
  };

  const cardType = getCardType(cardNumber);
  const displayCardNumber =
    formatCardNumber(cardNumber) || "•••• •••• •••• ••••";
  const displayName = cardName.toUpperCase() || "KART SAHİBİ";
  const displayExpiry =
    cardExpireMonth && cardExpireYear
      ? `${cardExpireMonth.padStart(2, "0")}/${cardExpireYear.slice(-2)}`
      : "MM/YY";
  const displayCvv = cardCvv || "•••";

  return (
    <Fade in timeout={600}>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3} color="primary.main">
          💳 Ödeme Bilgileri
        </Typography>
        <Box mb={4}>
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              height: 240,
              mx: "auto",
              background: getCardColor(cardType),
              color: "white",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              transform: "perspective(1000px) rotateY(-5deg)",
              "&:hover": {
                transform: "perspective(1000px) rotateY(0deg) scale(1.02)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)" /%3E%3C/svg%3E")',
                opacity: 0.3,
                zIndex: 0,
              },
            }}
          >
            <CardContent
              sx={{ p: 3, height: "100%", position: "relative", zIndex: 1 }}
            >
              <Stack height="100%" justifyContent="space-between">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 28,
                      borderRadius: 1,
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 20,
                        borderRadius: 0.5,
                        background:
                          "linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ opacity: 0.9 }}
                  >
                    {cardType === "visa" && "VISA"}
                    {cardType === "mastercard" && "MasterCard"}
                    {cardType === "amex" && "AMEX"}
                    {cardType === "generic" && "BANK"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    letterSpacing={2}
                    sx={{
                      fontFamily: "monospace",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {displayCardNumber}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.8, fontSize: "0.7rem" }}
                    >
                      KART SAHİBİ
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayName}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.8, fontSize: "0.7rem" }}
                    >
                      SON KULLANIM
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}
                    >
                      {displayExpiry}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "background.default",
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...register("cardname", { required: "Card name is required" })}
                size="medium"
                label="Kart Sahibinin Adı"
                placeholder="Kartınızda yazıldığı gibi giriniz"
                fullWidth
                autoFocus
                error={!!errors.cardname}
                helperText={
                  (errors.cardname?.message as string) ||
                  "Kartınızdaki ismi tam olarak yazınız"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...register("cardnumber", {
                  required: "Kart numarası gereklidir",
                })}
                size="medium"
                label="Kart Numarası"
                placeholder="Kartınızın ön yüzündeki 16 haneyi giriniz"
                fullWidth
                error={!!errors.cardnumber}
                helperText={
                  (errors.cardnumber?.message as string) ||
                  "Kartınızın ön yüzündeki 16 haneli numarayı giriniz"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                {...register("cardexpiremonth", {
                  required: "Expiry month is required",
                })}
                size="medium"
                label="Son Kullanım Ayı"
                placeholder="MM"
                fullWidth
                error={!!errors.cardexpiremonth}
                helperText={
                  (errors.cardexpiremonth?.message as string) || "Ay (01-12)"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 2,
                  style: { fontFamily: "monospace", fontSize: "1.1rem" },
                }}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 2) value = value.substring(0, 2);
                  if (
                    value.length === 2 &&
                    (parseInt(value) > 12 || parseInt(value) < 1)
                  ) {
                    value = value.substring(0, 1);
                  }
                  e.target.value = value;
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                {...register("cardexpireyear", {
                  required: "Expiry year is required",
                })}
                size="medium"
                label="Son Kullanım Yılı"
                placeholder="YYYY"
                fullWidth
                error={!!errors.cardexpireyear}
                helperText={
                  (errors.cardexpireyear?.message as string) || "Yıl (YYYY)"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 4,
                  style: { fontFamily: "monospace", fontSize: "1.1rem" },
                }}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 4) value = value.substring(0, 4);
                  e.target.value = value;
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                {...register("cardcvc", { required: "Cvv is required" })}
                size="medium"
                label="CVV / CVC"
                placeholder="123"
                type="password"
                fullWidth
                error={!!errors.cardcvc}
                helperText={
                  (errors.cardcvc?.message as string) ||
                  "Kartın arkasındaki 3-4 haneli kod"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SecurityRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 4,
                  style: { fontFamily: "monospace", fontSize: "1.1rem" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box mt={3} p={2} bgcolor="success.light" borderRadius={2}>
          <Typography variant="body2" color="success.dark" fontWeight="medium">
            🔒 <strong>Güvenli Ödeme:</strong> Tüm kart bilgileriniz SSL ile
            şifrelenerek korunmaktadır.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
