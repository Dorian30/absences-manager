import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { TRootState } from 'src/store';
import { switchTheme } from 'src/store/user';
import { ReactComponent as BrandLogo } from 'src/assets/logos/lg_brand-logo.svg';
import { ReactComponent as BrandLogoTitle } from 'src/assets/logos/lg_brand-logo-title.svg';
import { ReactComponent as DarkThemeIcon } from 'src/assets/icons/ic_moon.svg';
import { ReactComponent as LightThemeIcon } from 'src/assets/icons/ic_sun.svg';
import { THEMES_TYPES } from 'src/constants';

import { Row } from '../Row';

export interface INavbar {
  className?: string;
}

export function Navbar({ className = '' }: INavbar) {
  const { theme } = useSelector((state: TRootState) => state.user);
  const dispatch = useDispatch();

  const ThemeIcon =
    theme === THEMES_TYPES.dark ? LightThemeIcon : DarkThemeIcon;

  const handleOnSwitch = () => dispatch(switchTheme());

  return (
    <Container className={className}>
      <Row alignItems="center">
        <StyledLogo height="30px" width="80px" />
        <StyledLogoTitle width="250px" />
      </Row>
      <NavTitle>Absences</NavTitle>
      <ThemeIconContainer aria-label="theme-switcher" onClick={handleOnSwitch}>
        <ThemeIcon
          role="img"
          aria-label={`${theme}-theme`}
          height="28px"
          width="28px"
        />
      </ThemeIconContainer>
    </Container>
  );
}

const Container = styled.nav`
  background-color: ${p => p.theme.colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 25px;
  width: 100%;

  @media ${p => p.theme.breakpoints.sm} {
    padding: 30px 52px;
  }
`;

const NavTitle = styled.h1`
  font-size: 30px;
  color: ${p => p.theme.colors.onPrimary};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media ${p => p.theme.breakpoints.sm} {
    display: none;
  }
`;

const StyledLogo = styled(BrandLogo)`
  margin-right: 10px;
`;

const StyledLogoTitle = styled(BrandLogoTitle)`
  display: none;

  @media ${p => p.theme.breakpoints.sm} {
    display: block;
  }
`;

const ThemeIconContainer = styled.button`
  path {
    fill: ${p => p.theme.colors.onPrimary};
    transition: fill ease 0.3s;
  }

  &:hover {
    path {
      fill: ${p => p.theme.colors.grayscale[500]};
    }
  }
`;
