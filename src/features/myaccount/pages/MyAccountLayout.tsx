import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router";

const MyAccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Kullanıcı Bilgileri", path: "profile" },
    { label: "Şifre Değiştir", path: "password" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        p: { xs: 1, md: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          flex: { xs: "none", md: "0 0 25%" },
          width: { xs: "100%", md: "25%" },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hesabım
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname.endsWith(item.path)}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 3 },
          flex: { xs: "none", md: "0 0 75%" },
          width: { xs: "100%", md: "75%" },
          minHeight: "60vh",
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default MyAccountLayout;
