'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';

interface User {
  username: string;
  email: string;
}

const Profile = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/user', {
          credentials: 'include',
        });

        if (response.ok) {
          const content: User = await response.json();
          setUsername(content.username);
          setEmail(content.email);
          setAuth(true);
        } else {
          setMessage('You are not logged in');
          setAuth(false);
        }
      } catch (e) {
        console.error('Error fetching user data:', e);
        setMessage('An error occurred while fetching user data');
        setAuth(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  let display;
  if (loading) {

    display = <p className="text-center">Loading...</p>;
  } else if (auth === false) {

    display = (
      <div className="text-center">
        <p>You are not logged in. Please login.</p>
      </div>
    );
  } else {

    display = (
      <div className="text-center">
        <p className="text-2xl font-bold mb-4">Profile</p>
        <div className="max-w-md mx-auto border border-gray-300 shadow-md overflow-hidden rounded-md">
          <div className="p-4 border-b border-gray-300">
            <p className="text-lg font-semibold mb-2">Username:</p>
            <p className="text-gray-800">{username}</p>
          </div>
          <div className="p-4">
            <p className="text-lg font-semibold mb-2">Email:</p>
            <p className="text-gray-800">{email}</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <Layout auth={auth}>
        <div className="mt-8">{display}</div>
      </Layout>
    </div>
  );
};


export default Profile;
