import { DOMAttributes, ReactNode } from 'react';
import styled from 'styled-components';

export interface IBox extends DOMAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export const Box = styled.div<IBox>``;
