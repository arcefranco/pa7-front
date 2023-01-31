export interface Usuario {
  ID?: number;
  Usuario: string;
  Nombre: string;
  email: string;
  Vendedor: number | null;
  teamLeader: number | null;
  Supervisor: number | null;
  Gerente: number | null;
  UsuarioAnura: number | null;
  VerSoloScoringAsignado: number;
  us_bloqueado: number;
  us_activo: number;
}
