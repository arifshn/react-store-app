import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../store/store";
import { getCart } from "../features/cart/slices/cartSlice";
import Header from "./Header";
import { getUser } from "../features/account/slices/accountSlice";
import React from "react";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header onThemeChange={handleThemeChange} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
