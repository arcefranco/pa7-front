export enum accion {
  A = "A",
  B = "B",
  M = "M",
}

export interface NuevoPago {
  accion: accion;
  codEmpresa: number;
  codigoMarca: number;
  ValorCuota: number;
  impTotalAbonado: number;
  Numero: number;
  Solicitud: number;
  Fecha: string;
  Importe: string;
  Interes: number;
  ImpAbonado: number;
  FormaDePago: string;
  NroRecibo: string;
  FechaVto: string;
  Tarjeta: string;
  NroTarjeta: string;
  NroCupon: string;
  FechaCupon: string;
  Lote: string;
  CantPagos: string;
  cuentaContable?: string;
}
