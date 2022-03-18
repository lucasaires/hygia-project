import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
      --white: #fff;

      --gray-100: #e1e1e6;
      --gray-500: #666;

      --gray-850: #1f2729;

      --yellow-500: #eba417;
  }

  body {
      background: var(--gray-100);
  }

  button{
      cursor: pointer;
  }

  a{
      color: inherit;
      text-decoration: none;
  }

  
`;

export default GlobalStyle;
