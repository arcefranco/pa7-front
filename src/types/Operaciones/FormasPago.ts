export interface FormasPago {
  Codigo: number;
  Nombre: string;
  SolicitaCtaBancaria: number;
  SolicitaNroCheque: number;
  CuentaContable: string;
  UsarEnMesaPlanesCompra: number;
  UsarEnMesaPlanesVta: number;
  UsarEnCompraProv: number;
  UsarEnMesaPlanesCostos: number;
  CtaSecundaria: string;
  C2: number;
  CtaDefCompraMP_C2: number;
  UsarEnHaberesNetosPagoVoucher: number;
  EsTarjeta: number;
  EsEfvo: number;
  UsarEnPreSolicitudes: number;
  SolicitaPreSolicitud: number;
  UsarEnCuotasRecuperoCobro: number;
  UsarEnCuotasRecuperoPago: number;
  EsGanancia: number;
  UsarEnMoraTecnicaCobro: number;
  UsarEnCobranzaFacturasGiama: number;
  BajaCuotaTerminal: number;
}
