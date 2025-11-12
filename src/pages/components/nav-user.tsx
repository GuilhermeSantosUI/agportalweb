'use client';

import { Database, Key, LogOut } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const [openRecadastro, setOpenRecadastro] = React.useState(false);
  const [openChangeUserPwd, setOpenChangeUserPwd] = React.useState(false);
  const [openChangeDbPwd, setOpenChangeDbPwd] = React.useState(false);

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
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
