import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Leaf, LogIn } from 'lucide-react';
import Link from 'next/link';
import AddPriceForm from './components/AddPriceForm';
import LogoutButton from './components/LogoutButton';
import PriceList from './components/PriceList';

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const { data: prices, error } = await supabase
    .from('prices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="text-green-600 h-8 w-8" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">கோவை உழவர் சந்தை</h1>
          </div>
          {session ? <LogoutButton /> : (
            <Link href="/login" className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {session ? <AddPriceForm user={session.user} /> : (
          <div className="text-center bg-yellow-100 text-yellow-800 p-4 rounded-lg">
            விலையை பதிவு செய்ய, <Link href="/login" className="font-bold underline">Login</Link> pannunga.
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 mt-10">
          Indraya Vilaigal (இன்றைய விலைகள்)
        </h2>

        {prices && prices.length > 0 ? (
          <PriceList prices={prices} session={session} />
        ) : (
          <div className="text-center col-span-full py-12">
            <p className="text-gray-500">Innaiku innum yaarum vilaya update pannala.</p>
          </div>
        )}
      </main>

      <footer className="text-center py-6 mt-8">
        <p className="text-gray-500 text-sm">Made with ❤️ for coimbatore</p>
        <p className="text-gray-500 text-sm">Developed by R.Arunkumar</p>
      </footer>
    </div>
  );
}