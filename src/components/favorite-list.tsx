import useFavorites from '@/app/utils/useFavorites';
import { Star } from '@phosphor-icons/react';
import React from 'react';
import StatusBadge from './status-badge';

type Fav = {
  id?: string;
  title: string;
  subtitle?: string;
  Icon: React.ElementType;
  status?: string;
  lastAccess?: string;
};

type Props = { favorites: Fav[] };

export function FavoritesList({ favorites }: Props) {
  const { isFavorite, toggle } = useFavorites();
  return (
    <div className="flex flex-col divide-y">
      {favorites.map((f) => (
        <div
          key={f.title}
          className="py-3 flex items-center justify-between gap-4 hover:bg-muted/40 px-3 rounded"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white text-lg">
              <f.Icon size={18} weight="duotone" />
            </div>
            <div>
              <div className="font-medium">{f.title}</div>
              {f.subtitle && (
                <div className="text-xs text-muted-foreground">
                  {f.subtitle}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={f.status ?? 'offline'} />
            </div>
            <div className="text-xs text-muted-foreground">{f.lastAccess}</div>
            <button
              onClick={() => {
                const id = f.id ?? f.title.replace(/\s+/g, '-').toLowerCase();
                toggle(id);
              }}
              title="Favoritar"
              className="p-2 rounded hover:bg-muted/30"
            >
              {(() => {
                const id = f.id ?? f.title.replace(/\s+/g, '-').toLowerCase();
                return (
                  <Star
                    size={16}
                    weight={isFavorite(id) ? 'fill' : 'regular'}
                    className="text-amber-400"
                  />
                );
              })()}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;
