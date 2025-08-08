import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useForm, type FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { getCart } from "../../cart/slices/cartSlice";
import { loginUser } from "../slices/accountSlice";

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
    try {
      await dispatch(loginUser(data));
      await dispatch(getCart());
      navigate(location.state?.from || "/catalog");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
        elevation={3}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Giriş Yap
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("username", {
              required: "Kullanıcı adı boş olamaz",
            })}
            size="small"
            label="Kullanıcı Adı Giriniz"
            fullWidth
            margin="normal"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", {
              required: "Parola boş olamaz",
              minLength: { value: 6, message: "Minimum 6 karakter giriniz" },
            })}
            size="small"
            label="Parola Giriniz"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş Yap
          </LoadingButton>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Hesabınız yok mu? Kayıt Olun"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
