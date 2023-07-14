import styled from "styled-components";

export const CreateServiceOrderFormBase = styled.div`
  overflow-y: scroll;
  height: 100%;

  h2 {
    margin: 80px 0 0 0;
    color: white;
    text-shadow: 1pt 1pt 1pt black;
    font-family: fjallah system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }

  width: 90%;

  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    font-family: fjallah system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-weight: bolder;
    margin: 0 0 80px 0;

    input,
    select {
      height: 50px;
      padding: 10px;
    }

    textarea {
      height: 300px;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
      font-family: fjallah system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    textarea:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    select {
      overflow: scroll;
    }

    .buttonCreateOrder{
      height: 80px;
      background-color: green;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 16px;
      box-shadow: 1pt 1pt 5pt black;
    }
  }
`;
