import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button{
        cursor: pointer;
        transition: 0.3s;

        &:hover{
            transition: 0.3s;
            transform: scale(1.05);
        }
    }
`;