import React from "react";

export default function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Search the Table"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </div>
  );
}
