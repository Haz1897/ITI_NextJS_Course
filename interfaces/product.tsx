export default interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  availabilityStatus: string;
  rating: number;
  userOwnerEmail?: string;
  error?: string;
}
