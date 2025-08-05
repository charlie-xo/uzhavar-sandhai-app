import { Leaf, Store } from 'lucide-react';

// Step 1: Namma dummy data-va ingaye create panrom.
// Pinnaadi, namma idha Supabase-la irundhu edupom.
const dummyPrices = [
  { id: 1, vegetable: 'Thakkali (தக்காளி)', price: 25, market: 'R.S. Puram' },
  { id: 2, vegetable: 'Vengayam (வெங்காயம்)', price: 32, market: 'R.S. Puram' },
  { id: 3, vegetable: 'Kovakkai (கோவைக்காய்)', price: 40, market: 'Singanallur' },
  { id: 4, vegetable: 'Urulai Kizhangu (உருளைக்கிழங்கு)', price: 35, market: 'R.S. Puram' },
  { id: 5, vegetable: 'Carrot (கேரட்)', price: 50, market: 'Saibaba Colony' },
  { id: 6, vegetable: 'Beans (பீன்ஸ்)', price: 60, market: 'Singanallur' },
  { id: 7, vegetable: 'Kathirikai (கத்திரிக்காய்)', price: 28, market: 'Saibaba Colony' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="text-green-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-800">
              Kovai Uzhavar Sandhai
            </h1>
          </div>
          <p className="text-sm text-gray-500">Live Prices</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          Indraya Vilaigal (இன்றைய விலைகள்)
        </h2>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 2: dummyPrices array-va map panni ovvoru item-kum oru card create panrom */}
          {dummyPrices.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{item.vegetable}</h3>
                <div className="flex items-center text-gray-600 mt-2">
                  <Store className="h-4 w-4 mr-2" />
                  <p>{item.market}</p>
                </div>
              </div>
              <div className="bg-green-100 px-5 py-3">
                <p className="text-2xl font-bold text-green-700">
                  ₹ {item.price}
                  <span className="text-sm font-normal text-green-600"> /kg</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

       {/* Footer */}
       <footer className="text-center py-6 mt-8">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for Coimbatore
          </p>
       </footer>
    </div>
  );
}
