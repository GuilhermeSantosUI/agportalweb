import * as React from 'react';
import { toast } from 'sonner';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '../../components/ui/field';
import { Input } from '../../components/ui/input';
import { Sheet, SheetContent, SheetHeader } from '../../components/ui/sheet';

export function ReregisterForm({ onClose }: { onClose?: () => void }) {
  const [identifier, setIdentifier] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [cpf, setCpf] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [gender, setGender] = React.useState<'M' | 'F' | ''>('');
  // photo upload state
  const [photo, setPhoto] = React.useState<{ file: File; url: string } | null>(
    null
  );
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const maxPhotoSize = 100 * 1024; // 100 KB

  React.useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo.url);
    };
  }, []);

  function handleClose() {
    onClose?.();
  }

  function handleSubmit() {
    if (!identifier || identifier.trim() === '') {
      toast.error('Informe a matrícula ou identificador.');
      return;
    }

    if (!cpf || cpf.trim() === '') {
      toast.error('Informe o CPF.');
      return;
    }

    if (!email || email.trim() === '') {
      toast.error('Informe o e-mail.');
      return;
    }

    setSubmitting(true);
    toast('Enviando recadastramento...', { icon: 'loading' });

    setTimeout(() => {
      setSubmitting(false);
      toast.success('Recadastramento concluído. Você será redirecionado.');
      handleClose();
    }, 1200);
  }

  // photo helpers
  function handlePhotoFile(f: File) {
    if (!f.type || !f.type.startsWith('image/')) {
      toast.error(`${f.name}: tipo de arquivo não suportado`);
      return;
    }

    if (f.size > maxPhotoSize) {
      toast.error(`${f.name}: arquivo muito grande (máx. 100 KB)`);
      return;
    }

    try {
      const url = URL.createObjectURL(f);
      if (photo) URL.revokeObjectURL(photo.url);
      setPhoto({ file: f, url });
      toast.success('Foto adicionada');
    } catch {
      toast.error('Erro ao processar a imagem.');
    }
  }

  function removePhoto() {
    if (!photo) return;
    URL.revokeObjectURL(photo.url);
    setPhoto(null);
    toast('Foto removida');
  }

  return (
    <div className="w-full">
      <SheetHeader className="mb-4 gap-0">
        <h3 className="text-xl font-semibold text-slate-700">
          Recadastramento
        </h3>
        <p className="text-sm text-muted-foreground">
          Por razões de segurança, atualize seus dados no portal. Ao atualizar
          você pode ser redirecionado para a tela de login.
        </p>
      </SheetHeader>

      <form
        className="px-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="pb-4">
          <div className="bg-card/60 border border-sky-100 rounded p-4 mb-4">
            <div className="flex items-center gap-4">
              <div
                className="flex flex-col items-center gap-2"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files?.[0];
                  if (f) handlePhotoFile(f);
                }}
              >
                <Avatar className="h-16 w-16 ring-2 ring-sky-200">
                  {photo ? (
                    <AvatarImage src={photo.url} alt="Foto do usuário" />
                  ) : (
                    <AvatarImage
                      src="/images/avatar-placeholder.png"
                      alt="Usuário"
                    />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handlePhotoFile(f);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sky-700 border-sky-200"
                  >
                    Alterar foto
                  </Button>

                  {photo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto()}
                      className="text-red-600"
                    >
                      Remover
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-600">Usuário:</div>
                <div className="text-xl font-bold leading-none">
                  Guilherme Santos
                </div>
                <div className="mt-2 text-xs text-sky-600">
                  Solte uma imagem aqui ou clique em “Alterar foto”.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 rounded px-3 py-2 text-sm text-amber-900 mb-4">
            Atenção: O tamanho máximo permitido para imagem de perfil é de 100
            KB.
          </div>

          {photo && (
            <div className="mb-4 border rounded p-3 text-sm bg-sky-50 border-sky-100">
              <div className="flex items-center justify-between">
                <div className="truncate max-w-xs">{photo.file.name}</div>
                <div className="text-xs text-slate-600">
                  {(photo.file.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
          )}

          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel>Matrícula / Usuário</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Informe o identificador"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </FieldContent>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>CPF:</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Email:</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="seu@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FieldContent>
              </Field>
            </div>

            <Field orientation="horizontal">
              <FieldLabel>Sexo:</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={gender === 'M'}
                      onChange={() => setGender('M')}
                      className="accent-primary"
                    />
                    <span className="text-sm">Masculino</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={gender === 'F'}
                      onChange={() => setGender('F')}
                      className="accent-primary"
                    />
                    <span className="text-sm">Feminino</span>
                  </label>
                </div>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Nome:</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FieldContent>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Telefone:</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="(99)99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Nascimento:</FieldLabel>
                <FieldContent>
                  <Input
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </FieldContent>
              </Field>
            </div>

            <FieldSeparator />

            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" onClick={() => handleClose()}>
                Fechar
              </Button>
              <Button type="submit" loading={submitting}>
                Recadastrar
              </Button>
            </div>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
}

export function Reregister({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full rounded-tl-2xl rounded-bl-2xl overflow-y-auto"
        style={{ maxWidth: 500 }}
      >
        <ReregisterForm onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}

export default Reregister;
