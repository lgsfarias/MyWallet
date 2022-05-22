import styled from 'styled-components';
import Header from '../../../styles/components/Header/Header';
import Form from '../../../styles/elements/Form/Form';
import Input from '../../../styles/elements/Input/Input';
import Button from '../../../styles/elements/Button/Button';

export const EditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    padding-top: 80px;
    background-color: ${(props) => props.theme.colors.primary};
`;

export const EditHeader = styled(Header)`
    .cancel {
        cursor: pointer;
        font-size: 23px;
    }
`;

export const EditForm = styled(Form)`
    max-width: none;
`;

export { Input, Button };
