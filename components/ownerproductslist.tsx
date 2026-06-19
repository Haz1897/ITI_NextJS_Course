"use client";

import { useState, useEffect } from "react";
import IProduct from "@/interfaces/product";
import { OwnerProductCard } from "./ownerproductcard";

export default function OwnerProductsList() {
  const [myProducts, setMyProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/own");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setMyProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this product listing?",
      )
    ) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(
            data.error || "Failed to delete product from database",
          );
        }

        setMyProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading products: {error}
      </div>
    );
  }

  if (myProducts.length === 0) {
    return (
      <div className="text-center bg-light py-5 px-3 rounded-4 border-dashed border-2 text-muted">
        <h4 className="fw-semibold text-dark mb-2">Your inventory is empty</h4>
        <p className="mb-0">
          You haven't listed any items for sale yet. Click "Add New Product" to
          begin.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {myProducts.map((product) => (
        <OwnerProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
