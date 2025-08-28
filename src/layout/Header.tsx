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
  Store,
  Home,
  AccountCircle,
  LocalShipping,
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
  Container,
  Avatar,
  Chip,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/account/slices/accountSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearCart } from "../features/cart/slices/cartSlice";
import ThemeSwitch from "./ThemeSwitch";

const links = [
  { title: "Ürünler", to: "/catalog", icon: <Store /> },
  { title: "Hakkında", to: "/about", icon: <Info /> },
  { title: "İletişim", to: "/contact", icon: <Mail /> },
  { title: "Kampanyalar", to: "/campaigns", icon: <Favorite /> },
];

const navStyles = {
  color: "text.primary",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.95rem",
  px: 2,
  py: 1,
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    color: "primary.main",
    bgcolor: "rgba(25, 118, 210, 0.04)",
    transform: "translateY(-1px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&::before": {
      transform: "scaleX(1)",
      opacity: 1,
    },
  },
  "&.active": {
    color: "primary.main",
    bgcolor: "rgba(25, 118, 210, 0.08)",
    fontWeight: 600,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "2px",
    bgcolor: "primary.main",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: 0,
  },
};

const drawerWidth = 280;

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
        pt: 3,
        background:
          "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          component={NavLink}
          to="/"
          style={{ textDecoration: "none" }}
        >
          Bizim Market
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Modern Alışveriş Deneyimi
        </Typography>
      </Box>

      <Divider sx={{ mx: 3, mb: 2 }} />

      <List sx={{ px: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            sx={{
              borderRadius: "12px",
              py: 1.5,
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
                transform: "scale(1.02)",
                transition: "all 0.2s ease",
              },
            }}
            component={NavLink}
            to="/"
          >
            <Home sx={{ mr: 2, fontSize: 20 }} />
            <ListItemText
              primary="Ana Sayfa"
              sx={{ "& .MuiListItemText-primary": { fontWeight: 500 } }}
            />
          </ListItemButton>
        </ListItem>

        {links.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: "12px",
                py: 1.5,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease",
                },
              }}
              component={NavLink}
              to={item.to}
            >
              {React.cloneElement(item.icon, { sx: { mr: 2, fontSize: 20 } })}
              <ListItemText
                primary={item.title}
                sx={{ "& .MuiListItemText-primary": { fontWeight: 500 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3, mx: 3 }} />

      <List sx={{ px: 2 }}>
        {user ? (
          <>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 1,
                  bgcolor: "primary.main",
                  fontSize: "1.5rem",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1" fontWeight="600">
                Hoş geldin, {user.name}
              </Typography>
              {user.role === "admin" && (
                <Chip
                  label="Admin"
                  size="small"
                  color="primary"
                  sx={{ mt: 0.5 }}
                />
              )}
            </Box>

            {[
              { title: "Siparişlerim", to: "/orders", icon: <LocalShipping /> },
              { title: "Hesabım", to: "/myaccount", icon: <AccountCircle /> },
              { title: "Favorilerim", to: "/favorities", icon: <Favorite /> },
            ].map((item) => (
              <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  sx={{
                    borderRadius: "12px",
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "scale(1.02)",
                      transition: "all 0.2s ease",
                    },
                  }}
                  component={NavLink}
                  to={item.to}
                >
                  {React.cloneElement(item.icon, {
                    sx: { mr: 2, fontSize: 20 },
                  })}
                  <ListItemText
                    primary={item.title}
                    sx={{ "& .MuiListItemText-primary": { fontWeight: 500 } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {user.role === "admin" && (
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  sx={{
                    borderRadius: "12px",
                    py: 1.5,
                    bgcolor: "warning.light",
                    color: "warning.contrastText",
                    "&:hover": {
                      bgcolor: "warning.main",
                      transform: "scale(1.02)",
                      transition: "all 0.2s ease",
                    },
                  }}
                  component={NavLink}
                  to="/admin"
                >
                  <Dashboard sx={{ mr: 2, fontSize: 20 }} />
                  <ListItemText
                    primary="Admin Paneli"
                    sx={{ "& .MuiListItemText-primary": { fontWeight: 600 } }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  color: "error.main",
                  border: "1px solid",
                  borderColor: "error.main",
                  "&:hover": {
                    bgcolor: "error.main",
                    color: "white",
                    transform: "scale(1.02)",
                    transition: "all 0.2s ease",
                  },
                }}
                onClick={handleLogout}
              >
                <ExitToApp sx={{ mr: 2, fontSize: 20 }} />
                <ListItemText
                  primary="Çıkış Yap"
                  sx={{ "& .MuiListItemText-primary": { fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  border: "1px solid",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                    transform: "scale(1.02)",
                    transition: "all 0.2s ease",
                  },
                }}
                component={NavLink}
                to="/login"
              >
                <VpnKey sx={{ mr: 2, fontSize: 20 }} />
                <ListItemText
                  primary="Giriş Yap"
                  sx={{ "& .MuiListItemText-primary": { fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "scale(1.02)",
                    transition: "all 0.2s ease",
                  },
                }}
                component={NavLink}
                to="/register"
              >
                <PersonAdd sx={{ mr: 2, fontSize: 20 }} />
                <ListItemText
                  primary="Kayıt Ol"
                  sx={{ "& .MuiListItemText-primary": { fontWeight: 600 } }}
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
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: "70px", md: "85px" },
              px: { xs: 1, md: 2 },
            }}
          >
            <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: "none" },
                  color: "text.primary",
                  mr: 1,
                  "&:hover": {
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h4"
                component={NavLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: "800",
                  letterSpacing: -0.5,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s ease",
                  },
                }}
              >
                Bizim Market
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 1,
                  ml: 6,
                }}
              >
                {links.map((item) => (
                  <Button
                    component={NavLink}
                    to={item.to}
                    key={item.title}
                    sx={navStyles}
                    startIcon={item.icon}
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
                gap: { xs: 1, md: 2 },
              }}
            >
              <IconButton
                size="large"
                sx={{
                  display: { xs: "block", sm: "none" },
                  "&:hover": {
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                    color: "primary.main",
                  },
                }}
              >
                <Search />
              </IconButton>
              <IconButton
                size="large"
                component={NavLink}
                to="/cart"
                sx={{
                  color: "text.primary",
                  position: "relative",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                <Badge
                  badgeContent={itemCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <ThemeSwitch />
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {user ? (
                  <Box>
                    <Button
                      onClick={handleMenuClick}
                      sx={{
                        ...navStyles,
                        ml: 1,
                        color: "text.primary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "primary.main",
                          fontSize: "0.875rem",
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {user.name}
                      </Box>
                      <KeyboardArrowDown />
                    </Button>

                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 1.5,
                          minWidth: 220,
                          borderRadius: "16px",
                          boxShadow:
                            "0 10px 25px rgba(0,0,0,0.1), 0 6px 10px rgba(0,0,0,0.05)",
                          border: "1px solid",
                          borderColor: "divider",
                          overflow: "visible",
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        component={Link}
                        to="/favorities"
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: "8px",
                          mx: 1,
                          my: 0.5,
                          "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                        }}
                      >
                        <Favorite sx={{ mr: 2, color: "error.main" }} />
                        Favorilerim
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/orders"
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: "8px",
                          mx: 1,
                          my: 0.5,
                          "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                        }}
                      >
                        <LocalShipping sx={{ mr: 2, color: "info.main" }} />
                        Siparişlerim
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/myaccount"
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: "8px",
                          mx: 1,
                          my: 0.5,
                          "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                        }}
                      >
                        <AccountCircle sx={{ mr: 2, color: "primary.main" }} />
                        Hesabım
                      </MenuItem>

                      {user.role === "admin" && (
                        <>
                          <Divider sx={{ my: 1 }} />
                          <MenuItem
                            onClick={() => navigate("/admin")}
                            sx={{
                              py: 1.5,
                              px: 2,
                              borderRadius: "8px",
                              mx: 1,
                              my: 0.5,
                              bgcolor: "warning.light",
                              color: "warning.contrastText",
                              "&:hover": { bgcolor: "warning.main" },
                            }}
                          >
                            <Dashboard sx={{ mr: 2 }} />
                            Admin Paneli
                          </MenuItem>
                        </>
                      )}

                      <Divider sx={{ my: 1 }} />
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          py: 1.5,
                          px: 2,
                          borderRadius: "8px",
                          mx: 1,
                          my: 0.5,
                          color: "error.main",
                          "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" },
                        }}
                      >
                        <ExitToApp sx={{ mr: 2 }} />
                        Çıkış Yap
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Box display="flex" gap={1.5} alignItems="center">
                    <Button
                      component={NavLink}
                      to="/login"
                      sx={{
                        ...navStyles,
                        color: "text.primary",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          borderColor: "primary.main",
                          color: "primary.main",
                          bgcolor: "transparent",
                        },
                      }}
                      startIcon={<VpnKey />}
                    >
                      Giriş
                    </Button>
                    <Button
                      component={NavLink}
                      to="/register"
                      variant="contained"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                        "&:hover": {
                          bgcolor: "primary.dark",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "background.paper",
              borderRadius: "0 20px 20px 0",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
