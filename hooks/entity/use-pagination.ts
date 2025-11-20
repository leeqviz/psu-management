import { DEFAULT_PAGE_SIZE } from "#constants/page-sizes";
import { DELAY_TIME } from "#constants/time";
import { useDebouncedEntity } from "#hooks/entity";
import { useEffect, useMemo, useState } from "react";

/**
 * Use this hook only if pagination logic is not available on backend
 */
export const usePagination = <TElement = unknown>(
  allElements?: TElement[] | null,
  pageSize: number = DEFAULT_PAGE_SIZE,
  delay: number = DELAY_TIME * 2
) => {
  //default values
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //recalculate page count if allElements length changes
  useEffect(() => {
    setPagesCount(Math.ceil((allElements?.length ?? 0) / pageSize));
  }, [allElements?.length, pageSize]);

  //observe current page changes and debounce it
  const debouncedCurrentPage = useDebouncedEntity(currentPage, delay);

  //paginated array
  const currentElements = useMemo(() => {
    return (
      allElements?.slice(
        (debouncedCurrentPage - 1) * pageSize,
        (debouncedCurrentPage - 1) * pageSize + pageSize
      ) ?? []
    );
  }, [allElements, pageSize, debouncedCurrentPage]);

  //controls
  return {
    pagesCount,
    setPagesCount,
    currentPage,
    setCurrentPage,
    currentElements,
  };
};
