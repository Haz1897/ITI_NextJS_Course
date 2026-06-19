import Product from "@/interfaces/product";
import { Params } from "next/dist/server/request/params";
import { GetStaticPropsContext } from "next";
import { ProductDetails } from "@/components/productdetails";
const ID = ({ product }: { product: Product }) => {
  return (
    <>
      <ProductDetails
        title={product.title}
        description={product.description}
        price={product.price}
        imgSrc={product.images[0]}
        category={product.category}
        availabilityStatus={product.availabilityStatus}
        rating={product.rating}
      ></ProductDetails>
    </>
  );
};

export default ID;
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps(context: GetStaticPropsContext<Params>) {
  const params: Params | undefined = context.params;
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const data = await res.json();
  if (Object.keys(data).length == 1) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product: data,
    },
  };
}
