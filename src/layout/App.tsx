import { useEffect, useState } from "react";
import { Box, CircularProgress, CssBaseline, Typography } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../store/store";
import { getCart } from "../features/cart/cartSlice";
import Header from "./Header";
import { getUser } from "../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} color="secondary" />
        <Typography variant="h5" color="text.secondary">
          Yükleniyor...
        </Typography>
      </Box>
    );
  }
  return (
    <>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default App;
