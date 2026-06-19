import React from "react";
import Link from "next/link";
import ProductDetailProps from "@/interfaces/productdetailsprops";
import Image from "next/image";

const ProductDetails = ({
  title,
  description,
  price,
  imgSrc,
  rating,
  category,
  availabilityStatus,
}: ProductDetailProps) => {
  return (
    <div className="container my-5">
      <div className="mb-4">
        <Link href="/products" className="btn btn-outline-secondary btn-sm">
          ← Back to Products
        </Link>
      </div>

      <div className="row g-5 align-items-center">
        <div className="col-12 col-md-6">
          <div className="bg-light p-4 rounded text-center border">
            <Image
              src={imgSrc}
              alt={title}
              className="img-fluid rounded"
              width={400}
              height={300}
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          {category && (
            <span className="badge bg-secondary text-uppercase mb-2">
              {category}
            </span>
          )}

          <h1 className="display-5 fw-bold mb-2">{title}</h1>

          <div className="d-flex align-items-center mb-3">
            <div className="d-flex align-items-center bg-warning-subtle text-warning-dominant px-2 py-1 rounded me-2 border border-warning-subtle">
              <span className="me-1" style={{ color: "#ffc107" }}>
                ★
              </span>
              <span className="fw-bold text-dark">{rating.toFixed(1)}</span>
            </div>
            <span className="text-muted small">Out of 5.0</span>
          </div>

          <div className="d-flex align-items-center mb-4">
            <span className="fs-2 fw-bold text-success me-3">
              ${price.toFixed(2)}
            </span>
            {availabilityStatus && (
              <span
                className={`badge ${availabilityStatus === "In Stock" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"} border px-2 py-1`}
              >
                {availabilityStatus}
              </span>
            )}
          </div>

          <hr className="my-4" />

          <h5 className="fw-semibold">Description</h5>
          <p className="lead text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
