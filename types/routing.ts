export interface RouteOptions {
  id?: string | null; // dynamic param
  isShort?: boolean; // crop a part of the path depending on method where it is used
  searchParams?: string; // query
}
