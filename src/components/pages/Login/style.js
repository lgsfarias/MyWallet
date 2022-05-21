import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: ${(props) => props.theme.colors.textClear};
    background-color: ${(props) => props.theme.colors.primary};

    .theme-icon {
        position: absolute;
        top: 25px;
        right: 25px;
    }

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        line-height: 50px;
        font-weight: bold;
        margin-bottom: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        padding: 0 24px;

        input {
            width: 100%;
            height: 58px;
            border: none;
            border-radius: 5px;
            padding: 0 16px;
            margin-bottom: 13px;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 46px;
            border: none;
            border-radius: 5px;
            background-color: ${(props) => props.theme.colors.secondary};
            color: ${(props) => props.theme.colors.textClear};
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 36px;

            &:hover,
            &:focus {
                opacity: 0.9;
            }
        }

        .link {
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
        }
    }
`;
export default Container;
