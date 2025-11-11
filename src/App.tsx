import { Toaster } from '@/components/ui/sonner';
import { Dashboard } from '@/pages/dashboard';
import { Login } from '@/pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      {/* Toaster global para notificações Sonner */}
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
