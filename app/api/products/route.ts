import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import Product from "@/models/product";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectToDB";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let query = Product.find({});

    if (limit && !isNaN(limit) && limit > 0) {
      query = query.limit(limit);
    }

    const products = await query.lean();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, price, image, category, availabilityStatus } =
      body;

    if (!title || !description || !price || !image || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      image,
      category,
      availabilityStatus: availabilityStatus || "In Stock",
      rating: 0,
      owner: new mongoose.Types.ObjectId(session.user.id),
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 },
    );
  }
}
