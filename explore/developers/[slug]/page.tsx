import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';

export function generateStaticParams() {
  const developers = Array.from(
    new Set(gamesLibrary.map(game => game.developer))
  );

  return developers.map(developer => ({
    slug: developer.toLowerCase().replace(/\s+/g, '-')
  }));
}

export default function DeveloperPage({ params }: { params: { slug: string } }) {
  const developerName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const games = gamesLibrary.filter(game =>
    game.developer.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  const avgRating = games.length > 0
    ? (games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-[#1c1c1c] py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white slide-in">
          {developerName}
          <span className="block w-20 h-1 bg-red-600 mt-4 rounded"></span>
        </h1>
        <div className="flex items-center gap-6 mb-8">
          <p className="text-gray-400 text-lg">
            {games.length} {games.length === 1 ? 'game' : 'games'}
          </p>
          {games.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-gray-400 text-lg">
                {avgRating} average rating
              </span>
            </div>
          )}
        </div>

        {games.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4 text-white">No games found</h3>
            <p className="text-gray-400">Try browsing other developers or check our full catalog</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {games.map((game) => (
              <div key={game.id} className="fade-in">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
