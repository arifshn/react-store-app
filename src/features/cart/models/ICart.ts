export interface CartItem {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  stock: number;
}
export interface Cart {
  cartId: number;
  customerId: string;
  cartItems: CartItem[];
}
