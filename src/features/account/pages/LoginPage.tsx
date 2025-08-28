import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  PersonOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Fade,
} from "@mui/material";
import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 50%, rgba(66, 165, 245, 0.1) 100%)",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              padding: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow:
                "0 20px 40px rgba(25, 118, 210, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s infinite",
              },
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "200% 0" },
                "100%": { backgroundPosition: "-200% 0" },
              },
            }}
            elevation={0}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  m: "0 auto 16px",
                  width: 64,
                  height: 64,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05) rotate(5deg)",
                  },
                }}
              >
                <LockOutlined sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Hoş Geldiniz
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Hesabınıza giriş yapın ve alışverişe devam edin
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mb: 3 }}>
              <Divider>
                <Chip
                  label="Demo Hesapları"
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Divider>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Chip
                  label="Admin: admin / admin123"
                  variant="outlined"
                  color="warning"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
                <Chip
                  label="User: user / user123"
                  variant="outlined"
                  color="info"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{ width: "100%" }}
            >
              <TextField
                {...register("username", {
                  required: "Kullanıcı adı boş olamaz",
                })}
                fullWidth
                label="Kullanıcı Adı"
                margin="normal"
                autoFocus
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />

              <TextField
                {...register("password", {
                  required: "Parola boş olamaz",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 karakter giriniz",
                  },
                })}
                fullWidth
                label="Parola"
                type={showPassword ? "text" : "password"}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "primary.main" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />

              <LoadingButton
                disabled={!isValid}
                loading={isSubmitting}
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(25, 118, 210, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(0, 0, 0, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </LoadingButton>
              <Box sx={{ textAlign: "center" }}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label="veya" size="small" />
                </Divider>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Link
                    component={RouterLink}
                    to="/register"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: "primary.main",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Hesabınız yok mu? Kayıt Olun
                  </Link>

                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Parolanızı mı unuttunuz?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
