import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.primary};

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 130px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }

    h2 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 24px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }

    button {
        width: 260px;
        height: 58px;
        border: none;
        border-radius: 5px;
        background-color: ${(props) => props.theme.colors.secondary};
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
`;
export default Container;
