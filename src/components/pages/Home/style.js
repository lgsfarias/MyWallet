import styled from 'styled-components';
import Wrapper from '../../../styles/elements/Wrapper/Wrapper';
import Header from '../../../styles/components/Header/Header';

export const HomeWrapper = styled(Wrapper)`
    padding: 25px;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.primary};
`;

export const HomeHeader = styled(Header)`
    h1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .logout {
        cursor: pointer;
        font-size: 25px;
        margin-left: 10px;

        &-loading {
            font-size: 15px;
        }
    }
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    padding: 15px 25px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: calc(100% - 50px);
    position: fixed;
    top: 80px;
    bottom: 150px;
    padding: 15px 15px 50px 15px;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    border-radius: 5px;

    h1 {
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        margin: 0 50px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .filters {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        select {
            width: 150px;
            height: 30px;
            border: none;
            margin-bottom: 15px;
            border-radius: 5px;
            background-color: ${(props) => props.theme.colors.secondary};
            color: ${(props) => props.theme.colors.textClear};
            font-size: 16px;
            font-weight: bold;
            padding: 0 10px;
            cursor: pointer;
            margin-right: 15px;
        }
    }

    .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 15px;

        .balance {
            font-weight: bold;
            font-size: 17px;
            line-height: 20px;
            color: ${(props) => props.theme.colors.text};
        }

        .positive {
            color: ${(props) => props.theme.colors.green};
        }

        .negative {
            color: ${(props) => props.theme.colors.red};
        }
    }
`;
