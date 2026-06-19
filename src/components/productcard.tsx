import ProductCardProps from "@/interfaces/productcardprops";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, name, price, imgSrc }: ProductCardProps) => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card" style={{ width: "18rem;" }}>
        <Link href={`/products/${id}`}>
          <Image
            src={imgSrc}
            className="card-img-top"
            alt="..."
            width={200}
            height={200}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export { ProductCard };
