import { Button } from '../../components/ui/button';
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '../../components/ui/field';
import { Input } from '../../components/ui/input';
import { Sheet, SheetContent, SheetHeader } from '../../components/ui/sheet';

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
              <h3 className="text-xl font-semibold text-slate-700">
                Mudar senha (Banco)
              </h3>
              <p className="text-sm text-muted-foreground">
                Alterar a senha do usuário de banco de dados.
              </p>
            </SheetHeader>

            <form
              className="px-6"
              onSubmit={(e) => {
                e.preventDefault();
                // aqui você chamaria a API para alterar a senha do banco
                setOpenChangeDbPwd(false);
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel>Usuário do banco</FieldLabel>
                  <FieldContent>
                    <Input placeholder="Usuário do banco" />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Nova senha do banco</FieldLabel>
                  <FieldContent>
                    <Input type="password" placeholder="Nova senha" />
                  </FieldContent>
                </Field>

                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenChangeDbPwd(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </FieldGroup>
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
              <h3 className="text-xl font-semibold text-slate-700">
                Mudar senha (Usuário)
              </h3>
              <p className="text-sm text-muted-foreground">
                Alterar a senha de acesso do usuário.
              </p>
            </SheetHeader>

            <form
              className="px-6"
              onSubmit={(e) => {
                e.preventDefault();
                // aqui você chamaria a API para alterar a senha do usuário
                setOpenChangeUserPwd(false);
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel>Senha atual</FieldLabel>
                  <FieldContent>
                    <Input type="password" placeholder="Senha atual" />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Nova senha</FieldLabel>
                  <FieldContent>
                    <Input type="password" placeholder="Nova senha" />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Confirmar nova senha</FieldLabel>
                  <FieldContent>
                    <Input
                      type="password"
                      placeholder="Confirme a nova senha"
                    />
                  </FieldContent>
                </Field>

                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenChangeUserPwd(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </FieldGroup>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
