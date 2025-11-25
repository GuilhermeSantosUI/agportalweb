import logoImg from '@/assets/images/agape-logo-amarela.png';
import { CertificateDonePanel, CertificateProcessingPanel, CertificateSelectionPanel } from '@/components/certificate-panel';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

import type { CertificateType } from '@/types/certificate';
import { EyeClosedIcon, EyeIcon } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CertState = 'select' | 'processing' | 'done';

export function Login() {
  const [showCertPanel, setShowCertPanel] = useState(false);
  const [certState, setCertState] = useState<CertState>('select');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [showRecover, setShowRecover] = useState(false);
  const [recoverStep, setRecoverStep] = useState<'cpf' | 'code' | 'reset'>(
    'cpf'
  );
  const [cpfValue, setCpfValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [resetting, setResetting] = useState(false);
  // --- NOVO: estados e usuários mock para o fluxo solicitado ---
  const [cpfInput, setCpfInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [userOptions, setUserOptions] = useState<
    Array<{
      id: string;
      name: string;
      cpf: string;
      password: string;
      active: boolean;
    }>
  >([]);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState(false);

  // Mock de usuários — alguns CPFs com múltiplos usuários ativos para teste
  const [mockUsers] = useState([
    {
      id: 'u1',
      cpf: '123.456.789-00',
      name: 'João Silva (Prefeitura)',
      password: 'senha123',
      active: true,
    },
    {
      id: 'u2',
      cpf: '123.456.789-00',
      name: 'João Silva (Secretaria)',
      password: 'senha123',
      active: true,
    },
    {
      id: 'u3',
      cpf: '987.654.321-00',
      name: 'Maria Oliveira',
      password: 'maria@2025',
      active: true,
    },
    {
      id: 'u4',
      cpf: '555.444.333-22',
      name: 'Usuário Inativo',
      password: 'inativo',
      active: false,
    },
  ] as Array<{ id: string; cpf: string; name: string; password: string; active: boolean }>);
  const [certificates] = useState<CertificateType[]>([
    {
      id: '1',
      name: 'Certificado Pessoal - João Silva',
      issuer: 'Autoridade Certificadora do Brasil',
      validUntil: '15/12/2025',
      type: 'A1',
      subject: 'CN=João Silva, O=Empresa XYZ, C=BR',
    },
    {
      id: '2',
      name: 'Certificado e-CNPJ - Minha Empresa LTDA',
      issuer: 'Serasa Experian',
      validUntil: '30/08/2024',
      type: 'A3',
      subject: 'CN=Minha Empresa LTDA, OID.2.16.76.1.3.1=12345678000195, C=BR',
    },
  ]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (certState === 'processing') {
      t = setTimeout(() => setCertState('done'), 3000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [certState]);

  const navigate = useNavigate();

  useEffect(() => {
    if (certState === 'done') {
      navigate('/dashboard');
    }
  }, [certState, navigate]);

  const [loginLoading, setLoginLoading] = useState(false);

  // Função de login atualizada para suportar múltiplos usuários por CPF
  function handleLoginClick() {
    // Se já estamos no fluxo de seleção de usuário, finalizar login com o usuário selecionado
    if (showUserSelect) {
      if (!selectedUserId) {
        toast.error('Selecione o usuário para entrar.');
        return;
      }

      const user = userOptions.find((u) => u.id === selectedUserId) ?? null;
      if (!user) {
        toast.error('Usuário inválido.');
        return;
      }

      setLoginLoading(true);
      setTimeout(() => {
        setLoginLoading(false);
        navigate('/dashboard');
      }, 800);
      return;
    }

    // Fluxo normal: validar CPF e senha
    if (!cpfInput || cpfInput.trim() === '') {
      toast.error('Informe o CPF do usuário.');
      return;
    }

    if (!passwordInput || passwordInput.trim() === '') {
      toast.error('Informe a senha.');
      return;
    }

    // Procurar usuários ativos com o CPF informado
    const matches = mockUsers.filter((u) => u.cpf === cpfInput && u.active);

    if (matches.length === 0) {
      toast.error('CPF ou senha inválidos.');
      return;
    }

    if (matches.length === 1) {
      // validar senha
      const user = matches[0];
      if (user.password !== passwordInput) {
        toast.error('CPF ou senha inválidos.');
        return;
      }

      setLoginLoading(true);
      setTimeout(() => {
        setLoginLoading(false);
        navigate('/dashboard');
      }, 800);
      return;
    }

    // Se encontrou mais de um usuário, abrir select para escolher qual entrar
    if (matches.length > 1) {
      setUserOptions(matches);
      setShowUserSelect(true);
      setSelectedUserId(null);
      setPasswordInput('');
      toast(
        'Foram encontrados vários perfis para esse CPF. Selecione o usuário desejado.'
      );
      return;
    }
  }

  function openCertPanel() {
    setShowCertPanel(true);
    setCertState('select');
    setSelectedCert(null);
  }

  function openRecoverPanel() {
    setShowRecover(true);
    setRecoverStep('cpf');
    setCpfValue('');
    setCodeValue('');
    setNewPassword('');
    setSendingCode(false);
    setVerifyingCode(false);
    setResetting(false);
  }

  function closeRecoverPanel() {
    setShowRecover(false);
    setRecoverStep('cpf');
  }

  function closeCertPanel() {
    setShowCertPanel(false);
    setCertState('select');
    setSelectedCert(null);
  }

  function onStartCertLogin() {
    if (!selectedCert) return;
    setCertState('processing');
  }

  function handleCertSelect(certId: string) {
    setSelectedCert(certId);
  }

  function sendRecoveryCode() {
    if (!cpfValue || cpfValue.trim() === '') {
      toast.error('Informe o CPF para enviar o código.');
      return;
    }

    setSendingCode(true);
    toast('Enviando código...', { icon: 'loading' });
    setTimeout(() => {
      setSendingCode(false);
      toast.success('Código enviado para o CPF informado.');
      setRecoverStep('code');
    }, 1200);
  }

  function verifyRecoveryCode() {
    if (!codeValue || codeValue.trim() === '') {
      toast.error('Informe o código recebido.');
      return;
    }

    setVerifyingCode(true);
    toast('Verificando código...', { icon: 'loading' });
    setTimeout(() => {
      setVerifyingCode(false);
      toast.success('Código verificado. Defina uma nova senha.');
      setRecoverStep('reset');
    }, 1000);
  }

  function submitNewPassword() {
    if (!newPassword || newPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setResetting(true);
    toast('Redefinindo senha...', { icon: 'loading' });
    setTimeout(() => {
      setResetting(false);
      toast.success('Senha redefinida com sucesso. Você já pode entrar.');
      setShowRecover(false);
    }, 1200);
  }

  return (
    <div className="h-screen bg-background p-6">
      <div className="w-full h-full flex gap-8 items-center">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          className="hidden md:flex w-[60%] object-cover items-center justify-center h-full rounded-xl"
        />

        <div className="flex w-full md:w-[40%] h-full flex-col items-stretch justify-center px-2 md:px-8">
          <div className="mb-6 flex items-center justify-between">
            <img src={logoImg} alt="logo-agape" className="w-36" />

            <div className="text-sm text-muted-foreground">
              O futuro da gestão pública começa aqui!
            </div>
          </div>

          {showCertPanel ? (
            <>
              {certState === 'select' && (
                <CertificateSelectionPanel
                  certificates={certificates}
                  selectedCert={selectedCert}
                  onSelect={handleCertSelect}
                  onStart={onStartCertLogin}
                  onClose={closeCertPanel}
                  isProcessing={false}
                />
              )}

              {certState === 'processing' && (
                <CertificateProcessingPanel
                  selectedCert={
                    certificates.find((c) => c.id === selectedCert) ?? null
                  }
                />
              )}

              {certState === 'done' && <CertificateDonePanel />}
            </>
          ) : showRecover ? (
            <>
              <h2 className="text-2xl font-semibold mb-1">Recuperar senha</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Informe o CPF para receber o código de verificação.
              </p>

              {recoverStep === 'cpf' && (
                <>
                  <label className="text-sm mb-2 text-muted-foreground">
                    CPF:
                  </label>
                  <div className="relative mb-4">
                    <Input
                      placeholder="000.000.000-00"
                      className="h-10"
                      value={cpfValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCpfValue(e.target.value)
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="h-10"
                      onClick={sendRecoveryCode}
                      loading={sendingCode}
                    >
                      Enviar código
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-10"
                      onClick={closeRecoverPanel}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}

              {recoverStep === 'code' && (
                <>
                  <label className="text-sm mb-2 text-muted-foreground">
                    Código recebido:
                  </label>
                  <div className="relative mb-4">
                    <Input
                      placeholder="Código"
                      className="h-10"
                      value={codeValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCodeValue(e.target.value)
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="h-10"
                      onClick={verifyRecoveryCode}
                      loading={verifyingCode}
                    >
                      Verificar código
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-10"
                      onClick={openRecoverPanel}
                    >
                      Reenviar CPF
                    </Button>
                  </div>
                </>
              )}

              {recoverStep === 'reset' && (
                <>
                  <label className="text-sm mb-2 text-muted-foreground">
                    Nova senha:
                  </label>
                  <div className="relative mb-4">
                    <Input
                      placeholder="Nova senha"
                      type="password"
                      className="h-10"
                      value={newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewPassword(e.target.value)
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="h-10"
                      onClick={submitNewPassword}
                      loading={resetting}
                    >
                      Redefinir senha
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-10"
                      onClick={closeRecoverPanel}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-1">agPortal</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Acesse sua conta para continuar
              </p>

              <label className="text-sm mb-2 text-muted-foreground">
                CPF do usuário:
              </label>
              <div className="relative mb-4">
                <Input
                  placeholder="000.000.000-00"
                  className="h-10"
                  value={cpfInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCpfInput(e.target.value)
                  }
                />
              </div>

              <div className="mb-2 relative">
                {showUserSelect ? (
                  <div>
                    <label className="text-sm mb-2 text-muted-foreground">
                      Selecione o usuário:
                    </label>

                    <Select
                      value={selectedUserId ?? ''}
                      onValueChange={(v) => setSelectedUserId(v)}
                    >
                      <SelectTrigger className="w-full h-10!" size="default">
                        <SelectValue 
                          placeholder="Selecione o usuário" 
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {userOptions.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <label className="text-sm mb-2 text-muted-foreground">
                      Senha:
                    </label>

                    <div className="relative">
                      <Input
                        placeholder="************"
                        type={viewPassword ? 'text' : 'password'}
                        className="h-10"
                        value={passwordInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPasswordInput(e.target.value)
                        }
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                        onClick={() => setViewPassword(!viewPassword)}
                      >
                        {viewPassword ? (
                          <EyeClosedIcon size={18} className="text-gray-500" />
                        ) : (
                          <EyeIcon size={18} className="text-gray-500" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">Lembrar de mim</span>
                </div>
                <a
                  className="text-sm underline text-primary cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openRecoverPanel();
                  }}
                >
                  Esqueceu sua senha?
                </a>
              </div>

              <Button
                loading={loginLoading}
                className="w-full mb-6 h-11 bg-[#061633] text-white dark:hover:bg-[#061633]/90"
                onClick={handleLoginClick}
              >
                Acessar minha conta!
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <div className="text-sm text-muted-foreground">
                  Ou entrar com
                </div>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-10 flex items-center justify-center gap-2"
                >
                  Entrar com gov.br
                </Button>
                <Button
                  variant="outline"
                  className="h-10 flex items-center justify-center gap-2"
                  onClick={openCertPanel}
                >
                  Certificado Digital
                </Button>
              </div>
            </>
          )}

          <div className="mt-8 text-sm text-muted-foreground flex items-center justify-between">
            <div>2025© Todos os direitos reservados</div>
            <div>Ágape Sistemas e Tecnologia</div>
          </div>
        </div>
      </div>
    </div>
  );
}
