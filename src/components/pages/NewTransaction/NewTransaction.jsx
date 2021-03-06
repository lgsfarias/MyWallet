import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { ImCancelCircle } from 'react-icons/im';

import UserContext from '../../../contexts/UserContext';
import * as S from '../EditTransaction/style';

import api from '../../../services/api';

const NewTransaction = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const { type } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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

        try {
            await api.post('transactions', data, config);
            navigate('/home');
        } catch (err) {
            setLoading(false);
            alert(err.response.data);
        }
    };

    return (
        <S.EditWrapper>
            <S.EditHeader>
                <h1>Nova {type}</h1>
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
                    {loading ? <ThreeDots color="#fff" /> : `Salvar ${type}`}
                </S.Button>
            </S.EditForm>
        </S.EditWrapper>
    );
};

export default NewTransaction;
