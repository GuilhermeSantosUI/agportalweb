'use client';

import { Database, Key, LogOut } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

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

      <Sheet open={openRecadastro} onOpenChange={setOpenRecadastro}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Recadastramento</SheetTitle>
            <SheetDescription>
              Acesse o formulário de recadastramento para visualizar o sistema.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-2 py-4 px-4">
            <label className="text-sm">Matrícula / Usuário</label>
            <Input placeholder="Informe o identificador" />
          </div>

          <SheetFooter className="flex items-center justify-end gap-4">
            <Button variant="outline" onClick={() => setOpenRecadastro(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // TODO: implementar ação de recadastramento
                setOpenRecadastro(false);
              }}
            >
              Abrir
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={openChangeUserPwd} onOpenChange={setOpenChangeUserPwd}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Mudar senha (Usuário)</SheetTitle>
            <SheetDescription>
              Alterar a senha de acesso do usuário.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-2 py-4 px-4">
            <label className="text-sm">Senha atual</label>
            <Input type="password" placeholder="Senha atual" />
            <label className="text-sm">Nova senha</label>
            <Input type="password" placeholder="Nova senha" />
            <label className="text-sm">Confirmar nova senha</label>
            <Input type="password" placeholder="Confirme a nova senha" />
          </div>

          <SheetFooter className="flex items-center justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setOpenChangeUserPwd(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // TODO: implementar submissão de alteração de senha do usuário
                setOpenChangeUserPwd(false);
              }}
            >
              Salvar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={openChangeDbPwd} onOpenChange={setOpenChangeDbPwd}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Mudar senha (Banco)</SheetTitle>
            <SheetDescription>
              Alterar a senha do usuário de banco de dados.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-2 py-4 px-4">
            <label className="text-sm">Usuário do banco</label>
            <Input placeholder="Usuário do banco" />
            <label className="text-sm">Nova senha do banco</label>
            <Input type="password" placeholder="Nova senha" />
          </div>

          <SheetFooter className="flex items-center justify-end gap-4">
            <Button variant="outline" onClick={() => setOpenChangeDbPwd(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setOpenChangeDbPwd(false);
              }}
            >
              Salvar
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
