import React, { useState, useTransition } from "react";
import { ProductCard } from "./productcard";
import Product from "@/interfaces/product";
import CardsContainerProps from "@/interfaces/cardscontainerprops";
import { SearchBar } from "./searchbar";
import { SortFilter } from "./sortfilter";

const ProductCardsContainer = ({ title, products }: CardsContainerProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isPending, startTransition] = useTransition();

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") return a.price - b.price;
    if (sortBy === "price-high-low") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const startSearch = (query: string) => {
    setSearchTerm(query);
    startTransition(() => {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    });
  };
  return (
    <div className="container my-5">
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-12 col-md-4">
          {title && <h2 className="fw-bold m-0">{title}</h2>}
        </div>

        <div className="col-12 col-md-5">
          <SearchBar value={searchTerm} search={startSearch} />
        </div>

        <div className="col-12 col-md-3">
          <SortFilter value={sortBy} setSort={setSortBy} />
        </div>
      </div>

      <div
        className="row g-4"
        style={{
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 0.15s ease",
        }}
      >
        {sortedProducts.length > 0 ? (
          sortedProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.title}
              price={p.price}
              imgSrc={p.thumbnail}
            />
          ))
        ) : (
          <div className="col-12 text-center text-muted my-5">
            <h5>No products found matching "{searchTerm}"</h5>
          </div>
        )}
      </div>
    </div>
  );
};
export { ProductCardsContainer };
