import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ImCancelCircle } from 'react-icons/im';

import UserContext from '../../../contexts/UserContext';
import Container from './style';

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
        <Container>
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
        </Container>
    );
};

export default NewTransaction;
