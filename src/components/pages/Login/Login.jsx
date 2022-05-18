import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import UserContext from '../../../contexts/UserContext';

import Container from './style';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post('https://mywallet-project-api.herokuapp.com/login', {
                email,
                password,
            })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(res.data);
                navigate('/home');
            })
            .catch((err) => {
                alert(err.response.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
            navigate('/home');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <h1>MyWallet</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <button type="submit">
                    {loading ? <ThreeDots color="#fff" /> : 'Entrar'}
                </button>
                <h2 className="link" onClick={() => navigate('/signup')}>
                    Primeira vez? Cadastre-se!
                </h2>
            </form>
        </Container>
    );
};

export default Login;
