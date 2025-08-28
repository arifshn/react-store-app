import { Grid } from "@mui/material";
import Product from "./Product";
import type { IProduct } from "../models/IProduct";

interface Props {
  products: IProduct[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={2}>
      {products.map((p: IProduct) => (
        <Grid key={p.id} size={{ xs: 6, sm: 4, md: 4, lg: 3 }}>
          <Product key={p.id} product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
