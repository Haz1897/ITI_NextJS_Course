import Product from "@/interfaces/product";
import { ProductDetails } from "@/components/productdetails";
import { redirect } from "next/navigation";
const ID = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-cache",
  });
  const product: Product = await res.json();
  console.log(product);
  if (product.error) redirect("/product-not-found");
  return (
    <>
      <ProductDetails
        title={product.title}
        description={product.description}
        price={product.price}
        imgSrc={product.image}
        category={product.category}
        availabilityStatus={product.availabilityStatus}
        rating={product.rating}
      ></ProductDetails>
    </>
  );
};

export default ID;
