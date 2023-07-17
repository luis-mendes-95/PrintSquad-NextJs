import styled from "styled-components";

export const DivHomeBase = styled.div`

  background-color: darkslategray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;

  main{
    min-height: 100vh;
  }

  .serviceOrderCards{
    padding: 80px 0 80px 0;

    /* @media (min-width: 468px){
      padding: 80px 0 60px 0;
    } */

    /* @media (min-width: 768px){
      padding: 60px 0 70px 0;
    } */

    /* @media (max-width: 270px){
      padding: 5px 0 60px 0;
    } */

  }

  .divNoOrders {
    padding: 50px 0;
    height: 200px;
    width: 200px;
    background-image: url("https://media0.giphy.com/media/3xz2BIISHMnfizp9Pq/giphy.gif?cid=ecf05e47n0zwa0bntunsrcuevshdfk1id92h8wnw31lydfy9&ep=v1_gifs_search&rid=giphy.gif&ct=g");
    background-size: cover;
    justify-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 25pt;
    font-weight: bold;
    font-family: Fjalla One;
    text-shadow: 1pt 1pt 1pt black;
    border-radius: 50%;
    box-shadow: 1pt 1pt 5pt black;
    text-align: center;
    text-overflow: clip;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    align-items: flex-start;


    li {
      margin: 10px;
      box-shadow: 1pt 1pt 5pt black;
      border-radius: 8px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      transition: 0.3s;
      

      &:hover{
        transform: scale(1.01);
        transition: 0.3s;
      }

      /* @media (min-width: 380px) {
        width: 65%;
      } */

      @media (min-width: 550px) {
        width: 45%;
      }

      @media (min-width: 768px) {
        width: 25%;

        h2 {
          font-size: 12pt;
          font-weight: 100;
        }

        img {
          width: 50%;
          height: 50%;
        }
      }
    }

  }

  .headerButtons{
    width: 100%;
    align-items: center;
    justify-content: center;

    li{
      margin: 0;
    }
  }
`;
