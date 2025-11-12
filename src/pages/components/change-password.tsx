import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../../components/ui/sheet';

export type ChangePasswordProps = {
  openChangeUserPwd: boolean;
  setOpenChangeUserPwd: (v: boolean) => void;
  openChangeDbPwd: boolean;
  setOpenChangeDbPwd: (v: boolean) => void;
};

export function ChangePassword({
  openChangeUserPwd,
  setOpenChangeUserPwd,
  openChangeDbPwd,
  setOpenChangeDbPwd,
}: ChangePasswordProps) {
  return (
    <>
      <Sheet open={openChangeDbPwd} onOpenChange={setOpenChangeDbPwd}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
          style={{ maxWidth: 500 }}
        >
          <div className="w-full">
            <SheetHeader className="mb-4 gap-0">
              <SheetTitle>Mudar senha (Banco)</SheetTitle>
              <SheetDescription>
                Alterar a senha do usuário de banco de dados.
              </SheetDescription>
            </SheetHeader>

            <form
              className="px-6"
              onSubmit={(e) => {
                e.preventDefault();
                // aqui você chamaria a API para alterar a senha do banco
                setOpenChangeDbPwd(false);
              }}
            >
              <div className="grid gap-2 py-4 px-0">
                <label className="text-sm">Usuário do banco</label>
                <Input placeholder="Usuário do banco" />
                <label className="text-sm">Nova senha do banco</label>
                <Input type="password" placeholder="Nova senha" />
              </div>

              <SheetFooter className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setOpenChangeDbPwd(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </SheetFooter>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openChangeUserPwd} onOpenChange={setOpenChangeUserPwd}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
          style={{ maxWidth: 500 }}
        >
          <div className="w-full">
            <SheetHeader className="mb-4 gap-0">
              <SheetTitle>Mudar senha (Usuário)</SheetTitle>
              <SheetDescription>
                Alterar a senha de acesso do usuário.
              </SheetDescription>
            </SheetHeader>

            <form
              className="px-6"
              onSubmit={(e) => {
                e.preventDefault();
                // aqui você chamaria a API para alterar a senha do usuário
                setOpenChangeUserPwd(false);
              }}
            >
              <div className="grid gap-2 py-4 px-0">
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
                <Button type="submit">Salvar</Button>
              </SheetFooter>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
