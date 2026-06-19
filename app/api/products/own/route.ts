import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import Product from "@/models/product";
import { connectToDB } from "@/lib/connectToDB";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDB();

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userProducts = await Product.find({
      owner: new mongoose.Types.ObjectId(session.user.id),
    }).lean();

    const serializedProducts = userProducts.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      price:
        typeof doc.price === "number"
          ? doc.price
          : parseFloat(doc.price || "0"),
      image: doc.image,
      category: doc.category,
      availabilityStatus: doc.availabilityStatus || "In Stock",
      rating: doc.rating || 0,
    }));

    return NextResponse.json(serializedProducts, { status: 200 });
  } catch (error: any) {
    console.error("Database endpoint error details:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch user products" },
      { status: 500 },
    );
  }
}
