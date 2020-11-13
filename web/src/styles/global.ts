import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #DEDCDC ;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
