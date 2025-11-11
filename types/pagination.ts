export interface PaginationMeta<TElement = unknown> {
  pagesCount?: number | null;
  elementsCount?: number | null;
  currentElements?: TElement[] | null;
}
