import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { selectCategoryById } from "../categories/categoriesSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CategoriesFormProps {
  categoriesId: number | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CategoriesForm({
  categoriesId,
  onClose,
  onSubmit,
}: CategoriesFormProps) {
  const category = useAppSelector((state) =>
    categoriesId ? selectCategoryById(state, categoriesId) : null
  );

  const [formState, setFormState] = useState({
    id: category?.id ?? 0,
    kategoriadi: category?.kategoriAdi ?? "",
    url: category?.url ?? "",
  });

  useEffect(() => {
    if (category) {
      setFormState({
        id: category.id,
        kategoriadi: category.kategoriAdi,
        url: category.url,
      });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formState);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        {categoriesId ? "Kategori Güncellendi" : "Yeni Kategori Eklendi"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Kategori Adı"
          name="kategoriadi"
          value={formState.kategoriadi}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Url"
          name="url"
          value={formState.url}
          onChange={handleChange}
        ></TextField>
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
