import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *:focus {
    outline: none;
  }

  html {
    height: 100vh;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100vw;
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
