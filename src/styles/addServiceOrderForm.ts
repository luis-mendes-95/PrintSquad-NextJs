import styled from "styled-components"

export const CreateServiceOrderFormBase = styled.div`

    width: 90%;

    form{
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 100%;
        padding: 10px;
        border-radius: 8px;

        select{
            overflow: scroll;
        }
    }

`;