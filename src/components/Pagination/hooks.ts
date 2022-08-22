import { useState, useMemo, useCallback } from 'react';

export const LEFT_PAGE = 'LEFT_PAGE';
export const RIGHT_PAGE = 'RIGHT_PAGE';

import { range } from 'src/utils';

export interface IUsePaginationOptions {
  pageLimit?: number;
  onPageChange?: (pageNumber?: number) => void;
  pageNeighbours?: number;
}

/**
 * (x) => first and last page (always visible)
 * [x] => represents current page
 * {x} => represents page neighbours
 */
export function usePagination(
  totalRecords: number | undefined,
  { pageLimit = 10, pageNeighbours = 2, onPageChange }: IUsePaginationOptions
) {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = useMemo(() => {
    if (!totalRecords) return [];
    const totalPages = Math.ceil(totalRecords / pageLimit);

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    // handle: (1) < {5 6} [7] {8 9} (10)
    if (totalPages <= totalBlocks) return range(1, totalPages);

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = range(startPage, endPage) as Array<number | string>;

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      // handle: 1 < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }, [currentPage, pageLimit, pageNeighbours, totalRecords]);

  const handleOnPageChange = useCallback(
    (page: number) => {
      onPageChange?.();
      setCurrentPage(page);
    },
    [onPageChange]
  );

  return { pages, currentPage, handleOnPageChange };
}
