import { hasAccess } from '@/app/utils/access';
import useFavorites from '@/app/utils/useFavorites';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Star } from '@phosphor-icons/react';
import React from 'react';

import StatusBadge from './status-badge';
import { Button } from './ui/button';

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  Icon: React.ElementType;
  status?: string;
  lastAccess?: string;
  variant?: 'grid' | 'list';
};

export function FavoriteCard({
  id,
  title,
  subtitle,
  Icon,
  status,
  lastAccess,
  variant = 'grid',
}: Props) {
  const computedId = id ?? title.replace(/\s+/g, '-').toLowerCase();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(computedId);
  const access = hasAccess(computedId);

  const handleClick = () => {
    if (access) {
      console.log('Abrir', title);
    } else {
      window.dispatchEvent(
        new CustomEvent('open-request-access', {
          detail: { what: title, id: computedId },
        })
      );
    }
  };

  if (variant === 'list') {
    return (
      <Card
        className={`flex items-center gap-4 p-4 transition-all ${
          access ? 'cursor-pointer hover:bg-muted/50' : 'opacity-80'
        } border border-primary/20`}
        onClick={() => access && handleClick()}
        role={access ? 'button' : 'none'}
        aria-label={access ? `Abrir ${title}` : `Solicitar acesso a ${title}`}
      >
        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
          <Icon size={18} weight="duotone" />
        </div>

        <div className="flex-1 min-w-0">
          <CardTitle className="text-base truncate">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-xs truncate">
              {subtitle}
            </CardDescription>
          )}
        </div>

        <div className="flex items-center gap-3">
          {access && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(computedId);
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
          )}

          {access ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={status ?? 'offline'} />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {lastAccess}
                </span>
              </div>
            </div>
          ) : (
            <button
              className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-muted-foreground/30 hover:bg-muted/80"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Solicitar Acesso
            </button>
          )}
        </div>
      </Card>
    );
  }

  // Grid variant (default)
  return (
    <Card
      className={`flex flex-col p-4 gap-2 transition-all ${
        access ? 'cursor-pointer hover:bg-muted/50' : 'opacity-80'
      } border border-primary/20`}
      onClick={() => access && handleClick()}
      role={access ? 'button' : 'none'}
      aria-label={access ? `Abrir ${title}` : `Solicitar acesso a ${title}`}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white">
          <Icon size={20} weight="duotone" />
        </div>

        <div className="flex items-center gap-1">
          {access && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(computedId);
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
          )}
        </div>
      </div>

      <div className="flex-1 mb-3">
        <CardTitle className="text-base mb-1">{title}</CardTitle>
        {subtitle && (
          <CardDescription className="text-xs line-clamp-2">
            {subtitle}
          </CardDescription>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <StatusBadge status={status ?? 'offline'} />
        {access ? (
          <span className="text-xs text-muted-foreground">{lastAccess}</span>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Solicitar Acesso
          </Button>
        )}
      </div>
    </Card>
  );
}

export default FavoriteCard;
