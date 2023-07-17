import styled from "styled-components";
import Image from 'next/image';

export const StyledImage = styled(Image)`
  width: 35%;
  height: 35%;

  @media(min-width: 768px){
    width: 5%;
    height: 5%;
  }

`;

export const HeaderBase = styled.header`
  background-color: black;
  background-image: url("https://res.cloudinary.com/dwadq5lzp/image/upload/v1688187002/wu5zafmk7vnup6eyyrwf.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 2pt solid black;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
  position: fixed;
  z-index: 1;
  width: 100%;
  max-height: 150px;
  
  @media (max-width: 265px) {
    flex-direction: column;
    justify-content: space-around;
  }

  .ulHeaderButtons {
    display: flex;
    list-style: none;
    justify-content: space-around;
    align-items: space-around;
    gap: 5px;
  }

  .navHeaderButtons {
    margin: 0 10px 0 0;

    .liHeaderButtons {
      display: flex;
      width: 50px;
      background-image: url("https://res.cloudinary.com/dwadq5lzp/image/upload/v1688187361/jnddphmhpmztg89naxev.jpg");
      background-size: cover;
      height: 20px;
      color: white;
      text-shadow: 1pt 1pt 1pt black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Righteous;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 1pt 1pt 5pt black;
      transition: 0.3s;
      font-size: 10pt;

      &:hover {
        transform: scale(1.05);
        transition: 0.1s;
      }
    }
  }

  .h1TitleHeader {
    font-size: 15pt;
    font-family: Righteous;
    background: linear-gradient(to right, cyan, magenta, yellow, magenta);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* text-shadow: 0.1pt 0.1pt 5pt black; */
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(1.05);
      transition: 0.3s;
    }
  }
`;
