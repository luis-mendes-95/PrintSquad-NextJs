import styled from "styled-components";

export const FooterBase = styled.footer`
  background-color: black;
  background-image: url("https://res.cloudinary.com/dwadq5lzp/image/upload/v1688187002/wu5zafmk7vnup6eyyrwf.jpg");
  background-size: cover;
  background-position: center;
  color: orange;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  padding: 2px 0;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  font-weight: 100;
  font-size: 7pt;
  text-align: center;
  bottom: 0;
  width: 100vw;
  height: 90px;
  position: fixed;
  border-top: 2pt solid black;
  border-bottom: 2pt solid black;
  box-shadow: 1pt 1pt 5pt black;

  @media (min-width: 600px) {
    justify-content: flex-start;
    gap: 50px;
    padding: 0 0 0 10px;
  }

  .ButtonAddOrder,
  .ButtonFilter,
  .ButtonLogout {
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 75%;
    background-color: green;
    color: white;
    font-weight: bold;
    font-size: 15pt;
    text-shadow: 1pt 1pt 1pt black;
    box-shadow: 1p 1pt 4pt black;
    cursor: pointer;
    transition: 0.3s;

    &:hover{
        transform: scale(1.1);
        transition: 0.3s;       
    }
  }

  .ButtonFilter {
    font-size: 12pt;
    background-color: orange;
  }

  .ButtonLogout{
    background-color: red;
    color: white;
    text-shadow: 1pt 1pt 1pt black;
    font-size: 10pt;
    width: 55px;
    height: 25px;
    border-radius: 15%;
    box-shadow: 1pt 1pt 2pt black;
  }
`;
