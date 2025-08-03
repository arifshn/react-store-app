import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { selectProductById } from "../catalog/catalogSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface ProductFormProps {
  productId: number | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ProductForm({
  productId,
  onClose,
  onSubmit,
}: ProductFormProps) {
  const product = useAppSelector((state) =>
    productId ? selectProductById(state, productId) : null
  );

  const [formState, setFormState] = useState({
    id: product?.id ?? 0,
    name: product?.name ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? "",
    imageUrl: product?.imageUrl ?? "",
    isActive: product?.isActive ?? true,
  });

  useEffect(() => {
    if (product) {
      setFormState({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formState);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        {productId ? "Ürün Güncelle" : "Yeni Ürün Ekle"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Ürün Adı"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Fiyat"
          name="price"
          type="number"
          value={formState.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Stok"
          name="stock"
          type="number"
          value={formState.stock}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Açıklama"
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Görsel URL"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.isActive}
              onChange={handleChange}
              name="isActive"
            />
          }
          label="Aktif"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
