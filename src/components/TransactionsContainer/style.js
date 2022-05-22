import styled from 'styled-components';

export const TransactionsWrapper = styled.div`
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
`;

export const Transaction = styled.div`
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
            color: ${(props) => props.theme.colors.green};
        }

        .out {
            color: ${(props) => props.theme.colors.red};
        }

        .delete {
            cursor: pointer;
            opacity: 0.3;
            margin-left: 5px;
            color: ${(props) => props.theme.colors.text};
        }
    }
`;
