import React from "react";

interface SortFilterProps {
  value: string;
  setSort: (newSort: string) => void;
}

export const SortFilter = ({ value, setSort }: SortFilterProps) => {
  return (
    <select
      className="form-select"
      value={value} // Binds the state value
      onChange={(e) => setSort(e.target.value)} // Sends the changes back up
    >
      <option value="default">Sort By: Featured</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
};
