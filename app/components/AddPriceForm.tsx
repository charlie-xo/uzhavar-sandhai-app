'use client';

import { useState } from 'react';
import { User } from '@supabase/auth-helpers-nextjs';

type Props = {
  user: User;
};

export default function AddPriceForm({ user }: Props) {
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example usage of user.id
    console.log('Submitting price for user:', user.id);

    // Add your Supabase logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        className="w-full p-3 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
      >
        Submit Price
      </button>
    </form>
  );
}
