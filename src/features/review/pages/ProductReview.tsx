import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Rating,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchReview,
  addReview,
  editReview,
  deleteReview,
  clearMessages,
  fetchAllReviewsForProduct,
} from "../slices/reviewSlice";

interface ProductReviewProps {
  productId: number;
  reviewId: number | null;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  productId,
  reviewId,
}) => {
  const dispatch = useAppDispatch();

  const { review, allReviews, loading, error, successMessage } = useAppSelector(
    (state) => state.reviews
  );

  const [point, setPoint] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchAllReviewsForProduct(productId));
    dispatch(clearMessages());
  }, [dispatch, productId]);

  useEffect(() => {
    if (reviewId !== null) {
      dispatch(fetchReview({ id: reviewId, productId }));
    } else {
      setPoint(5);
      setComment("");
    }
  }, [dispatch, productId, reviewId]);

  useEffect(() => {
    if (review) {
      setPoint(review.point);
      setComment(review.comment);
    }
  }, [review]);

  const handleAddOrEdit = async () => {
    if (!comment.trim()) {
      alert("Yorum boş bırakılamaz.");
      return;
    }

    if (reviewId === null) {
      const resultAction = await dispatch(
        addReview({ productId, point, comment })
      );
      if (addReview.fulfilled.match(resultAction)) {
        dispatch(fetchAllReviewsForProduct(productId));
        setPoint(5);
        setComment("");
      }
    } else {
      const resultAction = await dispatch(
        editReview({
          id: reviewId,
          data: { id: reviewId, productId, point, comment },
        })
      );
      if (editReview.fulfilled.match(resultAction)) {
        dispatch(fetchAllReviewsForProduct(productId));
      }
    }
  };

  const handleDelete = async () => {
    if (reviewId !== null) {
      const resultAction = await dispatch(
        deleteReview({ id: reviewId, productId })
      );
      if (deleteReview.fulfilled.match(resultAction)) {
        setPoint(5);
        setComment("");
      }
    }
  };

  const handleCloseSnackbar = () => {
    dispatch(clearMessages());
  };
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        fontWeight="bold"
        color="primary.main"
      >
        Ürün Yorumları
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{ mb: 4, p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          {reviewId === null ? "Yorumunuzu Ekleyin" : "Yorumunuzu Düzenleyin"}
        </Typography>
        {loading && <CircularProgress size={24} />}
        {error && (
          <Alert severity="error" onClose={handleCloseSnackbar} sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert
            severity="success"
            onClose={handleCloseSnackbar}
            sx={{ mt: 2 }}
          >
            {successMessage}
          </Alert>
        )}

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography component="legend" sx={{ mr: 2, fontWeight: "bold" }}>
              Puan:
            </Typography>
            <Rating
              name="product-rating"
              value={point}
              precision={1}
              onChange={(event, newValue) => {
                setPoint(newValue || 0);
              }}
              size="large"
            />
          </Box>

          <TextField
            label="Yorumunuzu yazın..."
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
            variant="outlined"
          />

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrEdit}
              disabled={loading || !comment.trim() || point === 0}
            >
              {reviewId === null ? "Yorum Ekle" : "Yorumu Güncelle"}
            </Button>

            {reviewId !== null && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                disabled={loading}
              >
                Yorumu Sil
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
        Tüm Yorumlar ({allReviews.length})
      </Typography>
      {allReviews.length === 0 && !loading && !error && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontStyle: "italic" }}
        >
          Bu ürüne henüz yorum yapılmamış. İlk yorumu siz yapın!
        </Typography>
      )}

      <List>
        {allReviews.map((r) => (
          <React.Fragment key={r.id}>
            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="span"
                      fontWeight="bold"
                    >
                      Anonim Kullanıcı
                    </Typography>
                    <Rating
                      name={`read-only-${r.id}`}
                      value={r.point}
                      readOnly
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Typography
                    sx={{ display: "block", mt: 1 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {r.comment}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ProductReview;
