import React from 'react';

const BookLibrary = ({ books, addToFavorites }) => {
  return (
    <div className="book-library">
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={`${book.id}-${book.title}`}>
            <h3>{book.title}</h3>
            <p>By {book.author}</p>
            <button onClick={() => addToFavorites(book)}>Add to Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookLibrary;
