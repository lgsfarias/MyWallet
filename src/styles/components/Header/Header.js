import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    color: ${(props) => props.theme.colors.textClear};

    h1 {
        font-size: 26px;
        line-height: 31px;
        font-weight: bold;
    }
`;

export default Header;
