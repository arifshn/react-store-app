import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigate, Outlet } from "react-router";
import AdminHeader from "../../layout/AdminHeader";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCart } from "../cart/cartSlice";
import { getUser } from "../account/accountSlice";
import { CircularProgress } from "@mui/material";

export default function AdminLayout() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAppSelector((state) => state.account);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getCart());
    await dispatch(getUser());
  };
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);
  if (loading) return <CircularProgress />;
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if ((user.role?.toLowerCase() ?? "") !== "admin") {
    return <Navigate to="/error" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminHeader
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={{ minHeight: "64px" }} />
        <Outlet />
      </Box>
    </Box>
  );
}
