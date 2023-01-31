export interface EstructuraItemType {
  Codigo: number;
  Activo: number;
  Title: string;
  Nombre: string;
  Childrens?: EstructuraItemType[];
}
