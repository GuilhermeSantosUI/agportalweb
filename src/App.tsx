import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />

      <Routes />
    </BrowserRouter>
  );
}
