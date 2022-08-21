import styled from 'styled-components';
import { Property } from 'csstype';

export interface IRow {
  children: React.ReactNode;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  alingSelf?: Property.AlignSelf;
  flexWrap?: Property.FlexWrap;
}

export const Row = styled.div<IRow>`
  display: flex;
  justify-content: ${p => p.justifyContent};
  align-items: ${p => p.alignItems};
  align-self: ${p => p.alingSelf};
  flex-wrap: ${p => p.flexWrap};
`;
