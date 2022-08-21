import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IButton {
  className?: string;
  children: ReactNode;
}

export const Button = styled.button`
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

  &:hover {
    background: ${p => p.theme.colors.brand[400]};
  }

  &:disabled {
    background: ${p => p.theme.colors.grayscale[200]};
  }
`;
