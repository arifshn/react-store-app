import {
  Grid,
  TextField,
  Typography,
  Paper,
  Box,
  Fade,
  InputAdornment,
} from "@mui/material";
import {
  PersonRounded,
  PhoneRounded,
  LocationCityRounded,
  HomeRounded,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Fade in timeout={600}>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={3} color="primary.main">
          📍 Teslimat Bilgileri
        </Typography>

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
                {...register("fistname", {
                  required: "İsim alanı boş olamaz",
                  minLength: {
                    value: 2,
                    message: "İsim en az 2 karakter olmalıdır",
                  },
                })}
                size="medium"
                label="İsim"
                fullWidth
                autoFocus
                error={!!errors.fistname}
                helperText={errors.fistname?.message as string}
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
                {...register("lastname", {
                  required: "Soyisim alanı boş olamaz",
                  minLength: {
                    value: 2,
                    message: "Soyisim en az 2 karakter olmalıdır",
                  },
                })}
                size="medium"
                label="Soyisim"
                fullWidth
                error={!!errors.lastname}
                helperText={errors.lastname?.message as string}
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
                {...register("phone", {
                  required: "Telefon numarası boş olamaz",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Geçerli bir telefon numarası giriniz",
                  },
                  minLength: {
                    value: 10,
                    message: "Telefon numarası en az 10 karakter olmalıdır",
                  },
                })}
                size="medium"
                label="Telefon Numarası"
                placeholder="0555 123 45 67"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message as string}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneRounded color="primary" />
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
                {...register("city", {
                  required: "Şehir alanı boş olamaz",
                  minLength: {
                    value: 2,
                    message: "Şehir adı en az 2 karakter olmalıdır",
                  },
                })}
                size="medium"
                label="Şehir"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message as string}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityRounded color="primary" />
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

            <Grid size={{ xs: 12 }}>
              <TextField
                {...register("addresline", {
                  required: "Adres alanı boş olamaz",
                  minLength: {
                    value: 10,
                    message: "Adres en az 10 karakter olmalıdır",
                  },
                })}
                size="medium"
                label="Detaylı Adres"
                placeholder="Mahalle, sokak, bina no ve diğer detayları yazınız..."
                fullWidth
                multiline
                rows={4}
                error={!!errors.addresline}
                helperText={
                  (errors.addressLine?.message as string) ||
                  "Kargo teslimi için detaylı adres bilgisi giriniz"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <HomeRounded color="primary" />
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
                  "& .MuiInputBase-input": {
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box mt={3} p={2} bgcolor="info.light" borderRadius={2}>
          <Typography variant="body2" color="info.dark" fontWeight="medium">
            💡 <strong>İpucu:</strong> Hızlı teslimat için lütfen detaylı adres
            bilgisi ve güncel telefon numarası giriniz.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}
