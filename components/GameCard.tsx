import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Game } from '@/lib/gamesData';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`}>
      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group border-2 border-transparent hover:border-red-600">
        <div className="relative aspect-[3/4]">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          {game.badge && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              {game.badge}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-red-600 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-gray-300 text-sm">{game.rating}</span>
            </div>
            <span className="text-gray-400 text-xs">{game.release_year}</span>
          </div>
          <p className="text-gray-400 text-sm truncate">{game.developer}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {game.genre.slice(0, 2).map((g) => (
              <span key={g} className="text-xs bg-[#1c1c1c] text-gray-400 px-2 py-1 rounded">
                {g}
              </span>
            ))}
            {game.genre.length > 2 && (
              <span className="text-xs bg-[#1c1c1c] text-gray-400 px-2 py-1 rounded">
                +{game.genre.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
