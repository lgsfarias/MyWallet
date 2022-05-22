import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './style';

const TransactionsContainer = ({ transactions, filter, deleteTransaction }) => {
    const navigate = useNavigate();

    return (
        <S.TransactionsWrapper>
            {filter(transactions).length > 0 ? (
                filter(transactions).map((transaction) => (
                    <S.Transaction
                        key={transaction._id}
                        onClick={() => {
                            navigate(`/edit/${transaction._id}`, {
                                state: {
                                    amount: transaction.amount,
                                    description: transaction.description,
                                    type: transaction.type,
                                },
                            });
                        }}
                    >
                        <div className="transaction-info">
                            <h3 className="date">
                                {transaction.date.slice(0, 5)}
                            </h3>
                            <h3 className="description">
                                {transaction.description}
                            </h3>
                        </div>
                        <div className="transaction-amount">
                            <h3
                                className={
                                    transaction.type === 'in' ? 'in' : 'out'
                                }
                            >
                                {parseFloat(transaction.amount).toFixed(2)}
                            </h3>
                            <p
                                className="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTransaction(transaction._id);
                                }}
                            >
                                x
                            </p>
                        </div>
                    </S.Transaction>
                ))
            ) : (
                <p>Não há transações para este período</p>
            )}
        </S.TransactionsWrapper>
    );
};

export default TransactionsContainer;
