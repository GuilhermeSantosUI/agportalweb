import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { Route, Routes as RoutesProvider } from 'react-router-dom';

export function Routes() {
  return (
    <RoutesProvider>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </RoutesProvider>
  );
}
