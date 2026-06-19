"use server";

import { auth } from "@/app/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export interface ActionState {
  success: boolean;
  error: string | null;
}

export async function saveProductAction(
  prevState: ActionState,
  formData: FormData,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const availabilityStatus = formData.get("availabilityStatus") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !description || isNaN(price) || !category || !imageUrl) {
    return { success: false, error: "All fields are required" };
  }

  try {
    const payload = {
      title,
      description,
      price,
      image: imageUrl,
      category,
      availabilityStatus,
    };

    let url = "http://localhost:3000/api/products";
    let method = "POST";

    if (id) {
      url = `http://localhost:3000/api/products/${id}`;
      method = "PUT";
    }

    const nextHeaders = await headers();

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: nextHeaders.get("cookie") || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Server responded with ${response.status}`,
      };
    }

    revalidatePath("/my-products");
    return { success: true, error: null };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected API connection error occurred",
    };
  }
}
