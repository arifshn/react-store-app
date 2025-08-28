import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  PersonOutline,
  EmailOutlined,
  AccountCircleOutlined,
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
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accountApi } from "../api/accountApi";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Çok Zayıf",
    color: "#f44336",
  });

  const {
    register,
    handleSubmit,
    setError,
    watch,
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

  const watchPassword = watch("password");

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 6) score += 20;
    if (password.length >= 8) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;

    if (score <= 20) return { score, label: "Çok Zayıf", color: "#f44336" };
    if (score <= 40) return { score, label: "Zayıf", color: "#ff9800" };
    if (score <= 60) return { score, label: "Orta", color: "#ffeb3b" };
    if (score <= 80) return { score, label: "İyi", color: "#4caf50" };
    return { score, label: "Mükemmel", color: "#2e7d32" };
  };

  useState(() => {
    if (watchPassword) {
      setPasswordStrength(calculatePasswordStrength(watchPassword));
    }
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 50%, rgba(139, 195, 74, 0.1) 100%)",
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
                "0 20px 40px rgba(76, 175, 80, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #4caf50, #8bc34a, #4caf50)",
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
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05) rotate(-5deg)",
                  },
                }}
              >
                <AccountCircleOutlined sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Hesap Oluşturun
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Birkaç adımda hesabınızı oluşturun ve alışverişe başlayın
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mb: 3 }}>
              <Divider>
                <Chip
                  label="Üyelik Avantajları"
                  size="small"
                  sx={{
                    bgcolor: "success.main",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Divider>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Chip
                  label="🎯 Özel İndirimler"
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
                <Chip
                  label="🚚 Ücretsiz Kargo"
                  variant="outlined"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
                <Chip
                  label="⭐ Puan Kazanın"
                  variant="outlined"
                  color="success"
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
                  minLength: {
                    value: 3,
                    message: "En az 3 karakter olmalıdır",
                  },
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
                      <PersonOutline color="success" />
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
                      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />

              <TextField
                {...register("name", {
                  required: "İsim boş olamaz",
                  minLength: {
                    value: 2,
                    message: "En az 2 karakter olmalıdır",
                  },
                })}
                fullWidth
                label="Ad Soyad"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlined color="success" />
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
                      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />

              <TextField
                {...register("email", {
                  required: "E-posta boş olamaz",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Geçerli bir e-posta adresi giriniz",
                  },
                })}
                fullWidth
                label="E-posta Adresi"
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="success" />
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
                      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
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
                  onChange: (e) => {
                    setPasswordStrength(
                      calculatePasswordStrength(e.target.value)
                    );
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
                      <LockOutlined color="success" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "success.main" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      boxShadow: "0 0 0 2px rgba(76, 175, 80, 0.2)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
              {watchPassword && (
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Parola Gücü:
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: passwordStrength.color, fontWeight: 600 }}
                    >
                      {passwordStrength.label}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength.score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: passwordStrength.color,
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

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
                    "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                  boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #388e3c 0%, #4caf50 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(76, 175, 80, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(0, 0, 0, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {isSubmitting ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
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
                    to="/login"
                    sx={{
                      textDecoration: "none",
                      color: "success.main",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: "success.main",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "success.main",
                        color: "white",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Zaten hesabınız var mı? Giriş Yapın
                  </Link>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                    display: "block",
                    lineHeight: 1.5,
                  }}
                >
                  Hesap oluşturarak{" "}
                  <Link href="#" color="success.main">
                    Kullanım Şartları
                  </Link>{" "}
                  ve{" "}
                  <Link href="#" color="success.main">
                    Gizlilik Politikası
                  </Link>
                  nı kabul etmiş sayılırsınız.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
