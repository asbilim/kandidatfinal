"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Function to get a cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the "auth" cookie
    const authCookie = getCookie('auth');
    setIsAuthenticated(Boolean(authCookie));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-8 ">
      {isAuthenticated ? (
        <>
          <p className="text-lg font-bold">Welcome, you are logged in as admin!</p>
          <button
            className="btn btn-accent btn-lg btn-wide"
            onClick={() => {
              // Clear the auth cookie and redirect to login page on logout
              document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              router.push('/auth/login');
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-lg font-bold">Please log in to continue.</p>
          <button
            className="btn btn-accent btn-lg btn-wide"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
