import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Info from "./Info";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { useAppDispatch } from "../../../store/store";
import { clearCart } from "../../cart/slices/cartSlice";
import { LoadingButton } from "@mui/lab";
import { ordersApi } from "../../orders/api/ordersApi";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Bilinmeyen bir hata oluştu");
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleNext(data: FieldValues) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        setOrderId(await ordersApi.createOrder(data));
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }

  return (
    <FormProvider {...methods}>
      <Box sx={{ p: { xs: 2, md: 0 } }}>
        <Paper sx={{ overflow: "hidden" }}>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}
          >
            {activeStep !== steps.length && (
              <Box
                sx={{
                  display: { xs: "none", lg: "block" },
                  width: { lg: "400px" },
                  flexShrink: 0,
                  borderRight: "1px solid",
                  borderColor: "divider",
                  p: { lg: 3 },
                  bgcolor: "grey.50",
                }}
              >
                <Info />
              </Box>
            )}
            {activeStep !== steps.length && (
              <Box
                sx={{
                  display: { xs: "block", lg: "none" },
                  mb: 2,
                }}
              >
                <Info />
              </Box>
            )}

            <Box
              sx={{
                flex: 1,
                p: { xs: 2, md: 3, lg: 4 },
                minWidth: 0,
              }}
            >
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Stepper
                  activeStep={activeStep}
                  sx={{
                    height: { xs: "auto", md: 40 },
                    "& .MuiStepLabel-root": {
                      flexDirection: { xs: "column", sm: "row" },
                    },
                    "& .MuiStepLabel-label": {
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    },
                    "& .MuiStepLabel-iconContainer": {
                      paddingRight: { xs: 0, sm: 1 },
                    },
                  }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Box>
                {activeStep === steps.length ? (
                  <Box
                    sx={{
                      textAlign: { xs: "center", md: "left" },
                      py: { xs: 4, md: 6 },
                    }}
                  >
                    <Stack
                      spacing={3}
                      alignItems={{ xs: "center", md: "flex-start" }}
                      sx={{ maxWidth: { xs: "100%", md: "500px" }, mx: "auto" }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: "4rem", md: "6rem" },
                          mb: 2,
                        }}
                      >
                        📦
                      </Typography>
                      <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        color="primary.main"
                        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                      >
                        Teşekkür Ederiz!
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                          color: "text.primary",
                        }}
                      >
                        Siparişinizi başarıyla aldık
                      </Typography>
                      <Box
                        sx={{
                          p: 3,
                          bgcolor: "primary.light",
                          borderRadius: 2,
                          border: 1,
                          borderColor: "primary.main",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="primary.dark"
                          sx={{ mb: 1 }}
                        >
                          Sipariş Numaranız
                        </Typography>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          color="primary.main"
                          sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                        >
                          #{orderId}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        Siparişiniz onaylandığında size bir e-posta
                        göndereceğiz. Kargo takip bilgileri de e-posta ile
                        paylaşılacaktır.
                      </Typography>
                      <Box sx={{ pt: 2, width: "100%" }}>
                        <Button
                          variant="contained"
                          size="large"
                          sx={{
                            py: 1.5,
                            px: 4,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            fontWeight: "bold",
                            width: { xs: "100%", sm: "auto" },
                            minWidth: { sm: "200px" },
                          }}
                        >
                          Siparişleri Görüntüle
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                ) : (
                  <form onSubmit={methods.handleSubmit(handleNext)}>
                    <Box sx={{ mb: 4 }}>{getStepContent(activeStep)}</Box>
                    <Box
                      sx={{
                        pt: 3,
                        borderTop: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 2,
                          justifyContent:
                            activeStep !== 0 ? "space-between" : "flex-end",
                        }}
                      >
                        {activeStep !== 0 && (
                          <Button
                            startIcon={<ChevronLeftRounded />}
                            variant="outlined"
                            onClick={handlePrevious}
                            size="large"
                            sx={{
                              order: { xs: 2, sm: 1 },
                              py: 1.5,
                              px: 3,
                              fontSize: { xs: "1rem", sm: "0.875rem" },
                              fontWeight: "medium",
                            }}
                          >
                            Geri
                          </Button>
                        )}
                        <LoadingButton
                          type="submit"
                          loading={loading}
                          endIcon={<ChevronRightRounded />}
                          variant="contained"
                          size="large"
                          sx={{
                            order: { xs: 1, sm: 2 },
                            py: 1.5,
                            px: 4,
                            fontSize: { xs: "1rem", sm: "0.875rem" },
                            fontWeight: "bold",
                            minWidth: { xs: "auto", sm: "160px" },
                          }}
                        >
                          {activeStep === 2 ? "Siparişi Tamamla" : "İleri"}
                        </LoadingButton>
                      </Box>
                    </Box>
                  </form>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
