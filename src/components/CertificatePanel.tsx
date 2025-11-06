import { Button } from '@/components/ui/button';

import type { CertificateType } from '@/types/certificate';
import {
  BuildingIcon,
  CertificateIcon,
  ClockIcon,
  ShieldCheckIcon,
  SpinnerGapIcon,
  UserIcon
} from '@phosphor-icons/react';
import React from 'react';

type SelectionProps = {
  certificates: CertificateType[];
  selectedCert: string | null;
  onSelect: (id: string) => void;
  onStart: () => void;
  onClose: () => void;
  isProcessing?: boolean;
};

export const CertificateSelectionPanel: React.FC<SelectionProps> = ({
  certificates,
  selectedCert,
  onSelect,
  onStart,
  isProcessing,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <CertificateIcon size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Login por Certificado Digital
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecione o certificado a ser utilizado para autenticação
        </p>
      </div>

      <div className="space-y-3 max-h-[40vh] md:max-h-[60vh] overflow-auto">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCert === cert.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(cert.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded ${
                  selectedCert === cert.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100'
                }`}
              >
                <CertificateIcon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{cert.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      cert.type === 'A1'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {cert.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {cert.subject}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ShieldCheckIcon size={12} />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon size={12} />
                    <span>Válido até {cert.validUntil}</span>
                  </div>
                </div>
              </div>
              {selectedCert === cert.id && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <CertificateIcon size={32} className="text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">
            Nenhum certificado digital encontrado
          </p>
          <p className="text-xs text-muted-foreground">
            Verifique se o seu certificado está instalado corretamente ou
            conecte seu token
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Autenticação Segura
            </h4>
            <p className="text-xs text-blue-800">
              Sua autenticação via certificado digital é 100% segura e atende
              aos mais altos padrões de segurança da ICP-Brasil.
            </p>
          </div>
        </div>
      </div>

      <Button
        loading={isProcessing}
        className="w-full h-11 bg-[#061633] text-white"
        disabled={!selectedCert}
        onClick={onStart}
      >
        {selectedCert
          ? 'Continuar com Certificado'
          : 'Selecione um certificado'}
      </Button>
    </div>
  );
};

type ProcessingProps = {
  selectedCert?: CertificateType | null;
};

export const CertificateProcessingPanel: React.FC<ProcessingProps> = ({
  selectedCert,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CertificateIcon size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Validando Certificado</h2>
        <p className="text-sm text-muted-foreground">
          Aguarde enquanto validamos seu certificado digital
        </p>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <UserIcon size={20} className="text-gray-600" />
          <div>
            <p className="text-sm font-medium">Certificado Selecionado</p>
            <p className="text-xs text-muted-foreground">
              {selectedCert?.name}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Emitido por:</span>
            <span>{selectedCert?.issuer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Válido até:</span>
            <span>{selectedCert?.validUntil}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tipo:</span>
            <span>Certificado {selectedCert?.type}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <SpinnerGapIcon size={32} className="animate-spin text-primary" />
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Esta operação pode solicitar a senha do seu certificado
        </p>
      </div>
    </div>
  );
};

export const CertificateDonePanel: React.FC = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <ShieldCheckIcon size={32} className="text-green-600" />
    </div>

    <h2 className="text-2xl font-semibold mb-2">Autenticação Concluída!</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Seu certificado foi validado com sucesso. Redirecionando para o sistema...
    </p>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-3 justify-center">
        <BuildingIcon size={20} className="text-green-600" />
        <div>
          <h4 className="text-sm font-medium text-green-900">
            Acesso Autorizado
          </h4>
          <p className="text-xs text-green-800">
            Você será redirecionado para o painel principal
          </p>
        </div>
      </div>
    </div>
  </div>
);

// file exports named panels above
