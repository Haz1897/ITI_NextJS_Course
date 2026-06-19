export default interface ProductDetailProps {
  title: string;
  description: string;
  price: number;
  imgSrc: string;
  category?: string;
  rating: number;
  availabilityStatus?: string;
}
