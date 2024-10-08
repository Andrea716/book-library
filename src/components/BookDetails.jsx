import React, { useEffect, useState } from 'react';
import { getBookDetails } from '../services/api';

const BookDetails = ({ isbn, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getBookDetails(isbn);
        setDetails(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [isbn]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !details) return <div className="p-4">Error fetching book details.</div>;

  const coverUrl = details.cover
    ? details.cover.large || details.cover.medium || details.cover.small
    : 'https://via.placeholder.com/128x193?text=No+Cover';

  const authors = details.authors ? details.authors.map(author => author.name).join(', ') : 'Unknown Author';
  const publishers = details.publishers ? details.publishers.map(pub => pub.name).join(', ') : 'Unknown Publisher';
  const subjects = details.subjects ? details.subjects.map(sub => sub.name).join(', ') : 'N/A';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <div className="flex flex-col sm:flex-row">
          <img src={coverUrl} alt={details.title} className="w-48 h-auto object-cover mr-4 mb-4 sm:mb-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2">{details.title}</h2>
            <p className="mb-1"><strong>Author(s):</strong> {authors}</p>
            <p className="mb-1"><strong>Publisher:</strong> {publishers}</p>
            <p className="mb-1"><strong>Publication Date:</strong> {details.publish_date || 'N/A'}</p>
            <p className="mb-1"><strong>ISBN:</strong> {isbn}</p>
            <p className="mb-1"><strong>Number of Pages:</strong> {details.number_of_pages || 'N/A'}</p>
            <p className="mb-1"><strong>Subjects:</strong> {subjects}</p>
            {details.description && (
  <p className="mt-4"><strong>Description:</strong> {typeof details.description === 'string' ? details.description : (details.description.value || 'No description available')}</p>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
