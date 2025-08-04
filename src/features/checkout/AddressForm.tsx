import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("fistname", {
            required: "Kullanıcı adı boş olamaz",
          })}
          size="small"
          label="İsim"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.fistname}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("lastname", {
            required: "Kullanıcı adı boş olamaz",
          })}
          size="small"
          label="Soyisim"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.lastname}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", {
            required: "Telefon boş olamaz",
          })}
          size="small"
          label="Telefon"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.phone}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", {
            required: "Şehir boş olamaz",
          })}
          size="small"
          label="Şehir"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.city}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          {...register("addresLine", {
            required: "Adres boş olamaz",
          })}
          size="small"
          label="Adres"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          error={!!errors.addresLine}
        ></TextField>
      </Grid>
    </Grid>
  );
}
