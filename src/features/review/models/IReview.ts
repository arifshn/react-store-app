export interface ReviewCreate {
  productId: number;
  point: number;
  comment: string;
}

export interface ReviewEdit extends ReviewCreate {
  id: number;
}

export interface ReviewDetail {
  id: number;
  productId: number;
  point: number;
  comment: string;
}

export interface ApiMessage {
  message: string;
}

export interface ApiError {
  error: string;
}
