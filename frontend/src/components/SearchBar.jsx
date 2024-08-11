import React, { useState, useEffect } from "react";
import searchImg from "../assets/search.png";

const SearchComponent = ({ search, page, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredItems = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    search((prevdata) => filteredItems || prevdata);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-3xl p-1 items-center">
      <img src={searchImg} alt="" className="inline" />
      <input
        type="text"
        value={searchTerm}
        placeholder="Search by name"
        onChange={handleSearch}
        className="px-2 rounded-3xl w-[50vw] md:w-60 focus:outline-none"
      />
    </div>
  );
};

export default SearchComponent;
