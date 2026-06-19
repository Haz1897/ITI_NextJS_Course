import React, { useTransition } from "react";

interface SearchBarProps {
  value: string;
  search: (newValue: string) => void;
}

export const SearchBar = ({ value, search }: SearchBarProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search products..."
      value={value}
      onChange={(e) =>
        startTransition(() => {
          search(e.target.value);
        })
      }
    />
  );
};
