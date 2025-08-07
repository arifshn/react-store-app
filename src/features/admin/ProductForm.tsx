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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { selectAllCategories } from "../categories/categoriesSlice";

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
  const categories = useAppSelector(selectAllCategories);

  const [formState, setFormState] = useState({
    id: product?.id ?? 0,
    name: product?.name ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? "",
    imageUrl: product?.imageUrl ?? "",
    isActive: product?.isActive ?? true,
    categoryId: product?.categoryID ?? "",
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
        categoryId: product.categoryID ?? "",
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      categoryId: Number(e.target.value) || "",
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { id, ...dataToSend } = formState;
    const finalData = {
      id,
      ...dataToSend,
      price: Number(dataToSend.price),
      stock: Number(dataToSend.stock),
      categoryId: Number(dataToSend.categoryId),
    };
    console.log("Gönderilen formState id:", formState);
    console.log("Gönderilen veri:", finalData);
    onSubmit(finalData);
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
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Fiyat"
          name="price"
          type="number"
          value={formState.price}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Stok"
          name="stock"
          type="number"
          value={formState.stock}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Açıklama"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Görsel URL"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Kategori</InputLabel>
          <Select
            label="kategori"
            name="categoryId"
            value={formState.categoryId ?? ""}
            onChange={handleSelectChange}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.kategoriAdi}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.isActive}
              onChange={handleInputChange}
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
