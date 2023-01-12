export interface Supervisor {
  Codigo?: number;
  Nombre: string;
  Email?: string;
  EsMicro: number;
  VPM: number | null;
  CuentaContable?: string;
  Gerente?: number | null;
  Activo: number;
  Empresa?: number;
  Zona: number | null;
  inUpdate?: string;
}
