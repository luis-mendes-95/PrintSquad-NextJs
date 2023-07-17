import styled from "styled-components";

export const DivBackgroundModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #808080ba;
  display: flex;
  justify-content: center;
  align-items: center;

  .divModalInfo {
    width: 90vw;
    height: 75%;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 1pt 1pt 5pt black;

    textarea{
      width: 100%;
      height: 75%;
    }

    div{
      width: 100%;
      display: flex;
      justify-content: center;
    }

    button{
      height: 50px;
      width: 60px;
      margin: 0px 20px;
      border: none;
      border-radius: 18px;
      box-shadow: 1pt 1pt 3pt black;

    }

    .buttonCancel{
      background-color: red;
      color: white;
    }

    .buttonSave{
      background-color: green;
      color: white;
    }
  }

  h2{
    padding: 10px;
  }

  .divBackgroundFilter{
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    margin: 20px 0;

    button{
      width: 40%;
      background-color: white;
      font-weight: bold;
      margin: 0;
      height: 40px;
      font-size: 8pt;
    }
  }
`;