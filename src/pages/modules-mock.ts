import {
  Buildings,
  Car,
  CurrencyDollar,
  Robot,
  User,
  Users,
} from '@phosphor-icons/react';

export const modules = [
  {
    id: 'agfolhaweb',
    title: 'AgFolhaWeb',
    subtitle: 'Sistema de Folha de Pagamento',
    Icon: Users,
    status: 'online',
    lastAccess: 'Hoje, 08:30',
  },
  {
    id: 'agfrota',
    title: 'AgFrota',
    subtitle: 'Gestão de Frota de Veículos',
    Icon: Car,
    status: 'online',
    lastAccess: 'Ontem, 14:20',
  },
  {
    id: 'aggpt-adm',
    title: 'AgGPT - ADM',
    subtitle: 'Administrador da I.A Ágape',
    Icon: Robot,
    status: 'manutenção',
    lastAccess: '2 dias atrás',
  },
  {
    id: 'agobra',
    title: 'AgObra',
    subtitle: 'Gestão de Obras e Projetos',
    Icon: Buildings,
    status: 'online',
    lastAccess: 'Semana passada',
  },
  {
    id: 'agfinance',
    title: 'AgFinance',
    subtitle: 'Controle Financeiro',
    Icon: CurrencyDollar,
    status: 'online',
    lastAccess: 'Hoje, 09:15',
  },
  {
    id: 'agrh',
    title: 'AgRH',
    subtitle: 'Recursos Humanos',
    Icon: User,
    status: 'offline',
    lastAccess: '1 mês atrás',
  },
];
