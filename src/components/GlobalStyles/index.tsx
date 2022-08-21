import { createGlobalStyle } from 'styled-components';

import regularFontPath from 'src/assets/fonts/SourceSansPro-Regular.ttf';
import semiBoldFontPath from 'src/assets/fonts/SourceSansPro-SemiBold.ttf';
import boldFontPath from 'src/assets/fonts/SourceSansPro-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Source Sans Pro';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url(${regularFontPath}) format('truetype');
  }

  @font-face {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url(${semiBoldFontPath}) format('truetype');
  }

  @font-face {
    font-family: 'Source Sans Pro';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url(${boldFontPath}) format('truetype');
  }

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
