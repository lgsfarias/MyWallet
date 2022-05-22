import styled from 'styled-components';

const Button = styled.button`
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
`;

export default Button;
