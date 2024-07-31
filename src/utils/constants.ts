export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
] as const;

export const ROLES = [
  "Líder de produção",
  "Auxiliar de Produção",
  "Mecânico",
  "Motorista",
  "Encarregado",
  "Afiador de serra",
  "RH"
] as const;

export const rolesToDB: Record<(typeof ROLES)[number], string> = {
  "Líder de produção": "Lider",
  "Auxiliar de Produção": "Auxiliar",
  Mecânico: "Mecanico",
  Motorista: "Motorista",
  Encarregado: "Encarregado",
  "Afiador de serra": "Afiador",
  RH: "RH"
};

export const ROLES_IN_DB = [
  "Lider",
  "Auxiliar",
  "Mecanico",
  "Motorista",
  "Encarregado",
  "Afiador",
  "RH"
] as const;

export const rolesToApp: Record<(typeof ROLES_IN_DB)[number], string> = {
  Lider: "Líder de produção",
  Auxiliar: "Auxiliar de Produção",
  Mecanico: "Mecânico",
  Motorista: "Motorista",
  Encarregado: "Encarregado",
  Afiador: "Afiador de serra",
  RH: "RH"
};
