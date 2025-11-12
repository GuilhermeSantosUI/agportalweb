// Lista simples de módulos permitidos (ex.: "meus" 5 sistemas)
// Pode ser substituída por chamada à API no futuro.
export const allowedModuleIds = [
  'agfolhaweb',
  'agfrota',
  'agobra',
  'agalvara',
  'agcontrato',
];

export function hasAccess(id?: string) {
  if (!id) return false;
  return allowedModuleIds.includes(id);
}

export default { allowedModuleIds, hasAccess };
