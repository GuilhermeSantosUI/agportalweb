import React from 'react';
import FavoriteCard from './favorite-card';

type Fav = {
  title: string;
  subtitle?: string;
  Icon: React.ElementType;
  status?: string;
  lastAccess?: string;
};

type Props = { favorites: Fav[] };

export function FavoritesGrid({ favorites }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((f) => (
        <FavoriteCard
          key={f.title}
          title={f.title}
          subtitle={f.subtitle}
          Icon={f.Icon}
          status={f.status}
          lastAccess={f.lastAccess}
        />
      ))}
    </div>
  );
}

export default FavoritesGrid;
