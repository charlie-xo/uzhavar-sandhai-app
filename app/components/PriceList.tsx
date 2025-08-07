'use client';

import { Session } from '@supabase/auth-helpers-nextjs';

type Props = {
  prices: any[]; // You can replace `any` with your actual price type
  session: Session | null;
};

export default function PriceList({ prices, session }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {prices.map((price, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <p className="text-lg font-semibold">{price.item}</p>
          <p className="text-gray-600">₹{price.amount}</p>
          {session && (
            <p className="text-sm text-green-600">Updated by: {session.user.email}</p>
          )}
        </div>
      ))}
    </div>
  );
}
