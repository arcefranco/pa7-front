import { Bit } from "../../../types/Generales/Bit";
export interface EstructuraComercial {
  ActivoGerentes: number;
  InactivoSucursales: number;
  InactivoTL: Bit;
  InactivoVendedores: number;
  CodigoGerente: number;
  NombreGerente: string;
  CodigoSupervisor: number;
  NombreSupervisor: string;
  CodigoTL: number;
  NombreTL: string;
  CodigoVendedor: number;
  NombreVendedor: string;
}
