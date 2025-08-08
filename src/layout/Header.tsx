import * as React from "react";
import {
  ShoppingCart,
  KeyboardArrowDown,
  Menu as MenuIcon,
  ExitToApp,
  PersonAdd,
  VpnKey,
  Search,
  Info,
  Mail,
  Favorite,
  Dashboard,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/account/slices/accountSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearCart } from "../features/cart/slices/cartSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const links = [
  { title: "Katalog", to: "/catalog", icon: <Search /> },
  { title: "Hakkında", to: "/about", icon: <Info /> },
  { title: "İletişim", to: "/contact", icon: <Mail /> },
  { title: "Hata Test", to: "/error", icon: <Favorite /> },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "warning.main",
    transform: "scale(1.05)",
    transition: "transform 0.2s ease-in-out",
  },
  "&.active": {
    color: "warning.main",
    borderBottom: "2px solid",
    borderColor: "warning.main",
  },
  typography: "body1",
};

const drawerWidth = 240;

interface HeaderProps {
  onThemeChange: () => void;
}

export default function Header({ onThemeChange }: HeaderProps) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const itemCount = cart?.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    handleMenuClose();
    navigate("/");
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "background.default",
        height: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ my: 2, fontWeight: "bold", color: "primary.main" }}
      >
        calmora
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={NavLink}
            to="/"
          >
            <ListItemText primary="Ana Sayfa" />
          </ListItemButton>
        </ListItem>
        {links.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={NavLink}
              to={item.to}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={NavLink}
                to="/orders"
              >
                <ListItemText primary="Siparişlerim" />
              </ListItemButton>
            </ListItem>
            {user.role === "Admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={NavLink}
                  to="/admin"
                >
                  <ListItemText primary="Admin Paneli" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleLogout}
              >
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={NavLink}
                to="/login"
              >
                <ListItemText primary="Giriş Yap" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component={NavLink}
                to="/register"
              >
                <ListItemText primary="Kayıt Ol" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ boxShadow: 3, bgcolor: "background.paper" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
            padding: "0 24px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
              letterSpacing: 2,
              ml: { xs: 0, sm: 2 },
            }}
          >
            calmora
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 3,
              ml: 4,
            }}
          >
            {links.map((item) => (
              <Button
                component={NavLink}
                to={item.to}
                key={item.title}
                sx={navStyles}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              ml: "auto",
            }}
          >
            <IconButton
              component={NavLink}
              to="/cart"
              size="large"
              sx={{
                color: "text.primary",
                "&:hover": {
                  color: "warning.main",
                },
              }}
            >
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton onClick={onThemeChange} color="inherit">
              <DarkModeIcon />
            </IconButton>

            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {user ? (
                <>
                  <Button
                    onClick={handleMenuClick}
                    endIcon={<KeyboardArrowDown />}
                    sx={{ ...navStyles, color: "text.primary" }}
                  >
                    {user.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: { mt: 1, boxShadow: 3, borderRadius: 2 },
                    }}
                  >
                    <MenuItem component={Link} to="/favorities">
                      <Favorite sx={{ mr: 1 }} /> Favorilerim
                    </MenuItem>
                    <MenuItem component={Link} to="/orders">
                      <ShoppingCart sx={{ mr: 1 }} /> Siparişlerim
                    </MenuItem>
                    {user.role === "admin" && (
                      <MenuItem onClick={() => navigate("/admin")}>
                        <Dashboard sx={{ mr: 1 }} /> Admin Paneli
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ color: "error.main" }}
                    >
                      <ExitToApp sx={{ mr: 1 }} /> Çıkış Yap
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={NavLink}
                    to="/login"
                    sx={{ ...navStyles, color: "text.primary" }}
                    startIcon={<VpnKey />}
                  >
                    Giriş Yap
                  </Button>
                  <Button
                    component={NavLink}
                    to="/register"
                    variant="contained"
                    color="primary"
                    sx={{
                      ...navStyles,
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    startIcon={<PersonAdd />}
                  >
                    Kayıt Ol
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
