import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background ease 0.3s;
  }

  *:focus {
    outline: none;
  }

  html {
    height: 100vh;
  }

  body {
    background-color: ${p => p.theme.colors.background};
    display: flex;
    font-family: 'Source Sans Pro', 'sans-serif';
    flex-direction: column;
    min-height: 100%;
    width: 100vw;
  }

  h1, h2, h3, h4, h5, h6, p, span, svg {
    transition: color ease 0.3s;
  }


  input,
  select,
  textarea,
  button {
    border: 0;
    border-radius: 0;
  }

  button {
    background: transparent;
    cursor: pointer;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  a:focus,
  a:active {
    text-decoration: none;
  }

  ul,
  li {
    list-style-type: none;
  }
`;
