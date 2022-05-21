import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    padding: 0 25px;
    background-color: ${(props) => props.theme.colors.primary};

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        margin-bottom: 15px;

        h1 {
            font-weight: bold;
            font-size: 26px;
            line-height: 31px;
            color: #ffffff;
        }

        .cancel {
            cursor: pointer;
            color: #ffffff;
            font-size: 23px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        input {
            width: 100%;
            margin-bottom: 13px;
            height: 58px;
            border: none;
            border-radius: 5px;
            padding: 0 16px;
            font-size: 20px;
            line-height: 23px;
            color: '#000';
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 58px;
            border: none;
            border-radius: 5px;
            background-color: ${(props) => props.theme.colors.secondary};
            font-size: 20px;
            line-height: 23px;
            color: #ffffff;
            font-weight: bold;
            cursor: pointer;
        }
    }
`;
export default Container;
