import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    background-color: #a328d6;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    height: 100%;

    h1 {
        font-size: 17px;
        line-height: 20px;
        width: 40%;
    }
`;
export default Container;
