import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import StatusBadge from './StatusBadge';

type Props = {
  title: string;
  subtitle?: string;
  Icon: React.ElementType;
  status?: string;
  lastAccess?: string;
};

export function FavoriteCard({ title, subtitle, Icon, status, lastAccess }: Props) {
  return (
    <Card className="group transition-all duration-300 cursor-pointer border-1 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white text-lg">
              <Icon size={20} weight="duotone"   />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{subtitle}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusBadge status={status ?? 'offline'} />
          </div>
          <span className="text-xs text-muted-foreground">{lastAccess}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default FavoriteCard;
