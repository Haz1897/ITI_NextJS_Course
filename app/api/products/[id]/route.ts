import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import Product from "@/models/product";
import { connectToDB } from "@/lib/connectToDB";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDB();
    const { id } = await params;
    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await connectToDB();
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.owner.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this product" },
        { status: 403 },
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.owner.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You do not own this product" },
        { status: 403 },
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 },
    );
  }
}
