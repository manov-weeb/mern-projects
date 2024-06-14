import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-2">
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-lg shadow-md ">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Welcome {currentUser ? currentUser.username : 'Guest'}!
        </h1>
        {currentUser ? (
          <>
            <div className="text-lg text-center mb-8 text-gray-700">
              <p>
                Here are some exciting features waiting for you:
              </p>
            </div>
            <ul className="text-left text-lg mb-8 space-y-2">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 fill-current text-gray-700" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 8a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Update your profile information.
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 fill-current text-gray-700" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.75 11.5a2.75 2.75 0 11-5.5 0 2.75 2.75 0 015.5 0zM16 1a1 1 0 00-1 1v4.586l-2.879-2.879a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414l8 8a1 1 0 001.414 0l8-8a1 1 0 000-1.414l-5-5H16V2a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Upload a new profile picture.
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 fill-current text-gray-700" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm8-4a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5z" clipRule="evenodd" />
                </svg>
                Delete your account (if you ever need to).
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 fill-current text-gray-700" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 8a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Sign out securely.
              </li>
            </ul>
          </>
        ) : (
          <div className="text-lg text-center mb-8 text-gray-700">
            <p>
              You are currently not logged in. Please{' '}
              <Link to="/sign-in" className="text-blue-600 hover:underline">
                sign in
              </Link>{' '}
              to access your profile.
            </p>
          </div>
        )}
        <p className="text-green-800 text-center mb-4">{/* Add success message here */}</p>
        <p className="text-red-800 text-center">{/* Add error message here */}</p>
      </div>
    </div>
  );
};

export default Home;
