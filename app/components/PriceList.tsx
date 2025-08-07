'use client';

import { useState } from 'react';
import { addPrice } from '@/app/actions';

export default function AddPriceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    await addPrice(formData);
    setIsSubmitting(false);
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="vegetable_name"
        placeholder="Vegetable Name"
        className="p-2 border rounded-md w-full text-gray-900"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="p-2 border rounded-md w-full text-gray-900"
        required
      />
      <input
        type="text"
        name="market_name"
        placeholder="Market Name"
        className="p-2 border rounded-md w-full text-gray-900"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        {isSubmitting ? 'Adding...' : 'Add Price'}
      </button>
    </form>
  );
}
