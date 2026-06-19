import Link from "next/link";
import OwnerProductsList from "@/components/ownerproductslist";

export default function MyProductsPage() {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold text-dark m-0 fs-2">My Shop Inventory</h1>
          <p className="text-muted m-0 small">
            Manage and track items you are actively selling.
          </p>
        </div>
        <Link
          href="/my-products/new"
          className="btn btn-dark rounded-pill px-4 fw-medium"
        >
          + Add Product
        </Link>
      </div>

      <OwnerProductsList />
    </div>
  );
}
