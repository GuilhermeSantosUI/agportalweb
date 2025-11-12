import useFavorites from '@/app/utils/useFavorites';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from '@phosphor-icons/react';
import React from 'react';
import StatusBadge from './status-badge';

type Props = {
  title: string;
  subtitle?: string;
  Icon: React.ElementType;
  status?: string;
  lastAccess?: string;
};

export function FavoriteCard({
  title,
  subtitle,
  Icon,
  status,
  lastAccess,
}: Props) {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id);
  return (
    <Card
      className="group transition-all gap-0 duration-300 cursor-pointer border border-primary/20"
      onClick={() => console.log('Abrir', title)}
      role="button"
      aria-label={`Abrir ${title}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white text-lg">
              <Icon size={20} weight="duotone" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{subtitle}</CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(id);
              }}
              aria-pressed={fav}
              aria-label={
                fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
              }
              title={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              className="p-2 rounded hover:bg-muted/30"
            >
              {fav ? (
                <Star size={18} weight="fill" className="text-amber-500" />
              ) : (
                <Star
                  size={18}
                  weight="regular"
                  className="text-muted-foreground"
                />
              )}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusBadge status={status ?? 'offline'} />
          </div>
          <span className="text-xs text-muted-foreground">{lastAccess}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
