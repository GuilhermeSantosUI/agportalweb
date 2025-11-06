export type CertificateType = {
  id: string;
  name: string;
  issuer: string;
  validUntil: string;
  type: 'A1' | 'A3';
  subject: string;
};
