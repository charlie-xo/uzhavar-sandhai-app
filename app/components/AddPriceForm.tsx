'use client';

import { useRef } from 'react';
import { createPrice } from '@/app/actions';

export default function AddPriceForm({ user }: { user: any }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Pudhiya Vilayai Serkka</h2>
      <form
        ref={formRef}
        action={async (formData) => {
          await createPrice(formData);
          formRef.current?.reset();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="vegetable_name"
            placeholder="Kaaykari Peyar (e.g., Thakkali)"
            required
            className="p-3 border rounded-md w-full text-gray-900 focus:ring-green-500 focus:border-green-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Vilai (₹)"
            required
            className="p-3 border rounded-md w-full text-gray-900 focus:ring-green-500 focus:border-green-500"
          />
          {/* Market name is now a text input */}
          <input
            type="text"
            name="market_name"
            placeholder="Sandhai Peyar (e.g., R.S. Puram)"
            required
            className="p-3 border rounded-md w-full text-gray-900 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
        >
          Vilayai Pathivu Sei
        </button>
      </form>
    </div>
  );
}