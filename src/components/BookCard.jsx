import React from 'react';

const BookCard = ({ book, onSelect }) => {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://via.placeholder.com/128x193?text=No+Cover';

  const authors = Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Unknown Author';
  const publisher = Array.isArray(book.publisher) ? book.publisher.join(', ') : 'Unknown Publisher';

  return (
    <div
      className="flex items-center border p-4 rounded cursor-pointer hover:bg-gray-100"
      onClick={() => onSelect(book)}
    >
      <img src={coverUrl} alt={book.title} className="w-32 h-48 object-cover mr-4" />
      <div>
        <h3 className="text-xl font-semibold">{book.title}</h3>
        <p className="text-gray-700">Author(s): {authors}</p>
        <p className="text-gray-700">Publisher: {publisher}</p>
      </div>
    </div>
  );
};

export default BookCard;
