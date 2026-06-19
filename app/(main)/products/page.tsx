import { ProductCardsContainer } from "@/components/productcardscontainer";
import Product from "@/interfaces/product";
import { Suspense } from "react";
import { auth } from "@/app/auth";
const Products = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <>
      <ProductCardsContainer />

      {!isLoggedIn && (
        <div className="container my-5">
          <div className="card text-center border border-primary border-opacity-25 bg-primary bg-opacity-10 rounded-4 p-5 shadow-sm">
            <h3 className="fw-bold text-dark mb-2">
              Want to explore our full catalog?
            </h3>
            <p
              className="text-muted mb-0 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              Sign in to access all available options, reviews, and exclusive
              member discounts.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
const ProductsPage = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Our Products</h1>

      <Suspense
        fallback={
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        }
      >
        <Products />
      </Suspense>
    </div>
  );
};
export default ProductsPage;
