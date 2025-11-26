import { hasAccess } from '@/app/utils/access';
import { useTheme } from '@/app/utils/theme';
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
import { Separator } from '@/components/ui/separator';
import { CelebrationModal } from '@/pages/components/celebration-modal';
import {
  List,
  MagnifyingGlass,
  Moon,
  SquaresFour,
  Sun,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
const CELEBRATIONS = [
  {
    id: 0,
    title: 'Feliz Aniversário',
    subtitle: `
       <div>
        <p>🎉 Mais um ano de mandato na vida completado com excelência!</p>

        <p class="my-2">
          Desejamos que o orçamento para saúde e felicidade <br /> seja ilimitado e sem
          teto de gastos.
        </p>

        <p>
          <strong>
            ✨ Que a sua gestão pessoal deixe um legado incrível! ✨
          </strong>
        </p>
      </div>
    `,
  },
];

import { modules } from './modules-mock';

export function Dashboard() {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [celebration, setCelebration] = useState<null | {
    id: string | number;
    title: string;
    subtitle?: string;
  }>(null);
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const { favorites: favoriteIds } = useFavorites();

  const filtered = modules.filter((f) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      f.title.toLowerCase().includes(q) ||
      (f.subtitle && f.subtitle.toLowerCase().includes(q))
    );
  });

  // Separar módulos por acesso do usuário
  const accessible = filtered.filter((m) => hasAccess(m.id));
  const inaccessible = filtered.filter((m) => !hasAccess(m.id));

  // Separar favoritos e demais dentro de cada grupo
  const favoriteAccessible = accessible.filter((m) =>
    favoriteIds.includes(m.id)
  );
  const favoriteInaccessible = inaccessible.filter((m) =>
    favoriteIds.includes(m.id)
  );

  const otherAccessible = accessible.filter((m) => !favoriteIds.includes(m.id));
  const otherInaccessible = inaccessible.filter(
    (m) => !favoriteIds.includes(m.id)
  );

  useEffect(() => {
    try {
      const key = 'agportal_last_celebration_index';
      const lastRaw = localStorage.getItem(key);
      const last = lastRaw ? parseInt(lastRaw, 10) : -1;
      const next = (last + 1) % CELEBRATIONS.length;
      const chosen = CELEBRATIONS[next];
      localStorage.setItem(key, String(next));
      setCelebration(chosen);
      setCelebrationOpen(true);
    } catch {
      // se localStorage não existir, apenas usa a primeira
      setCelebration(CELEBRATIONS[0]);
      setCelebrationOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen text-foreground bg-primary flex flex-col">
      <Header />

      <CelebrationModal
        celebration={celebration}
        open={celebrationOpen}
        onOpenChange={(v) => setCelebrationOpen(v)}
      />

      <main className="flex-1 p-6 bg-card rounded-tr-2xl rounded-tl-2xl">
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
                {favoriteAccessible.length} sistemas
              </span>
            </div>

            {favoriteAccessible.length === 0 ? (
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
              <FavoritesGrid favorites={favoriteAccessible} />
            ) : (
              <FavoritesList favorites={favoriteAccessible} />
            )}

            {showHidden && favoriteInaccessible.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm text-muted-foreground mb-2">
                  Favoritos sem acesso
                </h3>
                {viewMode === 'grid' ? (
                  <FavoritesGrid favorites={favoriteInaccessible} />
                ) : (
                  <FavoritesList favorites={favoriteInaccessible} />
                )}
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Outros sistemas
                </h2>
                <span className="text-sm text-muted-foreground">
                  {otherAccessible.length} sistemas
                </span>
              </div>

              {otherAccessible.length === 0 ? (
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
                <FavoritesGrid favorites={otherAccessible} />
              ) : (
                <FavoritesList favorites={otherAccessible} />
              )}

              {inaccessible.length > 0 && (
                <div className="flex items-center gap-4 my-6">
                  <Separator className="flex-1" />
                  <Button
                    variant="outline"
                    onClick={() => setShowHidden((s) => !s)}
                  >
                    {showHidden
                      ? `Fechar catálogo de ${inaccessible.length} soluções`
                      : `Conhecer nossas ${inaccessible.length} soluções`}
                  </Button>
                  <Separator className="flex-1" />
                </div>
              )}

              {showHidden && otherInaccessible.length > 0 && (
                <div className="mt-4">
                  {viewMode === 'grid' ? (
                    <FavoritesGrid favorites={otherInaccessible} />
                  ) : (
                    <FavoritesList favorites={otherInaccessible} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import logoAlternativeImg from '@/assets/images/agape-logo-amarela.png';
import logoImg from '@/assets/images/agape-logo.png';
import { NavUser } from '@/pages/components/nav-user';
import { RequestAccess } from '@/pages/components/request-access';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Kbd } from '@/components/ui/kbd';
import {
  BellIcon,
  ClipboardIcon,
  FileTextIcon,
  MoonIcon,
  SunIcon,
  UsersIcon,
} from '@phosphor-icons/react';

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = React.useState(
    () =>
      [
        { id: 1, title: 'Novo contrato publicado', time: '2h', read: false },
        {
          id: 2,
          title: 'Licitação: prazo final amanhã',
          time: '1d',
          read: false,
        },
        {
          id: 3,
          title: 'Relatório de transparência disponível',
          time: '3d',
          read: true,
        },
      ] as { id: number; title: string; time: string; read: boolean }[]
  );

  React.useEffect(() => {
    if (!open) return;
    const el = document.querySelector(
      '[data-slot="command-input"]'
    ) as HTMLInputElement | null;
    if (el) el.focus();
  }, [open]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isCmd = e.ctrlKey || e.metaKey;
      if (!isCmd) return;
      const key = e.key.toLowerCase();
      if (key === 'k' || key === 'f') {
        e.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  }

  return (
    <header className="flex items-center text-white dark:text-black justify-between px-6 bg-primary py-4 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img
          src={resolvedTheme === 'dark' ? logoAlternativeImg : logoImg}
          alt="Ágape Sistemas"
          className="w-32 rounded-sm"
        />
        <GreetingPill />
      </div>

      <div className="flex items-center gap-3">
        <div>
          <Button
            variant="outline"
            className="text-black dark:hover:text-black dark:bg-primary"
            size="sm"
            onClick={() => setOpen(true)}
          >
            Busca (Ctrl/Cmd+K)
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen} title="Buscar">
            <CommandInput placeholder="Pesquisar ações, documentos ou páginas..." />
            <CommandList>
              <CommandEmpty>Nenhum resultado</CommandEmpty>
              <CommandGroup heading="Atalhos">
                <CommandItem onSelect={() => setOpen(false)}>
                  <FileTextIcon className="size-4" />
                  Licitações
                  <Kbd className="ml-auto">l</Kbd>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <ClipboardIcon className="size-4" />
                  Contratos
                  <Kbd className="ml-auto">c</Kbd>
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <UsersIcon className="size-4" />
                  Transparência
                  <Kbd className="ml-auto">t</Kbd>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Ações">
                <CommandItem onSelect={() => setOpen(false)}>
                  Exportar relatório
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  Abrir painel de auditoria
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              className="text-black dark:hover:text-black dark:bg-primary"
              size="icon-sm"
              aria-label="Notificações"
            >
              <div className="relative">
                <BellIcon className="size-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-3 -right-3 text-[8px] w-[14px] h-[14px] p-0 bg-red-600">
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-56 overflow-y-auto">
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} onClick={() => toggleRead(n.id)}>
                  <div className="flex w-full items-start justify-between">
                    <div
                      className={`flex-1 text-sm ${
                        n.read ? 'text-muted-foreground' : 'font-medium'
                      }`}
                    >
                      {n.title}
                      <div className="text-xs text-muted-foreground">
                        {n.time}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-between px-2">
              <Button variant="ghost" size="sm" onClick={() => markAllRead()}>
                Marcar todas como lidas
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Abrir central de notificações')}
              >
                Ver tudo
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="text-black dark:hover:text-black dark:bg-primary"
            aria-label="Alternar tema"
            onClick={() => toggleTheme()}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <div className="flex items-center">
            <RequestAccess />
          </div>

          <NavUser
            user={{
              name: 'User Name',
              email: 'user@example.com',
              avatar: '/path/to/avatar.jpg',
            }}
          />
        </div>
      </div>
    </header>
  );
}

function GreetingPill() {
  function getTimeState() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: 'Bom dia',
        Icon: SunIcon,
        colorClass: 'text-amber-400',
        variant: 'day',
      };
    }
    if (hour >= 12 && hour < 18) {
      return {
        greeting: 'Boa tarde',
        Icon: SunIcon,
        colorClass: 'text-orange-400',
        variant: 'day',
      };
    }
    return {
      greeting: 'Boa noite',
      Icon: MoonIcon,
      colorClass: 'text-sky-400',
      variant: 'night',
    };
  }

  const [timeState, setTimeState] = React.useState(() => getTimeState());

  React.useEffect(() => {
    const id = setInterval(() => setTimeState(getTimeState()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = timeState.Icon as React.ComponentType<any>;

  return (
    <div
      className={`greeting-pill ${timeState.variant}`}
      title={`${timeState.greeting}`}
    >
      <span className={`greeting-icon ${timeState.colorClass}`}>
        <Icon className="h-4 w-4" weight="duotone" />
      </span>
      <span className="text-white dark:text-black">{timeState.greeting}</span>
    </div>
  );
}
