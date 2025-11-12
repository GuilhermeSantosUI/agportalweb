import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';


export function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
