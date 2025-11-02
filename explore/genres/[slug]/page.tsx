import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';

export function generateStaticParams() {
  const genres = Array.from(
    new Set(gamesLibrary.flatMap(game => game.genre))
  );

  return genres.map(genre => ({
    slug: genre.toLowerCase().replace(/\s+/g, '-')
  }));
}

export default function GenrePage({ params }: { params: { slug: string } }) {
  const genreName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const games = gamesLibrary.filter(game =>
    game.genre.some(g => g.toLowerCase().replace(/\s+/g, '-') === params.slug)
  );

  return (
    <div className="min-h-screen bg-[#1c1c1c] py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white slide-in">
          {genreName} Games
          <span className="block w-20 h-1 bg-red-600 mt-4 rounded"></span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          {games.length} {games.length === 1 ? 'game' : 'games'} found in {genreName}
        </p>

        {games.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4 text-white">No games found</h3>
            <p className="text-gray-400">Try browsing other genres or check our full catalog</p>
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
