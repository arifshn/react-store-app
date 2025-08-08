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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountApi } from "../api/accountApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      await accountApi.register(data);
      toast.success("Kayıt işlemi başarıyla tamamlandı. Giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error: any) {
      const { data: errors } = error.response;
      errors.forEach((e: any) => {
        if (e.code === "DuplicateUserName") {
          setError("username", { message: "Bu kullanıcı adı zaten alınmış." });
        } else if (e.code === "DuplicateEmail") {
          setError("email", {
            message: "Bu e-posta adresi zaten kullanılıyor.",
          });
        } else {
          toast.error(e.description || "Bilinmeyen bir hata oluştu.");
        }
      });
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
          Kayıt Ol
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
            {...register("name", {
              required: "İsim boş olamaz",
            })}
            size="small"
            label="İsim Giriniz"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("email", {
              required: "E-posta boş olamaz",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Geçerli bir e-posta adresi giriniz",
              },
            })}
            label="E-posta Adresi Giriniz"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
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
            Kayıt Ol
          </LoadingButton>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Zaten hesabınız var mı? Giriş Yapın"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
