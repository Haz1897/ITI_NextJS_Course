import { ProductCardsContainer } from "@/components/productcardscontainer";
import CardsContainerProps from "@/interfaces/cardscontainerprops";
import Product from "@/interfaces/product";
const Products = ({ products, title }: CardsContainerProps) => {
  return (
    <div>
      <ProductCardsContainer products={products}></ProductCardsContainer>
    </div>
  );
};
export async function getStaticProps() {
  const res = await fetch(`https://dummyjson.com/products`);
  const data = await res.json();
  const products: Product[] = data.products;
  return {
    props: { products },
    revalidate: 60,
  };
}

export default Products;
