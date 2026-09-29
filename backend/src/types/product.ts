export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductFilters {
  name?: string;
  status?: boolean;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  status?: boolean;
}
