import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

import { loginUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function submitForm(data: FieldValues) {
    await dispatch(loginUser(data));
    await dispatch(getCart());
    navigate(location.state?.from || "/catalog");
  }

  console.log(errors);

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={5}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
            backgroundColor: "primary",
          }}
        >
          <LockOutlined></LockOutlined>
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Giriş Yap
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            {...register("username", {
              required: "Kullanıcı adı boş olamaz",
            })}
            size="small"
            label="Kullanıcı Adı Giriniz"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "Parola boş olamaz",
              minLength: { value: 6, message: "Minimum 6 karakter giriniz" },
            })}
            size="small"
            label="Parola Giriniz"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Giriş Yap
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
