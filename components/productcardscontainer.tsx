"use client";
import { useEffect, useState, useTransition } from "react";
import { ProductCard } from "./productcard";
import Product from "@/interfaces/product";
import { SearchBar } from "./searchbar";
import { SortFilter } from "./sortfilter";
import { useSession } from "next-auth/react";

const ProductCardsContainer = ({ title }: { title: string }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isPending, startTransition] = useTransition();
  const { data: session, status: sessionStatus } = useSession();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsDataLoading(true);

        const isLoggedIn = !!session?.user;
        const limit = isLoggedIn ? 0 : 3;
        let url = "";
        if (limit == 0) {
          url = "/api/products";
        } else {
          url = `/api/products?limit=${limit}`;
        }
        const res = await fetch(url);
        const data = await res.json();

        setAllProducts(data || []);
        setFilteredProducts(data || []);
      } catch (error) {
        console.error("Failed to load catalog inventory:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <div className="container py-5">
      <div className="row g-3 mb-5 align-items-center bg-white p-3 rounded-4 shadow-sm border border-light">
        <div className="col-12 col-md-4">
          {title && <h2 className="fw-bold text-dark m-0 fs-3">{title}</h2>}
        </div>

        <div className="col-12 col-md-5">
          <SearchBar value={searchTerm} search={startSearch} />
        </div>

        <div className="col-12 col-md-3">
          <SortFilter value={sortBy} setSort={setSortBy} />
        </div>
      </div>

      {isDataLoading || sessionStatus === "loading" ? (
        <div className="d-flex justify-content-center my-5 py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading Products...</span>
          </div>
        </div>
      ) : (
        <>
          <div
            className="row g-4"
            style={{
              opacity: isPending ? 0.6 : 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            {sortedProducts.length > 0 ? (
              sortedProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  id={p._id}
                  name={p.title}
                  price={p.price}
                  imgSrc={p.image}
                />
              ))
            ) : (
              <div className="col-12">
                <div className="text-center bg-light py-5 px-3 rounded-4 border-dashed border-2 text-muted">
                  <h4 className="fw-semibold">No products found</h4>
                  <p className="mb-0">
                    Try adjusting your search for "{searchTerm}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export { ProductCardsContainer };
