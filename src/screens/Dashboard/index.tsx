import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';

import { Button, Navbar, Pagination, Row, TableFilter } from 'src/components';
import { ReactComponent as BrandLogo } from 'src/assets/logos/lg_brand-logo.svg';
import { ReactComponent as Loader } from 'src/assets/loaders/ld_bars.svg';
import { ReactComponent as FilterIcon } from 'src/assets/icons/ic_filter.svg';
import { THEMES_TYPES } from 'src/constants';
import {
  useGetAbsencesQuery,
  IGetAbsencesParams,
  useLazyGetICalendarQuery
} from 'src/services';
import { isEmpty } from 'src/utils';

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState<IGetAbsencesParams['type']>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [skip, setSkip] = useState(false);

  const { data, isFetching, isSuccess, isError, refetch } = useGetAbsencesQuery(
    {
      page: currentPage,
      type,
      from,
      to
    },
    { skip }
  );
  const { absences, totalRecords } = data || {};

  const handleOnType = (type: IGetAbsencesParams['type']) => () => {
    setSkip(true);
    setType(type);
    setCurrentPage(1);
    setSkip(false);
  };

  const handleOnPeriodAll = () => {
    setSkip(true);
    setTo(null);
    setFrom(null);
    setCurrentPage(1);
    setSkip(false);
  };

  const handleOnTo: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value }
  }) => {
    setSkip(true);
    setTo(value);
    setCurrentPage(1);
    setSkip(false);
  };

  const handleOnFrom: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value }
  }) => {
    setSkip(true);
    setFrom(value);
    setCurrentPage(1);
    setSkip(false);
  };

  const [getICalendar, iCalQuery] = useLazyGetICalendarQuery();

  const handleOnGenerateIcal = async () => {
    try {
      const { data: iCal } = await getICalendar({ type, from, to });
      if (!iCal) throw new Error();
      window.open(encodeURI('data:text/calendar;charset=utf8,' + iCal.text));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <Content>
        <ContentHeader>
          <TitleContainer>
            <StyledBrandLogo height="30px" width="80px" />
            <Title>Absences</Title>
          </TitleContainer>
          <Button loading={iCalQuery.isFetching} onClick={handleOnGenerateIcal}>
            Generate iCal
          </Button>
        </ContentHeader>
        <Table>
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
                          role="img"
                          aria-label="type"
                          $isActive={isActive}
                          onClick={() => setIsActive(!isActive)}
                        />
                      </Row>
                    )}
                  </TableFilter.Header>
                  <TableFilter.Menu>
                    <FilterMenu>
                      <Row justifyContent="space-between" alignItems="center">
                        <label htmlFor="all">Show All</label>
                        <FilterCheckbox
                          id="all"
                          name="type"
                          checked={!type}
                          onChange={handleOnType(null)}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <label htmlFor="sickness">Sickness</label>
                        <FilterCheckbox
                          id="sickness"
                          name="type"
                          checked={type === 'sickness'}
                          onChange={handleOnType('sickness')}
                        />
                      </Row>
                      <Row justifyContent="space-between" alignItems="center">
                        <label htmlFor="vacation">Vacation</label>
                        <FilterCheckbox
                          id="vacation"
                          name="type"
                          checked={type === 'vacation'}
                          onChange={handleOnType('vacation')}
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
                          role="img"
                          aria-label="period"
                          $isActive={isActive}
                          onClick={() => setIsActive(!isActive)}
                        />
                      </Row>
                    )}
                  </TableFilter.Header>
                  <TableFilter.Menu>
                    <FilterMenu>
                      <Row justifyContent="space-between" alignItems="center">
                        <label htmlFor="all">Show All</label>
                        <FilterCheckbox
                          id="all"
                          name="period"
                          checked={!from && !to}
                          onChange={handleOnPeriodAll}
                        />
                      </Row>
                      <label>Date Range:</label>
                      <Row justifyContent="space-between" alignItems="center">
                        <DateRangeInput
                          name="from"
                          onChange={handleOnFrom}
                          value={from || ''}
                          placeholder="From"
                        />
                        <DateRangeInput
                          name="period.to"
                          onChange={handleOnTo}
                          value={to || ''}
                          placeholder="To"
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
          <tbody>
            {!isFetching &&
              absences?.map(item => (
                <TableRow key={`${item.id}-${type}-${from}-${to}`}>
                  <TableCell>{item.memberName}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.admitterId || '-'}</TableCell>
                  <TableCell>{item.memberNote || '-'}</TableCell>
                </TableRow>
              ))}
          </tbody>
        </Table>
        {isFetching && (
          <StateContainer>
            <StyledLoader
              role="img"
              aria-label="loader"
              width="80"
              height="85"
            />
          </StateContainer>
        )}
        {!isFetching && isSuccess && isEmpty(absences) && (
          <StateContainer>
            <StateMsg>There are no absences entries to display</StateMsg>
          </StateContainer>
        )}
        {!isFetching && isError && (
          <StateContainer>
            <StateMsg>There was an error with your request</StateMsg>
            <Button onClick={() => refetch()}>Try again</Button>
          </StateContainer>
        )}
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

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  color: ${p => p.theme.colors.onSurface};
  position: relative;
  margin-bottom: 75px;

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

const StyledFilterIcon = styled(FilterIcon)<{ $isActive?: boolean }>`
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

const DateRangeInput = styled.input.attrs({ type: 'date' })`
  width: 120px;
  height: 25px;
  padding: 5px;
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: center;
  margin-bottom: 75px;
  height: 300px;
  width: 100%;
`;

const StyledLoader = styled(Loader)`
  color: ${p => p.theme.colors.primary.default};
`;

const StateMsg = styled.p`
  align-items: center;
  color: ${p => p.theme.colors.onBackground};
  display: flex;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
`;
