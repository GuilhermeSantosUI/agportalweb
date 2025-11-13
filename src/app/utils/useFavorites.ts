import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const STORAGE_KEY = 'agportal:favorites';

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as string[];
    return [];
  } catch (e) {
    console.error('Failed to read favorites from localStorage', e);
    return [];
  }
}

function writeStorage(list: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to write favorites to localStorage', e);
  }
}

// simple pub/sub to notify multiple hook users in the same tab
const subscribers = new Set<() => void>();
function notify() {
  subscribers.forEach((s) => s());
}

export function toggleFavoriteId(id: string) {
  const list = readStorage();
  const has = list.includes(id);
  const next = has ? list.filter((i) => i !== id) : [...list, id];
  toast.success(has ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
  writeStorage(next);
  notify();
}

export function isFavoriteId(id: string) {
  const list = readStorage();
  return list.includes(id);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readStorage());

  useEffect(() => {
    const handler = () => setFavorites(readStorage());
    subscribers.add(handler);
    // also listen storage events from other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) handler();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      subscribers.delete(handler);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return {
    favorites,
    isFavorite: (id: string) => favorites.includes(id),
    toggle: (id: string) => toggleFavoriteId(id),
  };
}

export default useFavorites;
