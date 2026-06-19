import React from "react";

interface SortFilterProps {
  value: string;
  setSort: (newSort: string) => void;
}

export const SortFilter = ({ value, setSort }: SortFilterProps) => {
  return (
    <select
      className="form-select px-4 py-2 rounded-pill border-secondary-subtle bg-light shadow-none cursor-pointer"
      value={value}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="default">Sort: Featured</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
};
