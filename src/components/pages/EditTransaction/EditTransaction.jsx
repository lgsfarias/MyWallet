import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ImCancelCircle } from 'react-icons/im';

import UserContext from '../../../contexts/UserContext';
import * as S from './style';

const NewTransaction = () => {
    const { state } = useLocation();
    const [amount, setAmount] = useState(state.amount);
    const [description, setDescription] = useState(state.description);
    // eslint-disable-next-line
    const [type, setType] = useState(state.type);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const URI = `https://mywallet-project-api.herokuapp.com/transactions/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const data = {
            amount,
            description,
            type,
        };

        axios
            .put(URI, data, config)
            .then((res) => {
                navigate('/home');
            })
            .catch((err) => {
                setLoading(false);
                alert(err.response.data);
            });
    };

    return (
        <S.EditWrapper>
            <S.EditHeader>
                <h1>Editar {type === 'in' ? 'entrada' : 'saída'}</h1>
                <ImCancelCircle
                    className="cancel"
                    onClick={() => navigate('/home')}
                />
            </S.EditHeader>
            <S.EditForm onSubmit={handleSubmit}>
                <S.Input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={loading}
                />
                <S.Input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />
                <S.Button type="submit">
                    {loading ? (
                        <ThreeDots color="#fff" />
                    ) : (
                        `Atualizar ${type === 'in' ? 'entrada' : 'saída'}`
                    )}
                </S.Button>
            </S.EditForm>
        </S.EditWrapper>
    );
};

export default NewTransaction;
