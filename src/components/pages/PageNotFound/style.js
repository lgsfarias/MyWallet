import styled from 'styled-components';
import Wrapper from '../../../styles/elements/Wrapper/Wrapper';
import Button from '../../../styles/elements/Button/Button';

export const NotFoundWrapper = styled(Wrapper)`
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
`;

export const NotFoundButton = styled(Button)`
    width: 260px;
`;
