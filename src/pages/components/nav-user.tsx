'use client';

import { Database, Key, LogOut } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { ChangePassword } from './change-password';
import { Reregister } from './reregister';

export function NavUser({
  user,
  onLogout,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onLogout?: () => void;
}) {
  const [openRecadastro, setOpenRecadastro] = React.useState(false);
  const [openChangeUserPwd, setOpenChangeUserPwd] = React.useState(false);
  const [openChangeDbPwd, setOpenChangeDbPwd] = React.useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 rounded-sm bg-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={'bottom'}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenRecadastro(true)}>
              <Database />
              Recadastramento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenChangeUserPwd(true)}>
              <Key />
              Mudar senha (Usuário)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenChangeDbPwd(true)}>
              <Key />
              Mudar senha (Banco)
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenLogoutDialog(true)}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openLogoutDialog} onOpenChange={setOpenLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja sair?</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja sair do sistema? Você pode continuar sua
              sessão selecionando "Continuar".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => {
                setOpenLogoutDialog(false);
              }}
            >
              Continuar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpenLogoutDialog(false);
                if (onLogout) {
                  onLogout();
                } else {
                  // placeholder: implementar logout real aqui
                  // por enquanto só logamos no console
                  // quem usa o componente pode passar `onLogout`
                  // para executar a ação real
                  // Ex.: redirecionar para /logout ou chamar API
                  console.log('logout');
                }
              }}
            >
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Reregister open={openRecadastro} onOpenChange={setOpenRecadastro} />
      <ChangePassword
        openChangeUserPwd={openChangeUserPwd}
        setOpenChangeUserPwd={setOpenChangeUserPwd}
        openChangeDbPwd={openChangeDbPwd}
        setOpenChangeDbPwd={setOpenChangeDbPwd}
      />
    </>
  );
}
