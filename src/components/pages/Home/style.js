import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.primary};

    header {
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
    }

    footer {
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
    }
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
    border-radius: 5px;

    h1 {
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        /* color: #868686; */
        color: ${(props) => props.theme.colors.text};
        margin: 0 50px;
        position: absolute;
        top: 50%;
        transform: translatey(-50%);
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
            transition: all 0.3s;
            margin-right: 15px;
        }
    }

    .transactions-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: ${(props) => props.theme.colors.background};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(props) => props.theme.colors.primary};
            border-radius: 10px;
        }
    }

    .transaction {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;
        cursor: pointer;

        .transaction-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            .date {
                font-size: 16px;
                line-height: 19px;
                color: ${(props) => props.theme.colors.text};
                margin-right: 10px;
            }

            .description {
                font-size: 16px;
                line-height: 19px;
                color: ${(props) => props.theme.colors.text};
            }
        }

        .transaction-amount {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            font-size: 16px;
            line-height: 19px;

            .in {
                color: #03ac00;
            }

            .out {
                color: #c70000;
            }

            .delete {
                cursor: pointer;
                opacity: 0.3;
                margin-left: 5px;
                color: ${(props) => props.theme.colors.text};
            }
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
            color: #03ac00;
        }

        .negative {
            color: #c70000;
        }
    }
`;
