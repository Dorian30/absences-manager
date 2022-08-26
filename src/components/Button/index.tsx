import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import { ReactComponent as Spinner } from 'src/assets/loaders/ld_spinner.svg';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  loading?: boolean;
}

export function Button({ children, loading, ...props }: IButton) {
  return (
    <Container disabled={loading} {...props}>
      {loading ? <StyledSpinner /> : children}
    </Container>
  );
}

const Container = styled.button`
  background: ${p => p.theme.colors.primary.default};
  color: ${p => p.theme.colors.onPrimary};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 42px;
  width: 152px;
  transition: background ease 0.3s;

  &:hover {
    background: ${p => p.theme.colors.brand[400]};
  }

  &:disabled {
    background: ${p => p.theme.colors.grayscale[200]};

    circle {
      stroke: ${p => p.theme.colors.grayscale[500]};
    }
  }
`;

const StyledSpinner = styled(Spinner)`
  height: 20px;
  width: 20px;
`;
