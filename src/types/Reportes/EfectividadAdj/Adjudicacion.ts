export interface Adjudicacion {
  Marca: number;
  Mes: number;
  Anio: number;
  Tipo: string;
  CodOficial: number;
  NomOficial: string;
  Cantidad: number;
  Pedidos: number;
  PedidosDelMes: number | null;
  Categoria: string;

  NombreCategoria: string;
  NombreOficial: string;
}
