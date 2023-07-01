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
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    width: 100%;
    padding: 5px 10px;
    height: 280px;
  }

  .noImage{
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

    .pending, .waiting, .aproved {
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

    .waiting{
      color: cyan;
    }

    .aproved{
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

    @media (min-width: 768px) {
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
