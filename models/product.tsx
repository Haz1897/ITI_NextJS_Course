import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  availabilityStatus: string;
  rating: number;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    availabilityStatus: {
      type: String,
      required: true,
      default: "In Stock",
      enum: ["In Stock", "Low Stock", "Out of Stock"],
    },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
