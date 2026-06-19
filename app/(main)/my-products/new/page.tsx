import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import ProductForm from "@/components/productform";

export default async function NewProductPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container py-5">
      <ProductForm />
    </div>
  );
}
