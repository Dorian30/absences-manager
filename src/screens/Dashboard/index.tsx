import { useState } from 'react';
import styled from 'styled-components';

import { Button, Navbar, Pagination } from 'src/components';
import { ReactComponent as BrandLogo } from 'src/assets/logos/lg_brand-logo.svg';
import { ReactComponent as Loader } from 'src/assets/loader.svg';
import { THEMES_TYPES } from 'src/constants';
import { useGetAbsencesQuery } from 'src/services/absences';

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAbsencesQuery(currentPage);
  const { absences, totalRecords } = data || {};

  return (
    <>
      <Navbar />
      <Content>
        <ContentHeader>
          <TitleContainer>
            <StyledBrandLogo height="30px" width="80px" />
            <Title>Absences</Title>
          </TitleContainer>
          <Button>Generate iCal</Button>
        </ContentHeader>
        <Table isFetching={isFetching}>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Period</TableHeadCell>
              <TableHeadCell>Admitter Note</TableHeadCell>
              <TableHeadCell>Member Note</TableHeadCell>
            </TableRow>
          </TableHead>
          <tbody>
            {isFetching ? (
              <LoaderContainer>
                <StyledLoader width="80" height="85" />
              </LoaderContainer>
            ) : (
              absences?.map(
                ({
                  id,
                  name,
                  type,
                  status,
                  period,
                  admitterId,
                  memberNote
                }) => (
                  <TableRow key={id}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{period}</TableCell>
                    <TableCell>{admitterId || '-'}</TableCell>
                    <TableCell>{memberNote || '-'}</TableCell>
                  </TableRow>
                )
              )
            )}
          </tbody>
        </Table>
        <Pagination
          totalRecords={totalRecords}
          onPageChange={page => setCurrentPage(page)}
        />
      </Content>
    </>
  );
}

const StyledBrandLogo = styled(BrandLogo)<{ theme: THEMES_TYPES }>`
  path {
    fill: ${p => p.theme.colors.onBackground};
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  position: absolute;
`;

const StyledLoader = styled(Loader)`
  color: ${p => p.theme.colors.primary.default};
`;

const Content = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 68px 0;
  width: 100%;

  @media ${p => p.theme.breakpoints.sm} {
    padding: 68px 52px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 74px;

  @media ${p => p.theme.breakpoints.sm} {
    justify-content: space-between;
  }
`;

const TitleContainer = styled.div`
  display: none;

  @media ${p => p.theme.breakpoints.sm} {
    display: flex;
    align-items: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Title = styled.h1`
  color: ${p => p.theme.colors.onBackground};
  margin-left: 15px;
`;

const Table = styled.table<{ isFetching: boolean }>`
  border-spacing: 0;
  color: ${p => p.theme.colors.onSurface};
  position: relative;
  margin-bottom: ${p => (p.isFetching ? 300 : 75)}px;

  text-align: left;
  width: 100%;
`;

const TableRow = styled.tr`
  height: 56px;

  &:nth-child(even) {
    background: ${p => p.theme.colors.surface.variant1};
  }
`;

const TableHead = styled.thead`
  background: ${p => p.theme.colors.surface.default};
  border-bottom: 1px solid ${p => p.theme.colors.primary.default};
`;

const TableHeadCell = styled.th`
  width: 16.66%;
  padding: 0 25px;
`;

const TableCell = styled.td`
  width: 16.66%;
  padding: 0 25px;
`;
