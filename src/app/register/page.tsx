"use client"
import React, { useState, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  age: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: formData.age,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User created successfully:', data);
        alert('User created successfully!');
      } else {
        console.error('Error creating user:', data.message);
      }
    } catch (error : any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleInputChange} />

        <label>Age:</label>
        <input type="number" name="age" onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleInputChange} />

        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
