export interface PreSol {
  Marca?: number;
  Numero: number;
  FechaAlta: string;
  Solicitud: number;
  TipoDocumento: number;
  NroDocumento: number;
  Apellido: string;
  Nombres: string;
  Domicilio: string;
  Localidad: string;
  Telefonos: string;
  Telefonos2: string;
  Telefonos3: string;
  Vendedor?: number;
  CodPuntoVenta: number;
  CodModelo: number;
  ImporteTotalCuota: number;
  TotalCuota_InteresBonif?: number;
  FechaEstimCancelacion: string;
  TieneDNI: number;
  TieneServicio: number;
  TieneAnexos: number;
  EstadoPrescoring: number;
  FechaPrescoring: string;
  FechaIngresoExtraNet: string;
  Estadoscoring: number;
  AnuladaCliente: number;
  PasoAOperaciones: number;
  NroReciboX?: string;
  nroRecibo1: string;
  nroRecibo2: string;
  ImporteReciboX: number;
  CuotaTerminal: number;
  CuotaACobrar: number;
  ImpoSenia?: number;
  FechaSenia?: string;
  ID?: number;
  CodFormaPago?: number;
  FechaCheque?: string;
  NroRecibo: string;
  NomFormaPago?: string;
  OficialPC: number;
  origensuscripcion: number;
  ValorCuotaTerminalPRE?: number;
  DebitoAutomatico: number;
  CodTarjeta?: string;
  NroCupon?: string;
  Interes?: number;
  FechaCupon?: string;
  NroTarjeta?: string;
  tipoplan: string;
  DebitoAutomaticoscoring: number;
  PromoEspecial?: number;
  EsTarjeta?: number;
  NombreSucReal: string;
  CodSucReal?: number;
  Empresa?: number;
  Bonificacion: number;
  NumeroCalle: number;
  Piso: number;
  Dto: number;
  CodPostal: number;
  Provincia: string;
  Telefonos4: number;
  EmailParticular: string;
  EmailLaboral: string;
  FechaNac: string;
  Completoscoring?: number;
  NombreSupervisor?: string;
  CodSupervisor?: number;
  eMail?: string;
  CuentaContable?: number;
  Ocupacion: string;
  DomicilioOcupacion?: string;
  FechaIngresoTerminal: string;
  Lote?: number;
  Cantpagos?: number;
  NomModelo?: string;
  NomVendedor: string;
  SeniaUsadaEnmesaplanes?: number;
  FechaUsoDeSenia?: string;
  OficialScoring: number;
  OficialMora: number;
  PlanSubite: number;
  EstadoPlanSubite?: number;
  CodTipoResponsable?: number;
  EsExento?: number;
  NroAsiento?: number;
  Transferencia?: number;
  Rec: number;
  Crucescoring: number;
  FechaCrucescoring: string;
  CodTL?: number;
  NomTL: string;
  UsuarioEditandoscoring?: string;
  NomOficialParaHacerscoring?: string;
  EntregaUsadoRetiro: number;
  NroCuil?: string;
}
