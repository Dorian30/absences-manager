import styled from 'styled-components';

import { usePagination, RIGHT_PAGE, LEFT_PAGE } from './hooks';

export * from './hooks';

export interface IPagination {
  className?: string;
  onPageChange?: (pageNumber: number) => void;
  pageLimit?: number;
  totalRecords: number | undefined;
}

export function Pagination({
  className = '',
  pageLimit = 10,
  onPageChange,
  totalRecords
}: IPagination) {
  const { pages, currentPage, handleOnPageChange } = usePagination(
    totalRecords,
    { pageLimit, onPageChange }
  );

  if (!totalRecords || pages.length === 1) return null;

  return (
    <Container className={className}>
      <List>
        {pages.map(page => {
          if (page === LEFT_PAGE)
            return (
              <Page
                key={page}
                onClick={() => handleOnPageChange(currentPage - 1)}
              >
                {'<'}
              </Page>
            );

          if (page === RIGHT_PAGE)
            return (
              <Page
                key={page}
                onClick={() => handleOnPageChange(currentPage + 1)}
              >
                {'>'}
              </Page>
            );

          return (
            <Page
              key={page}
              active={page === currentPage}
              onClick={() => handleOnPageChange(page as number)}
            >
              {page}
            </Page>
          );
        })}
      </List>
      <Text>{`Showing ${pageLimit} items out of ${totalRecords}`}</Text>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

const Page = styled.button<{ active?: boolean }>`
  color: ${p =>
    p.active ? p.theme.colors.primary.default : p.theme.colors.onBackground};
  border: 2px solid
    ${p =>
      p.active ? p.theme.colors.primary.default : p.theme.colors.onBackground};
  border-radius: 2px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  transition: color ease 0.3s, border-color ease 0.3s;

  &:hover {
    color: ${p => p.theme.colors.primary.default};
    border-color: ${p => p.theme.colors.primary.default};
  }
`;

const Text = styled.span`
  color: ${p => p.theme.colors.onBackground};
  font-size: 20px;
  font-weight: 700;
`;
