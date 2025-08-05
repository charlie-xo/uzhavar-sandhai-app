'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/auth-helpers-nextjs';

export default function AddPriceForm({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [vegetable, setVegetable] = useState('');
  const [price, setPrice] = useState('');
  const [market, setMarket] = useState('R.S. Puram');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('prices')
      .insert({ 
        vegetable_name: vegetable, 
        price: Number(price), 
        market_name: market,
        user_id: user.id,
      });

    setLoading(false);

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Vilayai serthachu! Nandri!');
      setVegetable('');
      setPrice('');
      router.refresh(); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Pudhiya Vilayai Serkka</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Kaaykari Peyar (e.g., Thakkali)"
            value={vegetable}
            onChange={(e) => setVegetable(e.target.value)}
            // Intha line-la text color-a maathirukom
            className="p-2 border rounded-md w-full md:col-span-2 text-gray-900 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500"
            required
          />
          <input
            type="number"
            placeholder="Vilai (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // Intha line-la text color-a maathirukom
            className="p-2 border rounded-md w-full text-gray-900 placeholder:text-gray-500 focus:ring-green-500 focus:border-green-500"
            required
          />
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            // Intha line-la text color-a maathirukom
            className="p-2 border rounded-md w-full text-gray-900 focus:ring-green-500 focus:border-green-500"
          >
            <option>R.S. Puram</option>
            <option>Singanallur</option>
            <option>Saibaba Colony</option>
            <option>Vadavalli</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Serkkiradhu...' : 'Vilayai Pathivu Sei'}
        </button>
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
