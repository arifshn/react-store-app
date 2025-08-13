import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import type { ReviewCreate, ReviewEdit } from "../models/IReview";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchReview,
  clearMessages,
  addReview,
  editReview,
  deleteReview,
} from "../slices/reviewSlice";

export default function ReviewPage() {
  const dispatch = useAppDispatch();
  const { review, loading, error, successMessage } = useAppSelector(
    (state) => state.reviews
  );

  const [formData, setFormData] = useState<ReviewCreate>({
    productId: 1,
    point: 5,
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchReview({ id: 3, productId: 8 }));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || error) {
      const t = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, error, dispatch]);

  const handleAdd = () => {
    dispatch(addReview(formData));
  };

  const handleEdit = () => {
    if (!review) return;
    const editData: ReviewEdit = {
      point: formData.point,
      comment: formData.comment,
      id: 0,
      productId: 0,
    };
    dispatch(editReview({ id: review.id, data: editData }));
  };

  const handleDelete = () => {
    if (!review) return;
    dispatch(deleteReview({ id: review.id, productId: review.productId }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Review Test Page
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      {review && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography>Puan: {review.point}</Typography>
            <Typography>Yorum: {review.comment}</Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        <TextField
          label="Puan"
          type="number"
          value={formData.point}
          onChange={(e) =>
            setFormData({ ...formData, point: Number(e.target.value) })
          }
        />
        <TextField
          label="Yorum"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleAdd}>
          Yorum Ekle
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleEdit}
          disabled={!review}
        >
          Yorumu Düzenle
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          disabled={!review}
        >
          Yorumu Sil
        </Button>
      </Stack>
    </Container>
  );
}
