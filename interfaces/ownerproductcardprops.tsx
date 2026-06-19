import Product from "./product";

export interface OwnerProductCardProps {
  product: Product;
  onDelete: (id: string | number) => void;
}
