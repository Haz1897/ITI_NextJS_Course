"use client";

import { useState } from "react";
import Link from "next/link";
import IProduct from "@/interfaces/product";

interface OwnerProductCardProps {
  product: IProduct;
  onDelete: (id: string | number) => Promise<void>;
}

const OwnerProductCard = ({ product, onDelete }: OwnerProductCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(product.id!);
      } catch (err) {
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex">
      <div
        className="card h-100 shadow-sm border-0 rounded-4 w-100 overflow-hidden position-relative"
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      >
        <span
          className={`position-absolute top-3 start-3 badge rounded-pill px-3 py-2 fw-medium z-1 ${
            product.availabilityStatus === "In Stock"
              ? "bg-success"
              : product.availabilityStatus === "Low Stock"
                ? "bg-warning text-dark"
                : "bg-danger"
          }`}
        >
          {product.availabilityStatus}
        </span>

        <Link
          href={`/products/${product.id}`}
          className="text-decoration-none text-dark d-flex flex-column h-100"
        >
          <div
            className="bg-light p-3 d-flex justify-content-center align-items-center"
            style={{ height: "220px" }}
          >
            <img
              src={product.image}
              className="object-fit-contain"
              alt={product.title}
              width={180}
              height={180}
              style={{ maxHeight: "100%" }}
            />
          </div>

          <div className="card-body d-flex flex-column">
            <span
              className="text-uppercase text-muted fw-bold small mb-1"
              style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              {product.category}
            </span>
            <h5 className="card-title fs-6 fw-semibold mb-2 text-truncate">
              {product.title}
            </h5>

            <p className="card-text fs-5 fw-bold text-primary mt-auto mb-3">
              ${product.price.toFixed(2)}
            </p>

            <div className="d-flex gap-2 pt-2 border-top border-light">
              <Link
                href={`/my-products/edit/${product._id}`}
                onClick={handleEditClick}
                className="btn btn-sm btn-light border rounded-pill px-3 fw-medium flex-grow-1"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-medium flex-grow-1"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export { OwnerProductCard };
