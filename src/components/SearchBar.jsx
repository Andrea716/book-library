import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search by ${type}`}
        className="border p-2 rounded w-full sm:w-auto flex-1 mb-2 sm:mb-0 sm:mr-2 bg-lilac-100" // Add background color here
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded mb-2 sm:mb-0 sm:mr-2 bg-lilac-100" // Add background color here
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="keyword">Keyword</option> {/* Updated value */}
      </select>
      <button 
        type="submit" 
        className="bg-lilac-300 text-white p-2 rounded hover:bg-lilac-400 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
