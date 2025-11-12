import { DownloadSimple, PlusCircle, X } from '@phosphor-icons/react';
import React from 'react';

import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Field, FieldGroup, FieldLabel } from '../../components/ui/field';
import { Input } from '../../components/ui/input';
import { Sheet, SheetContent, SheetHeader } from '../../components/ui/sheet';
import { Textarea } from '../../components/ui/textarea';

type UploadedFile = {
  id: string;
  file: File;
  url: string;
};

export function RequestAccess() {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // form state
  const [what, setWhat] = React.useState('');
  const [justification, setJustification] = React.useState('');
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const allowedTypes = [
    'application/pdf',
    'application/zip',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const maxFileSize = 500 * 1024; // 500kb

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

            <form
              className="px-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="request-what">
                    O que deseja acessar?
                  </FieldLabel>
                  <Input
                    id="request-what"
                    placeholder="Ex.: Relatório financeiro, tela de Gestão"
                    value={what}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWhat(e.target.value)
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="request-justification">
                    Justificativa:
                  </FieldLabel>
                  <Textarea
                    id="request-justification"
                    className="h-40 resize-none"
                    placeholder="Explique por que precisa do acesso (máx. 500 caracteres)"
                    value={justification}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setJustification(e.target.value)
                    }
                    maxLength={500}
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
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.zip,.jpg,.jpeg,.png,.gif,.doc,.docx"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => inputRef.current?.click()}
                      >
                        <PlusCircle className="mr-2" /> Adicionar arquivo
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 border rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40">
                        <tr>
                          <th className="px-3 py-2 text-left">
                            Descrição do Arquivo
                          </th>
                          <th className="px-3 py-2">Tamanho</th>
                          <th className="px-3 py-2">Download</th>
                          <th className="px-3 py-2">Excluir</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-3 py-4 text-sm text-muted-foreground text-center"
                            >
                              Nenhum arquivo anexado
                            </td>
                          </tr>
                        ) : (
                          files.map((f) => (
                            <tr
                              key={f.id}
                              className="odd:bg-white even:bg-muted/10"
                            >
                              <td className="px-3 py-2 max-w-60 truncate">
                                {f.file.name}
                              </td>
                              <td className="px-3 py-2">
                                {formatBytes(f.file.size)}
                              </td>
                              <td className="px-3 py-2 text-center">
                                <a
                                  href={f.url}
                                  download={f.file.name}
                                  aria-label="download"
                                >
                                  <DownloadSimple />
                                </a>
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button
                                  type="button"
                                  className="text-red-600"
                                  onClick={() => removeFile(f.id)}
                                >
                                  <X />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-4">
                  <Button variant="outline" onClick={() => onCloseSheet()}>
                    Fechar
                  </Button>
                  <Button type="submit" loading={submitting}>
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

  // helpers
  function formatBytes(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const nextFiles: UploadedFile[] = [];
    for (let i = 0; i < selected.length; i++) {
      const f = selected[i];

      if (!allowedTypes.includes(f.type)) {
        toast.error(`${f.name}: tipo de arquivo não suportado`);
        continue;
      }

      if (f.size > maxFileSize) {
        toast.error(`${f.name}: arquivo muito grande (máx. 500kb)`);
        continue;
      }

      const id = `${Date.now()}-${i}-${f.name}`;
      const url = URL.createObjectURL(f);

      nextFiles.push({ id, file: f, url });
    }

    if (nextFiles.length > 0) {
      setFiles((prev) => [...prev, ...nextFiles]);
      toast.success('Arquivo(s) adicionados');
    }

    // reset input to allow same file selection again
    if (inputRef.current) inputRef.current.value = '';
  }

  function removeFile(id: string) {
    const f = files.find((x) => x.id === id);
    if (f) URL.revokeObjectURL(f.url);
    setFiles((prev) => prev.filter((x) => x.id !== id));
    toast('Arquivo removido');
  }

  function onCloseSheet() {
    // cleanup blobs
    files.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles([]);
    setWhat('');
    setJustification('');
    setSheetOpen(false);
  }

  function handleSubmit() {
    if (!what || what.trim() === '') {
      toast.error('Informe o que deseja acessar.');
      return;
    }

    if (!justification || justification.trim() === '') {
      toast.error('Informe a justificativa.');
      return;
    }

    setSubmitting(true);
    toast('Enviando solicitação...', { icon: 'loading' });

    // simulate API request
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Solicitação enviada com sucesso.');
      onCloseSheet();
    }, 1400);
  }
}
