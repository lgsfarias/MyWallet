import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    width: 100vw;
    height: 100vh;
    background-color: #8c11be;

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

        h1 {
            font-size: 26px;
            line-height: 31px;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .logout {
            cursor: pointer;
            color: #fff;
            font-size: 25px;

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
    background-color: #fff;
    border-radius: 5px;

    h1 {
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
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
            background-color: #8c11be;
            color: #fff;
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
            background: #f1f1f1;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #8c11be;
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
                color: #c6c6c6;
                margin-right: 10px;
            }

            .description {
                font-size: 16px;
                line-height: 19px;
                color: #000000;
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
            color: #000000;
        }

        .positive {
            color: #03ac00;
        }

        .negative {
            color: #c70000;
        }
    }
`;
