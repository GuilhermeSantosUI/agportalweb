import logoImg from '@/assets/images/agape-logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MagnifyingGlass, Plus } from '@phosphor-icons/react';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 bg-primary py-4 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <img src={logoImg} alt="Ágape Sistemas" className="w-28 rounded-sm" />

        <div className="hidden md:block">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar sistemas..." className="pl-10 w-80 bg-muted/50" />
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Solicitar Acesso
        </Button>

        <div className="hidden sm:flex items-center gap-4 text-sm">
          <a href="#" className="hover:underline">Alterar Senha</a>
          <a href="#" className="hover:underline">Recadastramento</a>
        </div>

        <Bell className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />

        <Avatar className="cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
          <AvatarImage src="https://github.com/octocat.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">GS</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
