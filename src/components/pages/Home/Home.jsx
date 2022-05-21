import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import UserContext from '../../../contexts/UserContext';
import NewTransactionButton from '../../NewTransactionButton/NewTransactionButton';

import { Container, Main } from './style.js';

const Home = ({ toggleTheme }) => {
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
    const {
        title: themeTitle,
        colors: { secondary },
    } = useContext(ThemeContext);
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
        <Container>
            <header>
                <h1>
                    Olá,{' '}
                    {user.name
                        .split(' ')
                        .map((elem) => elem[0].toUpperCase() + elem.slice(1))
                        .join(' ')}
                </h1>

                <div>
                    {themeTitle === 'light' ? (
                        <MdDarkMode
                            size={25}
                            onClick={() => {
                                toggleTheme();
                            }}
                        />
                    ) : (
                        <MdLightMode
                            size={25}
                            onClick={() => {
                                toggleTheme();
                            }}
                        />
                    )}
                    <RiLogoutBoxRLine
                        className="logout"
                        onClick={() => {
                            logout();
                        }}
                    />
                </div>
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
                        <ThreeDots color={secondary} />
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
        </Container>
    );
};

export default Home;
