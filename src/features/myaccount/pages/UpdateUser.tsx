import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { updateUser } from "../../account/slices/accountSlice";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";

const UpdateUser = () => {
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = async () => {
    try {
      await dispatch(updateUser({ name, email })).unwrap();
    } catch (err) {
      toast.error("Güncelleme başarısız!");
      console.log(err);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profil Bilgilerini Düzenle
      </Typography>
      <TextField
        label="İsim"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Güncelle
      </Button>
    </Box>
  );
};
export default UpdateUser;
