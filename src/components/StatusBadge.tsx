type Props = { status: string };

export function StatusBadge({ status }: Props) {
  const s = status?.toLowerCase();
  const base = 'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium';

  if (s === 'online') return <span className={base + ' bg-emerald-100 text-emerald-800'}>Online</span>;
  if (s === 'offline') return <span className={base + ' bg-gray-100 text-gray-700'}>Offline</span>;
  if (s === 'manutenção' || s === 'manutenção' || s === 'manutencao') return <span className={base + ' bg-amber-100 text-amber-800'}>Manutenção</span>;

  return <span className={base + ' bg-neutral-100 text-neutral-700'}>{status}</span>;
}

export default StatusBadge;
