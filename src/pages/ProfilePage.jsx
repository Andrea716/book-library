import React, { useState, useEffect } from 'react';

const Profile = ({ user }) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  // Example dummy data (this will later come from your user data or backend)
  const avatarUrl = user.avatar || 'https://via.placeholder.com/150'; // Placeholder avatar if none is uploaded
  const booksOwned = user.books.length;

  useEffect(() => {
    // Fetch favorite books (in a real app, fetch from API or state)
    setFavouriteBooks(user.favorites);
  }, [user]);

  const handleRemoveFromFavourites = (bookToRemove) => {
    // Logic to remove book from favourites by comparing titles
    setFavouriteBooks(favouriteBooks.filter(book => book.title !== bookToRemove.title));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-6 text-black-force">User Profile</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-black-force">
        <div className="profile-info flex flex-col items-center mb-6">
          <img src="https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg" alt="User Avatar" className="avatar w-24 h-24 rounded-full mb-4" />
          <h2 className="text-2xl font-semibold text-black-force">{user.username}</h2>
          <p className="text-gray-600 text-black-force">Email: {user.email}</p>
          <p className="text-gray-600 text-black-force">Total Books Owned: {booksOwned}</p>
        </div>

        <div className="favourites-section">
          <h2 className="text-xl font-bold mb-4 text-black-force">Your Favourite Books</h2>
          <ul>
            {favouriteBooks.length > 0 ? (
              favouriteBooks.map((book, index) => (
                <li key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                  <button 
                    onClick={() => handleRemoveFromFavourites(book)} 
                    className="text-red-500 hover:underline"
                  >
                    Remove from Favourites
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600 text-black-force">You have no favourite books yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
