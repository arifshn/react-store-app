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
import ThemeSwitch from "./ThemeSwitch";

const links = [
  { title: "Katalog", to: "/catalog", icon: <Search /> },
  { title: "Hakkında", to: "/about", icon: <Info /> },
  { title: "İletişim", to: "/contact", icon: <Mail /> },
  { title: "Hata Test", to: "/error", icon: <Favorite /> },
];

const navStyles = {
  color: "text.primary",
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
        pt: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ my: 2, fontWeight: "bold", color: "primary.main" }}
        component={NavLink}
        to="/"
        style={{ textDecoration: "none" }}
      >
        calmora
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              justifyContent: "center",
              py: 1.5,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            component={NavLink}
            to="/"
          >
            <ListItemText
              primary="Ana Sayfa"
              sx={{ color: "text.primary", fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>
        {links.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={{
                justifyContent: "center",
                py: 1.5,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              component={NavLink}
              to={item.to}
            >
              <ListItemText
                primary={item.title}
                sx={{ color: "text.primary" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center", py: 1.5 }}
                component={NavLink}
                to="/orders"
              >
                <ListItemText
                  primary="Siparişlerim"
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center", py: 1.5 }}
                component={NavLink}
                to="/favorities"
              >
                <ListItemText
                  primary="Favorilerim"
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            </ListItem>
            {user.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ justifyContent: "center", py: 1.5 }}
                  component={NavLink}
                  to="/admin"
                >
                  <ListItemText
                    primary="Admin Paneli"
                    sx={{ color: "text.primary" }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center", py: 1.5, color: "error.main" }}
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
                sx={{ justifyContent: "center", py: 1.5 }}
                component={NavLink}
                to="/login"
              >
                <ListItemText
                  primary="Giriş Yap"
                  sx={{ color: "text.primary" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center", py: 1.5 }}
                component={NavLink}
                to="/register"
              >
                <ListItemText
                  primary="Kayıt Ol"
                  sx={{ color: "text.primary" }}
                />
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
        sx={{
          boxShadow: 3,
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: { xs: "64px", md: "80px" },
            px: { xs: 2, md: 4 },
          }}
        >
          <Box display="flex" alignItems="center">
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
                fontSize: { xs: "1.25rem", sm: "2rem" },
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
                  endIcon={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, md: 2 },
              ml: "auto",
            }}
          >
            <IconButton
              size="large"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Search />
            </IconButton>
            <IconButton
              size="large"
              component={NavLink}
              to="/cart"
              sx={{
                color: "text.primary",
                "&:hover": { color: "warning.main" },
              }}
            >
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <ThemeSwitch />
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {user ? (
                <Box>
                  <Button
                    onClick={handleMenuClick}
                    endIcon={<KeyboardArrowDown />}
                    sx={{ ...navStyles, ml: 2, color: "text.primary" }}
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
                </Box>
              ) : (
                <Box display="flex" gap={1}>
                  <Button
                    component={NavLink}
                    to="/login"
                    sx={{
                      ...navStyles,
                      "&:hover": {
                        ...navStyles["&:hover"],
                        bgcolor: "transparent",
                      },
                    }}
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
                      color: "white",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "scale(1.05)",
                        transition: "transform 0.2s ease-in-out",
                      },
                    }}
                    startIcon={<PersonAdd />}
                  >
                    Kayıt Ol
                  </Button>
                </Box>
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
              bgcolor: "background.paper",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
