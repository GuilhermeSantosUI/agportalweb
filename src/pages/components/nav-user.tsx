'use client';

import { Database, Key, LogOut } from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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

      {/* Dialog: Recadastramento */}
      <Dialog open={openRecadastro} onOpenChange={setOpenRecadastro}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recadastramento</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Acesse o formulário de recadastramento para visualizar o sistema.
          </DialogDescription>

          <div className="grid gap-2 py-4">
            <label className="text-sm">Matrícula / Usuário</label>
            <Input placeholder="Informe o identificador" />
          </div>

          <DialogFooter>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Mudar senha - Usuário */}
      <Dialog open={openChangeUserPwd} onOpenChange={setOpenChangeUserPwd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mudar senha (Usuário)</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Alterar a senha de acesso do usuário.
          </DialogDescription>

          <div className="grid gap-2 py-4">
            <label className="text-sm">Senha atual</label>
            <Input type="password" placeholder="Senha atual" />
            <label className="text-sm">Nova senha</label>
            <Input type="password" placeholder="Nova senha" />
            <label className="text-sm">Confirmar nova senha</label>
            <Input type="password" placeholder="Confirme a nova senha" />
          </div>

          <DialogFooter>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Mudar senha - Banco */}
      <Dialog open={openChangeDbPwd} onOpenChange={setOpenChangeDbPwd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mudar senha (Banco)</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Alterar a senha do usuário de banco de dados.
          </DialogDescription>

          <div className="grid gap-2 py-4">
            <label className="text-sm">Usuário do banco</label>
            <Input placeholder="Usuário do banco" />
            <label className="text-sm">Nova senha do banco</label>
            <Input type="password" placeholder="Nova senha" />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenChangeDbPwd(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // TODO: implementar submissão de alteração de senha do banco
                setOpenChangeDbPwd(false);
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
