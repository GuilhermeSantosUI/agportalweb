import logoImg from '@/assets/images/agape-logo.png';
import { NavUser } from '@/pages/components/nav-user';
import { RequestAccess } from '@/pages/components/request-access';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
  BellIcon,
  ClipboardIcon,
  FileTextIcon,
  MoonIcon,
  SunIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import { Kbd } from './ui/kbd';

export function Header() {
  const [open, setOpen] = React.useState(false);

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
    <header className="flex items-center justify-between px-6 bg-primary py-4 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img src={logoImg} alt="Ágape Sistemas" className="w-32 rounded-sm" />
        <GreetingPill />
      </div>

      <div className="flex items-center gap-3">
        <div>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
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
            <Button variant="outline" size="icon-sm" aria-label="Notificações">
              <div className="relative">
                <BellIcon className="size-5" color="#000" />
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
      <span className="text-white">{timeState.greeting}</span>
    </div>
  );
}
