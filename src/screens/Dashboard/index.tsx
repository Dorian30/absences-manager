import styled from 'styled-components';

import { Button, Navbar } from 'src/components';
import { ReactComponent as Logo } from 'src/assets/logos/lg_logo.svg';

export function Dashboard() {
  return (
    <>
      <Navbar />
      <Content>
        <ContentHeader>
          <TitleContainer>
            <Logo height="30px" width="80px" />
            <Title>Absences</Title>
          </TitleContainer>
          <Button>Generate iCal</Button>
        </ContentHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell>Period</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
            </TableRow>
          </TableHead>
        </Table>
      </Content>
    </>
  );
}

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
  color: ${p => p.theme.colors.onSurface};
  text-align: left;
  width: 100%;
`;

const TableRow = styled.tr`
  height: 56px;

  &:nth-child(odd) {
    background: ${p => p.theme.colors.surface.variant1};
  }
`;

const TableHead = styled.thead`
  background: ${p => p.theme.colors.surface.default};
  border-bottom: 1px solid ${p => p.theme.colors.primary.default};
`;

const TableHeadCell = styled.th`
  width: 25%;
  padding: 0 25px;
`;
