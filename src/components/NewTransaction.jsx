import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ImCancelCircle } from 'react-icons/im';

import UserContext from '../contexts/UserContext';

const NewTransaction = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const { type } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const URI = 'https://mywallet-project-api.herokuapp.com/transactions';

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const data = {
            amount,
            description,
            type: type === 'entrada' ? 'in' : 'out',
        };

        axios
            .post(URI, data, config)
            .then((res) => {
                navigate('/home');
            })
            .catch((err) => {
                setLoading(false);
                alert(err.response.data);
            });
    };

    return (
        <NewTransactionContainer>
            <header>
                <h1>Nova {type}</h1>
                <ImCancelCircle
                    className="cancel"
                    onClick={() => navigate('/home')}
                />
            </header>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
                <button type="submit">
                    {loading ? <ThreeDots color="#fff" /> : `Salvar ${type}`}
                </button>
            </form>
        </NewTransactionContainer>
    );
};

export default NewTransaction;

const NewTransactionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    padding: 0 25px;
    background-color: #8c11be;

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        margin-bottom: 15px;

        h1 {
            font-weight: bold;
            font-size: 26px;
            line-height: 31px;
            color: #ffffff;
        }

        .cancel {
            cursor: pointer;
            color: #ffffff;
            font-size: 23px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        input {
            width: 100%;
            margin-bottom: 13px;
            height: 58px;
            border: none;
            border-radius: 5px;
            padding: 0 16px;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 58px;
            border: none;
            border-radius: 5px;
            background-color: #a328d6;
            font-size: 20px;
            line-height: 23px;
            color: #ffffff;
            font-weight: bold;
            cursor: pointer;
        }
    }
`;
