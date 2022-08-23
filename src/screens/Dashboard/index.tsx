import { useState } from 'react';
import styled from 'styled-components';

import { Button, Navbar, Pagination, Row, TableFilter } from 'src/components';
import { ReactComponent as BrandLogo } from 'src/assets/logos/lg_brand-logo.svg';
import { ReactComponent as Loader } from 'src/assets/loader.svg';
import { ReactComponent as FilterIcon } from 'src/assets/icons/ic_filter.svg';
import { THEMES_TYPES } from 'src/constants';
import { useGetAbsencesQuery } from 'src/services/absences';

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState<'vacation' | 'sickness' | 'all'>('all');
  const [period, setPeriod] = useState<'all' | 'monthly' | 'yearly'>('all');

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
              <TableHeadCell>
                <TableFilter>
                  <TableFilter.Header>
                    {({ setIsActive, isActive }) => (
                      <Row alignItems="center">
                        <span>Type</span>
                        <StyledFilterIcon
                          $isActive={isActive}
                          onClick={() => setIsActive(!isActive)}
                        />
                      </Row>
                    )}
                  </TableFilter.Header>
                  <TableFilter.Menu>
                    <FilterMenu>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Show All</span>
                        <FilterCheckbox
                          checked={type === 'all'}
                          onClick={() => setType('all')}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Sickness</span>
                        <FilterCheckbox
                          checked={type === 'sickness'}
                          onClick={() => setType('sickness')}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Vacation</span>
                        <FilterCheckbox
                          checked={type === 'vacation'}
                          onClick={() => setType('vacation')}
                        />
                      </Row>
                    </FilterMenu>
                  </TableFilter.Menu>
                </TableFilter>
              </TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>
                <TableFilter>
                  <TableFilter.Header>
                    {({ setIsActive, isActive }) => (
                      <Row alignItems="center">
                        <span>Period</span>
                        <StyledFilterIcon
                          $isActive={isActive}
                          onClick={() => setIsActive(!isActive)}
                        />
                      </Row>
                    )}
                  </TableFilter.Header>
                  <TableFilter.Menu>
                    <FilterMenu>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Show All</span>
                        <FilterCheckbox
                          checked={period === 'all'}
                          onClick={() => setPeriod('all')}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Monthly</span>
                        <FilterCheckbox
                          checked={period === 'monthly'}
                          onClick={() => setPeriod('monthly')}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <span>Yearly</span>
                        <FilterCheckbox
                          checked={period === 'yearly'}
                          onClick={() => setPeriod('yearly')}
                        />
                      </Row>
                    </FilterMenu>
                  </TableFilter.Menu>
                </TableFilter>
              </TableHeadCell>
              <TableHeadCell>Admitter Note</TableHeadCell>
              <TableHeadCell>Member Note</TableHeadCell>
            </TableRow>
          </TableHead>
          {isFetching ? (
            <LoaderContainer>
              <StyledLoader width="80" height="85" />
            </LoaderContainer>
          ) : (
            <tbody>
              {absences?.map(
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
              )}
            </tbody>
          )}
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
  border-collapse: collapse;
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
  position: relative;
  width: 16.66%;
  padding: 0 25px;
`;

const TableCell = styled.td`
  width: 16.66%;
  padding: 0 25px;
`;

const StyledFilterIcon = styled(FilterIcon)<{ $isActive: boolean }>`
  margin-left: 10px;
  color: ${p =>
    p.$isActive
      ? p.theme.colors.primary.default
      : p.theme.colors.surface.variant1};

  &:hover {
    cursor: pointer;
  }
`;

const FilterMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${p => p.theme.colors.onSurface};
  background: ${p => p.theme.colors.surface.default};
  box-shadow: 1px 1px 4px rgba(#000, 0.25);
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  padding: 23px;
  width: 300px;
`;

const FilterCheckbox = styled.input.attrs({ type: 'checkbox' })`
  height: 15px;
  width: 15px;

  &:hover {
    cursor: pointer;
  }
`;
