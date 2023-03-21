export interface MoraXVendedor {
  Oficial: string;
  Capa: number;
  V: number;
  P: number;
  M: number;
  PM: string;
  FechaBaja: string;
  SucCodigo: number;
  SucNombre: string;
  SucEmail: string;
  Gerente: number;
}

export interface MoraXVendedorDetalle {
  Marca: number;
  Codigo: number;
  OPPreSol: number;
  FechaSus: string;
  Solicitud: number;
  Apellido: string;
  Nombres: string;
  CodVendedor: number;
  NomVendedor: string;
  CodSucursal: number;
  NomSucursal: string;
  FechaPrescoring: string;
  CodOficial: number;
  NomOficial: string;
  CodClasificacion: string;
  NomClasificacion: string;
  Capa: number;
  Pagada: number;
  ULtimaLlamada: string;
  CPG: number;
  CAD: number;
  FechaVtoCuota: string;
  Plazo: number;
  provincia: string;
  ULtimaObs: string;
  entrega_usado: number;
  Gerente: number;
}
