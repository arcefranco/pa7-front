export interface Vendedor {
  Codigo?: number;
  Nombre: string;
  Activo: number;
  TeamLeader?: number | null;
  Categoria?: string;
  OficialS: number | null;
  OficialM: number | null;
  FechaBaja: string;
  Escala?: number | null;
}
