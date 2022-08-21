import styled from 'styled-components';

import { Button, Navbar } from 'src/components';

export function Dashboard() {
  return (
    <>
      <Navbar />
      <Container>
        <Button>Generate iCal</Button>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 68px 0;
  width: 100%;
`;
