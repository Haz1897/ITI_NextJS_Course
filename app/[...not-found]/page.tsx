import Link from "next/link";

export default function CatchAllNotFound() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div
        className="p-5 bg-white rounded-4 shadow-sm border border-light"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="display-1 fw-bold text-danger mb-2">404</h1>
        <h2 className="fw-semibold text-dark mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/products"
          className="btn btn-primary rounded-pill px-4 shadow-sm"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
