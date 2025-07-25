import { AppProvider } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { VenueFilters } from './components/venues/VenueFilters';
import { VenueTable } from './components/venues/VenueTable';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-background dark:to-gray-950 flex flex-col relative">
        {/* Background gradient mesh */}
        <div className="fixed inset-0 gradient-mesh opacity-40 pointer-events-none" />

        {/* Animated gradient orbs for glass effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <Header />
        <main className="container mx-auto px-4 pt-32 pb-8 flex-1 animate-fade-in relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <VenueFilters />
            </aside>
            <section className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                <VenueTable />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
