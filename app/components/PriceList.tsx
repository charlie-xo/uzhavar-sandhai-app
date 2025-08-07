'use client';

import { useState } from 'react';
import { deletePrice, updatePrice } from '@/app/actions';
import { Pencil, Trash2, Store } from 'lucide-react';
import type { Session } from '@supabase/auth-helpers-nextjs';

// Proper type definition for a Price object
type Price = {
  id: string;
  created_at: string;
  vegetable_name: string;
  price: number;
  market_name: string;
  user_id: string;
};

export default function PriceList({ prices, session }: { prices: Price[], session: Session | null }) {
  const [editingItem, setEditingItem] = useState<Price | null>(null);

  const handleUpdate = async (formData: FormData) => {
    if (editingItem) {
      await updatePrice(editingItem.id, formData);
      setEditingItem(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
            {editingItem && editingItem.id === item.id ? (
              <form action={handleUpdate} className="p-5 space-y-3">
                <input
                  type="text"
                  name="vegetable_name"
                  defaultValue={item.vegetable_name}
                  className="p-2 border rounded-md w-full text-gray-900"
                  required
                />
                <input
                  type="number"
                  name="price"
                  defaultValue={item.price}
                  className="p-2 border rounded-md w-full text-gray-900"
                  required
                />
                <input
                  type="text"
                  name="market_name"
                  defaultValue={item.market_name}
                  className="p-2 border rounded-md w-full text-gray-900"
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="flex-1 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{item.vegetable_name}</h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Store className="h-4 w-4 mr-2" />
                    <p>{item.market_name}</p>
                  </div>
                </div>
                <div className="bg-green-100 px-5 py-3 mt-auto">
                  <p className="text-2xl font-bold text-green-700">
                    ₹ {item.price}
                    <span className="text-sm font-normal text-green-600"> /kg</span>
                  </p>
                </div>
              </div>
            )}

            {session && session.user.id === item.user_id && !editingItem && (
              <div className="p-3 bg-gray-50 border-t flex justify-end gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                  aria-label="Edit price"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <form action={deletePrice.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="p-2 text-red-600 hover:text-red-800"
                    aria-label="Delete price"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
