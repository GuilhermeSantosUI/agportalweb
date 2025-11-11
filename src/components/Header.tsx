import logoImg from '@/assets/images/agape-logo.png';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import React from 'react';

import { NavUser } from '@/pages/components/nav-user';
import { RequestAccess } from '@/pages/components/request-access';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { Input } from './ui/input';

export function Header() {
  const [open, setOpen] = React.useState(false);

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

  function handleCommandAction(action: string) {
    console.log('Command action:', action);
    setOpen(false);
  }

  return (
    <header className="flex items-center justify-between px-6 bg-primary py-4 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img src={logoImg} alt="Ágape Sistemas" className="w-28 rounded-sm" />
      </div>

      <nav className="flex items-center gap-3">
        <div className="hidden md:block">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar sistemas..."
              className="pl-10 w-80 bg-muted/50"
              readOnly
              onFocus={() => setOpen(true)}
              onClick={() => setOpen(true)}
            />

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Buscar..." />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

                <CommandGroup heading="Navegação">
                  <CommandItem
                    onSelect={() => handleCommandAction('dashboard')}
                  >
                    Dashboard
                  </CommandItem>
                  <CommandItem
                    onSelect={() => handleCommandAction('favorites')}
                  >
                    Favoritos
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Conta">
                  <CommandItem onSelect={() => handleCommandAction('login')}>
                    Login
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
        
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
      </nav>
    </header>
  );
}
