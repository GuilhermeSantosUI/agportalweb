import FavoritesGrid from '@/components/FavoritesGrid';
import { Header } from '@/components/Header';
import { Buildings, Car, CurrencyDollar, Robot, Star, User, Users } from '@phosphor-icons/react';

export function Dashboard() {
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
    <div className="min-h-screen text-foreground flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium flex items-center gap-2">
                Portal Ágape Sistemas
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Seus sistemas favoritos e ferramentas</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 border rounded-md px-3 py-1 text-sm bg-white">Visualização em Grid</button>
              <button className="inline-flex items-center gap-2 border rounded-md px-3 py-1 text-sm bg-white">Visualização em Lista</button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Sistemas Favoritos
              </h2>
              <span className="text-sm text-muted-foreground">{favorites.length} sistemas</span>
            </div>

            <FavoritesGrid favorites={favorites} />
          </div>
        </div>
      </main>
    </div>
  );
}

