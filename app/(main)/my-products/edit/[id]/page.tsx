import { redirect, notFound } from "next/navigation";
import { auth } from "@/app/auth";
import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/product";
import IProduct from "@/interfaces/product";
import ProductForm from "@/components/productform";
import mongoose from "mongoose";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProductDetails(
  productId: string,
  userId: string,
): Promise<IProduct | null> {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return null;
    }

    const doc = await Product.findById(productId).lean();

    if (!doc) return null;

    if (doc.owner.toString() !== userId) {
      redirect("/my-products");
    }

    return {
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      price: doc.price,
      image: doc.image,
      category: doc.category,
      availabilityStatus: doc.availabilityStatus,
      rating: doc.rating,
    };
  } catch (error) {
    console.error("Error loading editing product properties:", error);
    return null;
  }
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const { id } = await params;
  const productData = await getProductDetails(id, session.user.id);

  if (!productData) {
    notFound();
  }

  return (
    <div className="container py-5">
      <ProductForm initialData={productData} />
    </div>
  );
}
