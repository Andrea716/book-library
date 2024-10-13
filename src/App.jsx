import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/ProfilePage'; // Make sure this path is correct
import LoginRegister from './pages/LoginRegister';
import BookLibrary from './components/BookLibrary';
import DarkModeToggle from './components/DarkModeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Import your CSS file

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [user, setUser] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    avatar: '',
    books: [],
    favorites: [],
  });

  const handleSkip = () => {
    setIsSkipped(true);
  };

  const handleAddToFavorites = (book) => {
    setUser((prevUser) => ({
      ...prevUser,
      favorites: [...prevUser.favorites, book],
    }));
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="p-4">
          {/* Dark Mode Toggle */}
          <DarkModeToggle />

          {/* Main Content */}
          <div className="content">
            <h1 className="welcome-title">Welcome to the Book Library</h1>

            {/* If the user is not logged in and hasn't skipped, show the login/register page */}
            {(!isLoggedIn && !isSkipped) ? (
              <LoginRegister onSkip={handleSkip} />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={<Profile user={user} />} // Pass user data to Profile
                />
                <Route
                  path="/loginregister"
                  element={<LoginRegister onSkip={handleSkip} />}
                />
                <Route
                  path="/library"
                  element={
                    <BookLibrary
                      books={user.books}
                      addToFavorites={handleAddToFavorites}
                    />
                  }
                />
              </Routes>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
