import FavoritesGrid from '@/components/FavoritesGrid';
import { Header } from '@/components/Header';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import {
  Buildings,
  Car,
  CurrencyDollar,
  MagnifyingGlass,
  Robot,
  User,
  Users,
} from '@phosphor-icons/react';
import { useState } from 'react';

export function Dashboard() {
  const [query, setQuery] = useState('');
  const favorites = [
    {
      title: 'AgFolhaWeb',
      subtitle: 'Sistema de Folha de Pagamento',
      Icon: Users,
      status: 'online',
      lastAccess: 'Hoje, 08:30',
    },
    {
      title: 'AgFrota',
      subtitle: 'Gestão de Frota de Veículos',
      Icon: Car,
      status: 'online',
      lastAccess: 'Ontem, 14:20',
    },
    {
      title: 'AgGPT - ADM',
      subtitle: 'Administrador da I.A Ágape',
      Icon: Robot,
      status: 'manutenção',
      lastAccess: '2 dias atrás',
    },
    {
      title: 'AgObra',
      subtitle: 'Gestão de Obras e Projetos',
      Icon: Buildings,
      status: 'online',
      lastAccess: 'Semana passada',
    },
    {
      title: 'AgFinance',
      subtitle: 'Controle Financeiro',
      Icon: CurrencyDollar,
      status: 'online',
      lastAccess: 'Hoje, 09:15',
    },
    {
      title: 'AgRH',
      subtitle: 'Recursos Humanos',
      Icon: User,
      status: 'offline',
      lastAccess: '1 mês atrás',
    },
  ];

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
                  className="pl-10 w-64 bg-muted/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <button className="inline-flex items-center gap-2 border rounded-md px-3 py-1 text-sm bg-white">
                Visualização em Grid
              </button>
              <button className="inline-flex items-center gap-2 border rounded-md px-3 py-1 text-sm bg-white">
                Visualização em Lista
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Sistemas Favoritos
              </h2>
              <span className="text-sm text-muted-foreground">
                {
                  favorites.filter((f) => {
                    if (!query) return true;
                    const q = query.toLowerCase();
                    return (
                      f.title.toLowerCase().includes(q) ||
                      (f.subtitle && f.subtitle.toLowerCase().includes(q))
                    );
                  }).length
                }{' '}
                sistemas
              </span>
            </div>

            {favorites.filter((f) => {
              if (!query) return true;
              const q = query.toLowerCase();
              return (
                f.title.toLowerCase().includes(q) ||
                (f.subtitle && f.subtitle.toLowerCase().includes(q))
              );
            }).length === 0 ? (
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
            ) : (
              <FavoritesGrid
                favorites={favorites.filter((f) => {
                  if (!query) return true;
                  const q = query.toLowerCase();
                  return (
                    f.title.toLowerCase().includes(q) ||
                    (f.subtitle && f.subtitle.toLowerCase().includes(q))
                  );
                })}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
