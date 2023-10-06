"use client"
import React, { useEffect, useState } from 'react';

interface User {
  // Define the properties of your User type based on your actual data structure
  id: string;
  name: string;
  email: string;
  // ... other properties
}

const getUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/user'); // Replace with your actual endpoint
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
          console.log('Users fetched successfully:', data);
        } else {
          console.error('Error fetching users:', data.message);
        }
      } catch (error:any) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Get Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
          <br/>
        </div>
      ))}
    </div>
  );
};

export default getUser;
