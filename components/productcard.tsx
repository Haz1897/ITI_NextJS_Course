import ProductCardProps from "@/interfaces/productcardprops";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, name, price, imgSrc }: ProductCardProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex">
      <div
        className="card h-100 shadow-sm border-0 rounded-4 w-100 overflow-hidden"
        style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      >
        <Link
          href={`/products/${id}`}
          className="text-decoration-none text-dark d-flex flex-column h-100"
        >
          <div
            className="bg-light p-3 d-flex justify-content-center align-items-center"
            style={{ height: "220px" }}
          >
            <img
              src={imgSrc}
              className="object-fit-contain"
              alt={name}
              width={180}
              height={180}
              style={{ maxHeight: "100%" }}
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fs-6 fw-semibold mb-3">{name}</h5>
            <p className="card-text fs-5 fw-bold text-primary mt-auto mb-0">
              ${price.toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export { ProductCard };
