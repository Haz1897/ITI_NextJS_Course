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
    <div className="container py-5 overflow-hidden">
      <div className="mb-4">
        <Link
          href="/products"
          className="btn btn-light border shadow-sm rounded-pill px-4 fw-medium text-secondary"
        >
          <span className="me-2">←</span> Back to Products
        </Link>
      </div>

      <div className="row g-5 align-items-center">
        <div className="col-12 col-md-6">
          <div
            className="bg-white p-4 p-sm-5 rounded-4 shadow-sm border border-light d-flex justify-content-center align-items-center w-100"
            style={{ minHeight: "400px" }}
          >
            <Image
              src={imgSrc}
              alt={title}
              className="img-fluid object-fit-contain"
              width={500}
              height={500}
              style={{ maxHeight: "400px", width: "auto", height: "auto" }}
              unoptimized
            />
          </div>
        </div>

        <div className="col-12 col-md-6 pe-lg-5">
          {category && (
            <span className="badge bg-primary bg-opacity-10 text-primary text-uppercase px-3 py-2 rounded-pill mb-3">
              {category}
            </span>
          )}

          <h1 className="display-6 fw-bold mb-3 text-dark text-break">
            {title}
          </h1>

          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center bg-warning bg-opacity-10 text-dark px-3 py-1 rounded-pill me-3 border border-warning border-opacity-25">
              <span className="me-1 text-warning fs-5">★</span>
              <span className="fw-bold">{rating.toFixed(1)}</span>
            </div>
            <span className="text-muted small fw-medium">
              Out of 5.0 Rating
            </span>
          </div>

          <div className="d-flex align-items-center mb-4">
            <span className="display-6 fw-bold text-primary me-4">
              ${price.toFixed(2)}
            </span>
            {availabilityStatus && (
              <span
                className={`badge px-3 py-2 rounded-pill border ${
                  availabilityStatus === "In Stock"
                    ? "bg-success bg-opacity-10 text-success border-success border-opacity-25"
                    : "bg-danger bg-opacity-10 text-danger border-danger border-opacity-25"
                }`}
              >
                {availabilityStatus}
              </span>
            )}
          </div>

          <hr className="my-4 text-muted opacity-25" />

          <h5 className="fw-bold text-dark mb-3">Product Description</h5>
          <p
            className="lead text-secondary fs-6 lh-lg text-break text-wrap values-content"
            style={{ wordBreak: "break-word" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
