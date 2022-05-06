import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import UserContext from '../contexts/UserContext';
import NewTransactionButton from './NewTransactionButton';

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteTransaction = (id) => {
        const confirmation = window.confirm(
            'Quer mesmo deletar essa transação?'
        );
        if (confirmation) {
            const URI = `https://mywallet-project-api.herokuapp.com/transactions/${id}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            axios
                .delete(URI, config)
                .then(() => {
                    getTransactions();
                })
                .catch((err) => {
                    alert(err.response.data);
                });
        } else {
            return;
        }
    };

    const getTransactions = () => {
        const URI = 'https://mywallet-project-api.herokuapp.com/transactions';

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        axios
            .get(URI, config)
            .then((res) => {
                setTransactions(res.data);
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };

    const logout = () => {
        const token = user.token;
        const URI = 'https://mywallet-project-api.herokuapp.com/logout';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(URI, {}, config)
            .then((res) => {
                localStorage.removeItem('user');
                navigate('/');
            })
            .catch((err) => {
                alert(err.response.data);
            });
    };

    const totalCalculations = () => {
        let total = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'in') {
                total += transaction.amount;
            } else {
                total -= transaction.amount;
            }
        });
        return total;
    };

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTotal(totalCalculations());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    return (
        <HomeContainer>
            <header>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine
                    className="logout"
                    onClick={() => {
                        logout();
                    }}
                />
            </header>
            <Main>
                {transactions ? (
                    transactions.length > 0 ? (
                        <>
                            <div className="transactions-container">
                                {transactions.map((transaction) => (
                                    <div
                                        className="transaction"
                                        key={transaction._id}
                                        onClick={() => {
                                            navigate(
                                                `/edit/${transaction._id}`,
                                                {
                                                    state: {
                                                        amount: transaction.amount,
                                                        description:
                                                            transaction.description,
                                                        type: transaction.type,
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        <div className="transaction-info">
                                            <h3 className="date">
                                                {transaction.date}
                                            </h3>
                                            <h3 className="description">
                                                {transaction.description}
                                            </h3>
                                        </div>
                                        <div className="transaction-amount">
                                            <h3
                                                className={
                                                    transaction.type === 'in'
                                                        ? 'in'
                                                        : 'out'
                                                }
                                            >
                                                {parseFloat(
                                                    transaction.amount
                                                ).toFixed(2)}
                                            </h3>
                                            <p
                                                className="delete"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteTransaction(
                                                        transaction._id
                                                    );
                                                }}
                                            >
                                                x
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="total">
                                <h3 className="balance">SALDO</h3>
                                <h3
                                    className={
                                        total >= 0 ? 'positive' : 'negative'
                                    }
                                >
                                    {parseFloat(total).toFixed(2)}
                                </h3>
                            </div>
                        </>
                    ) : (
                        <h1>Não há registros de entrada ou saída</h1>
                    )
                ) : (
                    <h1>Carregando...</h1>
                )}
            </Main>
            <footer>
                <NewTransactionButton className="btn" type="entrada" />
                <NewTransactionButton className="btn" type="saída" />
            </footer>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
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
        }

        .logout {
            cursor: pointer;
            color: #fff;
            font-size: 25px;
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

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: calc(100% - 50px);
    position: fixed;
    top: 80px;
    bottom: 150px;
    padding: 25px 15px 50px 15px;
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
