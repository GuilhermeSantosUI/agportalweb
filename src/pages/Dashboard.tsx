import useFavorites from '@/app/utils/useFavorites';
import FavoritesGrid from '@/components/favorite-grid';
import FavoritesList from '@/components/favorite-list';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { List, MagnifyingGlass, SquaresFour } from '@phosphor-icons/react';
import { useState } from 'react';
import { Header } from '../components/header';
import { modules } from './modules-mock';

export function Dashboard() {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { favorites: favoriteIds } = useFavorites();

  const filtered = modules.filter((f) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      f.title.toLowerCase().includes(q) ||
      (f.subtitle && f.subtitle.toLowerCase().includes(q))
    );
  });

  const favoriteModules = filtered.filter((m) => favoriteIds.includes(m.id));
  const otherModules = filtered.filter((m) => !favoriteIds.includes(m.id));

  return (
    <div className="min-h-screen text-foreground bg-primary flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-white rounded-tr-2xl rounded-tl-2xl">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium flex items-center gap-2">
                AgPortal
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Seus sistemas favoritos e ferramentas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar sistemas..."
                  className="pl-10 w-64 h-10 bg-muted/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <ButtonGroup>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="lg"
                  className="px-3  border-1"
                  onClick={() => setViewMode('grid')}
                >
                  <SquaresFour className="size-5" />
                  <span className="sr-only">Visualização em Grid</span>
                </Button>

                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="lg"
                  className="px-3 border-1"
                  onClick={() => setViewMode('list')}
                >
                  <List className="size-5" />
                  <span className="sr-only">Visualização em Lista</span>
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Favoritos
              </h2>
              <span className="text-sm text-muted-foreground">
                {favoriteModules.length} sistemas
              </span>
            </div>

            {favoriteModules.length === 0 ? (
              <Empty className="py-12">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MagnifyingGlass className="h-6 w-6" />
                  </EmptyMedia>
                  <EmptyTitle>Nenhum sistema favoritado</EmptyTitle>
                  <EmptyDescription>
                    Marque sistemas como favoritos para tê-los aqui.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent />
              </Empty>
            ) : viewMode === 'grid' ? (
              <FavoritesGrid favorites={favoriteModules} />
            ) : (
              <FavoritesList favorites={favoriteModules} />
            )}

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Outros sistemas
                </h2>
                <span className="text-sm text-muted-foreground">
                  {otherModules.length} sistemas
                </span>
              </div>

              {otherModules.length === 0 ? (
                <Empty className="py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MagnifyingGlass className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum sistema encontrado</EmptyTitle>
                    <EmptyDescription>
                      Tente outro termo de pesquisa ou verifique a ortografia.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent />
                </Empty>
              ) : viewMode === 'grid' ? (
                <FavoritesGrid favorites={otherModules} />
              ) : (
                <FavoritesList favorites={otherModules} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
