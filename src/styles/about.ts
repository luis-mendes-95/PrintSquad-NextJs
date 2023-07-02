import styled from "styled-components";

export const DivAboutBase = styled.div`
  .h1AboutTitle {
    font-family: Righteous;
    color: greenyellow;
    text-shadow: 1pt 1pt 2pt black;
    text-align: center;
    margin: 0 0 20px 0;
  }
  main {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-weight: 500;
      text-align: justify;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
`;
