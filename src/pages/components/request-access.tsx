import { DownloadSimple, PlusCircle, X } from '@phosphor-icons/react';
import React from 'react';

import { Button } from '../../components/ui/button';
import { Field, FieldGroup, FieldLabel } from '../../components/ui/field';
import { Input } from '../../components/ui/input';
import { Sheet, SheetContent, SheetHeader } from '../../components/ui/sheet';
import { Textarea } from '../../components/ui/textarea';

export function RequestAccess() {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setSheetOpen(true)}>
        Solicitar acesso
      </Button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
          style={{ maxWidth: 500 }}
        >
          <div className="w-full">
            <SheetHeader className="mb-4 gap-0">
              <h3 className="text-xl font-semibold text-slate-700">
                Solicitar acesso
              </h3>
              <p className="text-sm text-muted-foreground">
                Solicitação de acesso a telas, relatórios ou módulos.
              </p>
            </SheetHeader>

            <form className="px-6">
              <FieldGroup>
                <Field >
                  <FieldLabel htmlFor="request-what">
                    O que deseja acessar?
                  </FieldLabel>
                  <Input id="request-what" placeholder="" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="request-justification">
                    Justificativa:
                  </FieldLabel>
                  <Textarea
                    id="request-justification"
                    className="h-40 resize-none"
                    placeholder=""
                  />
                </Field>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">
                        Documento/Ofício(s)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Arquivos suportados: pdf, zip, jpg, jpeg, gif, png, doc,
                        docx; Tamanho Máx. do arquivo: 500kb
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2" /> Adicionar arquivo
                    </Button>
                  </div>

                  <div className="mt-4 border rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40">
                        <tr>
                          <th className="px-3 py-2 text-left">
                            Descrição do Arquivo
                          </th>
                          <th className="px-3 py-2">Download</th>
                          <th className="px-3 py-2">Excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="odd:bg-white even:bg-muted/10">
                          <td className="px-3 py-2">agape-logo.png</td>
                          <td className="px-3 py-2 text-center">
                            <a href="#" aria-label="download">
                              <DownloadSimple />
                            </a>
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button type="button" className="text-red-600">
                              <X />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-4">
                  <Button variant="outline" onClick={() => setSheetOpen(false)}>
                    Fechar
                  </Button>
                  <Button
                    onClick={() => {
                      /* submit action */
                    }}
                  >
                    Solicitar
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
