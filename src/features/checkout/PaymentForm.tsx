import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_name", {
            required: "Kart sahibinin adı boş olamaz ",
          })}
          size="small"
          label="Kart Sahibinin Adı"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.card_name}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_number", {
            required: "Kart numarası boş olamaz",
          })}
          size="small"
          label="Kart Numarasını Giriniz"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.card_number}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_expiry_date", {
            required: "Kart son kullanım tarihi boş olamaz",
          })}
          size="small"
          label="Kart Son Kullanma Tarihi"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.card_expiry_date}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("card_cvv", {
            required: "CVV boş olamaz",
          })}
          size="small"
          label="CVV "
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.card_cvv}
        ></TextField>
      </Grid>
    </Grid>
  );
}
