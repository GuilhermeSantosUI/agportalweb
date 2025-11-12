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
