import styled from "styled-components"

export const LoginPageBase = styled.div`

font-family: Fjalla One;

    main{
        height: 100vh;
        background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        form{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            gap: 10px;
            background-color: white;
            width: 100%;
            height: 350px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-radius: 8px;
            box-shadow: 1pt 1pt 3pt black;

            label{
                font-weight: bolder;
                font-size: 20pt;
            }

            input{
                height: 50px;
            }

            button{
                height: 40px;
                width: 100%;
                border: none;
                background-color: orange;
                font-weight: bold;
                color: white;
                font-size: 15pt;
                border-radius: 8px;
                box-shadow: 1pt 1pt 2pt black;
                text-shadow: 1pt 1pt 2pt black;

            }

        }
    }
`;