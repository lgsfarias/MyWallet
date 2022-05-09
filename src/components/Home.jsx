import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import UserContext from '../contexts/UserContext';
import NewTransactionButton from './NewTransactionButton';

const Home = () => {
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    const years = new Array(3)
        .fill(new Date().getFullYear())
        .map((elem, index) => elem - index);

    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [monthFilter, setMonthFilter] = useState(
        months[new Date().getMonth()]
    );
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteTransaction = (id) => {
        const confirmation = window.confirm(
            'Quer mesmo deletar essa transação?'
        );
        if (confirmation) {
            setLoading(true);
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
                    setLoading(false);
                    alert(err.response.data);
                });
        } else {
            return;
        }
    };

    const getTransactions = () => {
        setLoading(true);
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
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                alert(err.response.data);
            });
    };

    const logout = () => {
        setLoading(true);
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
                setLoading(false);
                alert(err.response.data);
            });
    };

    const filter = (transactions) => {
        return transactions.filter((transaction) => {
            const month = parseInt(transaction.date.split('/')[1]);
            const year = parseInt(transaction.date.split('/')[2]);
            const monthIndex = months.findIndex(
                (month) => month === monthFilter
            );

            if (monthIndex === -1) {
                return year === parseInt(yearFilter);
            }
            return (
                month ===
                    months.findIndex((month) => month === monthFilter) + 1 &&
                year === parseInt(yearFilter)
            );
        });
    };

    const totalCalculations = () => {
        let total = 0;
        filter(transactions).forEach((transaction) => {
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
    }, [transactions, monthFilter, yearFilter]);

    return (
        <HomeContainer>
            <header>
                <h1>
                    Olá,{' '}
                    {user.name
                        .split(' ')
                        .map((elem) => elem[0].toUpperCase() + elem.slice(1))
                        .join(' ')}
                </h1>
                <RiLogoutBoxRLine
                    className="logout"
                    onClick={() => {
                        logout();
                    }}
                />
            </header>
            <Main>
                <div className="filters">
                    <select
                        className="month-filter"
                        name="filter"
                        defaultValue={monthFilter}
                        onChange={(e) => {
                            setMonthFilter(e.target.value);
                        }}
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                        <option>Ano completo</option>
                    </select>
                    <select
                        className="year-filter"
                        name="filter"
                        defaultValue={new Date().getFullYear()}
                        onChange={(e) => {
                            setYearFilter(e.target.value);
                        }}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                {loading ? (
                    <h1>
                        <ThreeDots color="#8c11be" />
                    </h1>
                ) : transactions.length > 0 ? (
                    <>
                        <div className="transactions-container">
                            {filter(transactions).length > 0 ? (
                                filter(transactions).map((transaction) => (
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
                                                {transaction.date.slice(0, 5)}
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
                                ))
                            ) : (
                                <p>Não há transações para este período</p>
                            )}
                        </div>
                        <div className="total">
                            <h3 className="balance">SALDO</h3>
                            <h3
                                className={total >= 0 ? 'positive' : 'negative'}
                            >
                                {parseFloat(total).toFixed(2)}
                            </h3>
                        </div>
                    </>
                ) : (
                    <h1>Não há registros de entrada ou saída</h1>
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

const Main = styled.main`
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
