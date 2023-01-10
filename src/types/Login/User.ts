import { Rol } from "./Rol";

export interface User {
  id: number;
  Nombre: string;
  codigoVendedor: number;
  codigoSucursal: number;
  codigoGerente: number;
  codigoTeamLeader: number;
  usuarioAnura: number;
  usaUsuarioAnura: number;
  usaWebHookAnura: number;
  PAwebHookAnura: number;
  username: string;
  newUser: number;
  roles: Rol[];
  token: string;
  db: string;
  empresaReal: string;
  codigoMarca: number;
  marca: string;
  codigoEmpresa: number;
  link?: string;
}
