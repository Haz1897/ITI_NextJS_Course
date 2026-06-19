"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveProductAction, ActionState } from "@/actions/products";
import IProduct from "@/interfaces/product";

interface ProductFormProps {
  initialData?: IProduct;
}

const initialState: ActionState = {
  success: false,
  error: null,
};

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    saveProductAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/my-products");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div
      className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <h2 className="fw-bold text-dark mb-2 fs-3">
        {isEditMode ? "Edit Product" : "List a New Product"}
      </h2>
      <p className="text-muted small mb-4">
        {isEditMode
          ? "Modify your current product listing details below."
          : "Fill out the details below to add a custom item listing to your store inventory."}
      </p>

      {state.error && (
        <div
          className="alert alert-danger rounded-3 small py-2 px-3 mb-4"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <form action={formAction} className="row g-4">
        {isEditMode && <input type="hidden" name="id" value={initialData.id} />}

        <div className="col-12">
          <label className="form-label fw-semibold text-dark small">
            Product Title *
          </label>
          <input
            type="text"
            name="title"
            className="form-control rounded-3"
            placeholder="e.g., Mechanical Gaming Keyboard"
            defaultValue={initialData?.title || ""}
            disabled={isPending}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold text-dark small">
            Price ($ USD) *
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            className="form-control rounded-3"
            placeholder="0.00"
            defaultValue={initialData?.price || ""}
            disabled={isPending}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold text-dark small">
            Category *
          </label>
          <input
            type="text"
            name="category"
            className="form-control rounded-3"
            placeholder="e.g., Electronics, Apparel"
            defaultValue={initialData?.category || ""}
            disabled={isPending}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold text-dark small">
            Image URL Link *
          </label>
          <input
            type="url"
            name="imageUrl"
            className="form-control rounded-3"
            placeholder="https://example.com/product-image.jpg"
            defaultValue={initialData?.image || ""}
            disabled={isPending}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold text-dark small">
            Inventory Status
          </label>
          <select
            name="availabilityStatus"
            className="form-select rounded-3"
            defaultValue={initialData?.availabilityStatus || "In Stock"}
            disabled={isPending}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold text-dark small">
            Product Description *
          </label>
          <textarea
            name="description"
            className="form-control rounded-3"
            rows={4}
            placeholder="Write a clear, item description details here..."
            defaultValue={initialData?.description || ""}
            disabled={isPending}
            required
          />
        </div>

        <div className="col-12 d-flex gap-3 justify-content-end pt-2">
          <button
            type="button"
            className="btn btn-light border rounded-pill px-4 fw-medium text-secondary"
            onClick={() => router.push("/my-products")}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-dark rounded-pill px-4 fw-medium"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
