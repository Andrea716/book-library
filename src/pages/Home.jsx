import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookDetails from '../components/BookDetails';

// Importing searchBooks function from API.js
import { searchBooks, getBookDetails } from '../services/api';  // Correct import path

// Sample data for trending books
const trendingBooks = [
  { id: 1, title: "The Hidden Girl", author: "Lucinda Riley", cover: "./public/images/Hidden Girl.jpeg", isbn: ["9781234567897"] },
  { id: 2, title: "Starts with Us", author: "Colleen Hoover", cover: "./public/images/It starts with us.jpeg", isbn: ["9782345678901"] },
  { id: 3, title: "Highly Suspicious and Unfairly Cute", author: "Talia Hibbert", cover: "./public/images/Highly suspicious.jpeg", isbn: ["9783456789012"] },
  // Add more trending books...
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookISBN, setSelectedBookISBN] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating in the app

  // Function to handle the search
  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const results = await searchBooks(query, type);

      // Validate API response
      if (!Array.isArray(results)) {
        throw new Error('Invalid response format.');
      }

      if (results.length === 0) {
        setError('No books found matching your search criteria.');
      } else {
        setBooks(results);
      }
    } catch (err) {
      setError('An error occurred while fetching data. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle book selection
  const handleSelectBook = (book) => {
    const isbn = book.isbn ? book.isbn[0] : null;
    if (isbn) {
      setSelectedBookISBN(isbn);
    } else {
      setError('ISBN not available for this book.');
    }
  };

  // Function to close book details modal
  const handleCloseDetails = () => {
    setSelectedBookISBN(null);
  };

  // useEffect to log changes in selectedBookISBN
  useEffect(() => {
    if (selectedBookISBN) {
      console.log(`Book with ISBN ${selectedBookISBN} selected`);
    }
  }, [selectedBookISBN]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <Link to="/" className="text-xl">
          <i className="fas fa-bars"></i>
        </Link>
        <div className="flex-grow mx-4">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="text-lg">
              <i className="fas fa-bookmark"></i>
            </button>
          </Link>
          <Link to="/profile">
            <button className="text-lg">
              <i className="fas fa-user"></i>
            </button>
          </Link>
        </div>
      </header>

      {/* Trending Books Section */}
      <section className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-black">Trending Books</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {trendingBooks.map((book) => (
            <div
              key={book.id}
              className="min-w-[120px] text-center cursor-pointer"
              onClick={() => handleSelectBook(book)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-24 h-36 object-cover rounded-md mb-2"
              />
              <h3 className="text-sm font-medium text-black">{book.title}</h3>
              <p className="text-xs text-black">{book.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book List Section */}
      <section className="p-4 text-black">
        <h2 className="text-2xl font-semibold mb-4">Books</h2>

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Book List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {books.map((book) => (
            <BookCard
            key={book.key} // Ensure this is unique
            book={book}
            onSelect={handleSelectBook}
          />
        ))}
        </div>
      </section>

      {/* Book Details Modal */}
      {selectedBookISBN && (
        <BookDetails isbn={selectedBookISBN} onClose={handleCloseDetails} />
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around">
        <button className="text-lg" onClick={() => navigate('/')}>
          <i className="fas fa-home"></i>
        </button>
        <button className="text-lg" onClick={() => navigate('/login')}>
          <i className="fas fa-bookmark"></i>
        </button>
        <button className="text-lg" onClick={() => navigate('/profile')}>
          <i className="fas fa-user"></i>
        </button>
      </nav>
    </div>
  );
};

export default Home;
