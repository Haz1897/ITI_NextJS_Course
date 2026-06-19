"use client";
import React, { useTransition } from "react";

interface SearchBarProps {
  value: string;
  search: (newValue: string) => void;
}

export const SearchBar = ({ value, search }: SearchBarProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <input
      type="search"
      className="form-control px-4 py-2 rounded-pill border-secondary-subtle bg-light shadow-none focus-ring focus-ring-primary"
      placeholder="Search for products..."
      value={value}
      onChange={(e) =>
        startTransition(() => {
          search(e.target.value);
        })
      }
    />
  );
};
