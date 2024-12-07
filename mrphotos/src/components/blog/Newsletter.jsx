"use client";

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  return (
    <div className="bg-neutral-100 py-16">
      <form className="max-w-xl mx-auto px-4" onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <h3 className="text-2xl uppercase">newsletter</h3>
        </div>
        <div className="relative mb-6">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-neutral-300 focus:outline-none focus:border-neutral-500"
            placeholder="Email Address"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-neutral-900 text-white py-4 px-8 hover:bg-neutral-800 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}