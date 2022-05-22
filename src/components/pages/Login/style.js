import styled from 'styled-components';
import Wrapper from '../../../styles/elements/Wrapper/Wrapper';
import H1 from '../../../styles/elements/Title/H1';
import Input from '../../../styles/elements/Input/Input';
import Button from '../../../styles/elements/Button/Button';
import Form from '../../../styles/elements/Form/Form';

export const LoginWrapper = styled(Wrapper)`
    position: relative;
    width: 100vw;
    height: 100vh;
    color: ${(props) => props.theme.colors.textClear};
    background-color: ${(props) => props.theme.colors.primary};

    .theme-icon {
        position: absolute;
        top: 25px;
        right: 25px;
    }

    .link {
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
    }
`;

export { H1, Input, Button, Form };
