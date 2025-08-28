import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { changePassword } from "../../account/slices/accountSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = async () => {
    if (!user) return;
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    try {
      await dispatch(
        changePassword({
          userId: user.id,
          currentPassword,
          newPassword,
          newPasswordRestart: confirmPassword,
        })
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Şifre değiştirilemedi!");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Şifre Değiştir
      </Typography>
      <TextField
        label="Eski Şifre"
        type="password"
        fullWidth
        margin="normal"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <TextField
        label="Yeni Şifre"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        label="Yeni Şifre (Tekrar)"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleChange}>
        Parolayı Değiştir
      </Button>
    </Box>
  );
};

export default ChangePassword;
