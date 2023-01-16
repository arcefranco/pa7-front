interface Oficial {
  Codigo: number;
  Nombre: string;
  inUpdate: string;
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
