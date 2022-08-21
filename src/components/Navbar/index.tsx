import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { TRootState } from 'src/store';
import { switchTheme } from 'src/store/user';
import { ReactComponent as Logo } from 'src/assets/logos/lg_logo.svg';
import { ReactComponent as LogoTitle } from 'src/assets/logos/lg_logo-title.svg';
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
    theme === THEMES_TYPES.dark ? DarkThemeIcon : LightThemeIcon;

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
  padding: 30px;
  width: 100%;
`;

const NavTitle = styled.h1`
  font-size: 30px;
  color: ${p => p.theme.colors.onPrimary};

  @media ${p => p.theme.breakpoints.sm} {
    display: none;
  }
`;

const StyledLogo = styled(Logo)`
  margin-right: 10px;
`;

const StyledLogoTitle = styled(LogoTitle)`
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
