import styled from "styled-components";

export const CardBase = styled.div`
  padding: 10px 20px;
  border-radius: 8px;
  border-width: 2pt;
  border-style: solid;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url("https://res.cloudinary.com/dwadq5lzp/image/upload/v1688187002/wu5zafmk7vnup6eyyrwf.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    width: 100%;
    padding: 5px 10px;
    min-height: 280px;
  }

  .divStatus {
    color: white;
    font-family: Fjalla One;
    text-align: center;
    border-radius: 2px;
    width: 100%;
    border: 2pt solid orange;
    background-image: linear-gradient(orange, black);

    @media (min-width: 768px) {
      height: 50px;
    }

    h3 {
      color: black;
    }

    .pending,
    .waiting,
    .aproved {
      /* color: yellow; */
      /* color: green; */
      color: orangered;
      font-weight: bolder;
      text-shadow: 1pt 1pt 1pt black;
      letter-spacing: 2px;
      font-size: 20pt;

      @media (min-width: 768px) {
        font-size: 12pt;
      }
    }

    .waiting {
      color: cyan;
    }

    .aproved {
      color: green;
    }
  }

  .divProductTitle {
    color: white;
    font-family: Fjalla One;

    h3 {
      color: orange;
      text-shadow: 1pt 1pt 2pt black;
    }

    p {
      font-size: 14pt;
    }
  }

  .divServiceOrderMockup {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .pDescription {
      color: black;
    }

    .h2ServiceOrderTitle {
      text-align: center;
      width: 100%;
      color: orange;
      font-family: Fjalla One;
      letter-spacing: 2px;
      text-shadow: 3pt -3pt 3pt black;
      overflow: hidden; /* Esconde qualquer conteúdo que transborde a área disponível */
      text-overflow: ellipsis;
    }

    .noImage {
      width: 80px;
      height: 80px;
      background-color: orange;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const CardBasePage = styled.div`
  padding: 10px 20px;
  border-radius: 8px;
  border-width: 2pt;
  border-style: solid;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)),
    url("https://res.cloudinary.com/dwadq5lzp/image/upload/v1688187002/wu5zafmk7vnup6eyyrwf.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  /* height: 400px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    width: 100%;
    padding: 5px 10px;
    height: 400px;
  }

  .noImage {
    width: 80px;
    height: 80px;
    background-color: orange;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .divStatus,
  .divMockup {
    color: white;
    width: 100%;
    font-family: Fjalla One;
    text-align: center;
    border-radius: 2px;
    border: 2pt solid orange;
    background-image: linear-gradient(orange, black);

    @media (min-width: 768px) {
      max-height: 100%;
    }

    h3 {
      color: black;
    }

    .pending,
    .waiting,
    .aproved {
      color: orangered;
      font-weight: bolder;
      text-shadow: 1pt 1pt 1pt black;
      letter-spacing: 2px;
      font-size: 18pt;

      @media (min-width: 768px) {
        font-size: 12pt;
      }
    }

    .waiting {
      color: cyan;
    }

    .aproved {
      color: green;
    }
  }

  .divMockup {
    margin: 10px 0 10px 0;
    width: 100%;

    .ButtonSeeMockup,
    .buttonAddInstruction {
      background-color: green;
      color: white;
      border: none;
      padding: 5px;
      margin: 5px 0;
      width: 80%;
      max-height: 100%;
      font-weight: bolder;
      border-radius: 8px;
      text-shadow: 1pt 1pt 3pt black;
      box-shadow: 1pt 1pt 3pt black;
      height: 50px;
    }
  }

  .divProductTitle,
  .divPrintType {
    color: white;
    font-family: Fjalla One;

    h3 {
      color: orange;
      text-shadow: 1pt 1pt 2pt black;
    }

    p {
      font-size: 14pt;
    }
  }

  .divServiceOrderMockup {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    p {
      color: white;
      font-family: Fjalla One;
      text-shadow: 1pt 1pt 5pt black;
    }

    @media (min-width: 768px) {
      /* Additional styles for larger screens */
    }
  }

  h2 {
    text-align: center;
    width: 100%;
    color: orange;
    font-family: Fjalla One;
    letter-spacing: 2px;
    text-shadow: 3pt -3pt 3pt black;
    overflow: hidden; /* Esconde qualquer conteúdo que transborde a área disponível */
    text-overflow: ellipsis;
  }
`;

export const DashServiceOrder = styled.div`
  padding: 10px 20px;
  border-radius: 8px;
  border-width: 2pt;
  border-style: solid;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
  background-color: white;
  min-width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  .buttonAddInstruction {
    background-color: green;
    color: white;
    border: none;
    padding: 5px;
    margin: 5px 0;
    width: 80%;
    max-height: 100%;
    font-weight: bolder;
    border-radius: 8px;
    text-shadow: 1pt 1pt 3pt black;
    box-shadow: 1pt 1pt 3pt black;
    height: 50px;
  }
  

  @media (min-width: 768px) {
    min-width: 45%;
    padding: 5px 10px;
    height: 400px;
  }

  .noImage {
    width: 80px;
    height: 80px;
    background-color: orange;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .divStatus {
    color: white;
    font-family: Fjalla One;
    text-align: center;
    border-radius: 2px;
    width: 100%;
    border: 2pt solid orange;
    background-image: linear-gradient(orange, black);

    @media (min-width: 768px) {
      height: 50px;
    }

    h3 {
      color: black;
    }

    .pending,
    .waiting,
    .aproved {
      color: orangered;
      font-weight: bolder;
      text-shadow: 1pt 1pt 1pt black;
      letter-spacing: 2px;
      font-size: 20pt;

      @media (min-width: 768px) {
        font-size: 12pt;
      }
    }

    .waiting {
      color: cyan;
    }

    .aproved {
      color: green;
    }
  }

  .divProductTitle {
    color: white;
    font-family: Fjalla One;

    h3 {
      color: orange;
      text-shadow: 1pt 1pt 1pt black;
    }

    p {
      font-size: 14pt;
    }
  }

  .divServiceOrderInstructions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    margin-top: 10px;
    padding: 15px 10px;
    max-height: 500px;
    border: none;
    border-radius: 8px;
    box-shadow: 1pt 1pt 5pt black;
    justify-content: flex-start;
    align-items: space-around;
    overflow-y: scroll;

    p {
      color: white;
      font-family: Fjalla One;
      text-shadow: 1pt 1pt 1pt black;
    }

    .pDescription {
      color: black;
      text-shadow: none;
      background-color: lightblue;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 1pt 1pt 1pt black;
    }

    @media (min-width: 768px) {
      /* Additional styles for larger screens */
    }
  }

  h2 {
    text-align: center;
    width: 100%;
    color: orange;
    font-family: Fjalla One;
    letter-spacing: 2px;
    text-shadow: 1pt 1pt 1pt black;
    overflow: hidden; /* Esconde qualquer conteúdo que transborde a área disponível */
    text-overflow: ellipsis;
  }
`;

export const DashServiceOrderFiles = styled.div`
  padding: 10px 20px;
  border-radius: 8px;
  border-width: 2pt;
  border-style: solid;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
  background-color: white;
  min-width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
  text-align: center;

      h2{
      font-size: 30pt;
    }

  @media (min-width: 768px) {
    min-width: 25%;
    padding: 5px 10px;
    height: 400px;
  }

  .buttonAddFile {
    background-color: green;
    color: white;
    border: none;
    padding: 5px;
    margin: 5px 0;
    width: 80%;
    max-height: 100%;
    font-weight: bolder;
    border-radius: 8px;
    text-shadow: 1pt 1pt 1pt black;
    box-shadow: 1pt 1pt 3pt black;
    height: 50px;
    font-size: 20pt;
  }

  .noImage {
    width: 80px;
    height: 80px;
    background-color: orange;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .divStatus {
    color: white;
    font-family: Fjalla One;
    text-align: center;
    border-radius: 2px;

    border: 2pt solid orange;
    background-image: linear-gradient(orange, black);

    @media (min-width: 768px) {
      height: 50px;
    }


    h3 {
      color: black;
    }

    .pending,
    .waiting,
    .aproved {
      color: orangered;
      font-weight: bolder;
      text-shadow: 1pt 1pt 1pt black;
      letter-spacing: 2px;
      font-size: 20pt;

      @media (min-width: 768px) {
        font-size: 12pt;
      }
    }

    .waiting {
      color: cyan;
    }

    .aproved {
      color: green;
    }
  }

  .divProductTitle {
    color: white;
    font-family: Fjalla One;

    h3 {
      color: orange;
      text-shadow: 1pt 1pt 2pt black;
    }

    p {
      font-size: 14pt;
    }
  }

  .divServiceOrderInstructions {
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
    max-height: 250px;
    padding: 15px 10px;
    flex-wrap: wrap;
    border: none;
    border-radius: 8px;
    box-shadow: 1pt 1pt 5pt black;
    justify-content: space-around;
    align-items: space-between;
    overflow-y: scroll;

    p {
      color: white;
      font-family: Fjalla One;
      text-shadow: 1pt 1pt 1pt black;
    }

    .pDescription {
      color: black;
      text-shadow: none;
      background-color: lightblue;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 1pt 1pt 1pt black;
    }

    @media (min-width: 768px) {
      /* Additional styles for larger screens */
    }
  }

  h2 {
    text-align: center;
    width: 100%;
    color: orange;
    font-family: Fjalla One;
    letter-spacing: 2px;
    text-shadow: 1pt 1pt 1pt black;
    overflow: hidden; /* Esconde qualquer conteúdo que transborde a área disponível */
    text-overflow: ellipsis;
  }
`;
