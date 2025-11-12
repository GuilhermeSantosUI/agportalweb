import logoImg from '@/assets/images/agape-logo.png';
import { NavUser } from '@/pages/components/nav-user';
import { RequestAccess } from '@/pages/components/request-access';
import React from 'react';

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

  return (
    <header className="flex items-center justify-between px-6 bg-primary py-4 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img src={logoImg} alt="Ágape Sistemas" className="w-28 rounded-sm" />
      </div>

      <nav className="flex items-center gap-3">
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
