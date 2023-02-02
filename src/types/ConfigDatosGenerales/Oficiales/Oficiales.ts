export interface Oficial {
  categoria?: string | null;
  Codigo?: number | null;
  Nombre: string;
  login?: string;
  Supervisor?: number | null;
  Activo?: number;
  Inactivo?: number | null;
  inUpdate?: string;
  Objetivo?: number | null;
  TipoOficialMora?: number | null;
  HNMayor40?: number | null;
  IdUsuarioLogin?: string;
  Usuario?: string;
}

export interface OficialScoring extends Oficial {
  IdUsuarioLogin: string;
  Inactivo: number;
  Objetivo: number;
}

export interface OficialMora extends Oficial {
  IdUsuarioLogin: string;
  TipoOficialMora: number;
  Activo: number;
}
