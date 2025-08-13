import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Paper,
  Divider,
  Chip,
  Stack,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import {
  ShoppingCartRounded,
  LocalShippingRounded,
  DiscountRounded,
} from "@mui/icons-material";
import { useAppSelector } from "../../../store/store";
import { currencyTRY } from "../../../utils/formatCurrency";

export default function Info() {
  const { cart } = useAppSelector((state) => state.cart);
  const subTotal =
    cart?.cartItems.reduce(
      (toplam, item) => toplam + item.quantity * item.price,
      0
    ) ?? 0;

  const shippingCost = subTotal > 500 ? 0 : 29.9;
  const totalItems =
    cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const finalTotal = subTotal + shippingCost;

  return (
    <Fade in timeout={800}>
      <Card
        elevation={0}
        sx={{
          height: "fit-content",
          border: 1,
          borderColor: "divider",
          borderRadius: { xs: 2, md: 3 },
          overflow: "hidden",
          position: { xs: "static", md: "sticky" },
          top: { md: 20 },
          mx: { xs: 0, md: "auto" },
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: { xs: 2, md: 3 },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, md: 2 }}
          >
            <Box
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                borderRadius: "50%",
                bgcolor: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartRounded
                sx={{
                  color: "primary.main",
                  fontSize: { xs: 18, md: 20 },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
              >
                Sepet Özeti
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                }}
              >
                {totalItems} ürün seçildi
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              maxHeight: { xs: 250, md: 300 },
              overflowY: "auto",
              p: { xs: 1.5, md: 2 },
            }}
          >
            {cart?.cartItems.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="text.secondary" variant="body2">
                  Sepetiniz boş
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {cart?.cartItems.map((item, index) => (
                  <ListItem
                    key={item.productId}
                    sx={{
                      py: { xs: 1.5, md: 2 },
                      px: { xs: 0.5, md: 1 },
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      animation: `slideIn 0.3s ease ${index * 0.1}s both`,
                      "@keyframes slideIn": {
                        from: {
                          opacity: 0,
                          transform: "translateX(-20px)",
                        },
                        to: {
                          opacity: 1,
                          transform: "translateX(0)",
                        },
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={`http://localhost:5163/images/${item.imageUrl}`}
                        sx={{
                          width: { xs: 48, md: 56 },
                          height: { xs: 48, md: 56 },
                          border: 2,
                          borderColor: "divider",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ ml: { xs: 1, md: 2 } }}
                      primary={
                        <Typography
                          variant="subtitle2"
                          fontWeight="medium"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "120px", md: "150px" },
                            fontSize: { xs: "0.825rem", md: "0.875rem" },
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={{ xs: 0.5, sm: 1 }}
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          mt={0.5}
                        >
                          <Chip
                            label={`${item.quantity} adet`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{
                              fontSize: { xs: "0.65rem", md: "0.75rem" },
                              height: { xs: 18, md: 20 },
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.65rem", md: "0.75rem" } }}
                          >
                            {currencyTRY.format(item.price)}/adet
                          </Typography>
                        </Stack>
                      }
                    />
                    <Box textAlign="right">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary.main"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                      >
                        {currencyTRY.format(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Divider />
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={{ xs: 1.5, md: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Ara Toplam
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  {currencyTRY.format(subTotal)}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5, md: 1 }}
                >
                  <LocalShippingRounded
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: 16, md: 18 },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                  >
                    Kargo
                  </Typography>
                </Stack>
                <Box textAlign="right">
                  {shippingCost === 0 ? (
                    <Stack alignItems="flex-end">
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        color="success.main"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                      >
                        Ücretsiz
                      </Typography>
                      <Typography
                        variant="caption"
                        color="success.main"
                        sx={{ fontSize: { xs: "0.65rem", md: "0.75rem" } }}
                      >
                        🎉 500₺ üzeri
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack alignItems="flex-end">
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                      >
                        {currencyTRY.format(shippingCost)}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.65rem", md: "0.75rem" } }}
                      >
                        500₺ üzeri ücretsiz
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: { xs: 1.5, md: 2 },
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "primary.main",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary.main"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Toplam Tutar
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary.main"
                  sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
                >
                  {currencyTRY.format(finalTotal)}
                </Typography>
              </Box>

              {shippingCost > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    bgcolor: "warning.light",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "warning.main",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5, md: 1 }}
                    mb={1}
                  >
                    <DiscountRounded
                      sx={{
                        color: "warning.main",
                        fontSize: { xs: 16, md: 18 },
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="warning.dark"
                      sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                    >
                      Ücretsiz kargo için
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "warning.light",
                      borderRadius: 1,
                      height: { xs: 6, md: 8 },
                      mb: 1,
                      border: 1,
                      borderColor: "warning.main",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${Math.min((subTotal / 500) * 100, 100)}%`,
                        height: "100%",
                        bgcolor: "warning.main",
                        borderRadius: 1,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    color="warning.dark"
                    sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                  >
                    {currencyTRY.format(500 - subTotal)} daha ekleyin!
                  </Typography>
                </Paper>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}
