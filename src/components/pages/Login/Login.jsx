import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import UserContext from '../../../contexts/UserContext';

import * as S from './style';

const Login = ({ toggleTheme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { title: themeTitle } = useContext(ThemeContext);

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
        <S.LoginWrapper>
            {themeTitle === 'light' ? (
                <MdDarkMode
                    className="theme-icon"
                    size={25}
                    onClick={() => {
                        toggleTheme();
                    }}
                />
            ) : (
                <MdLightMode
                    className="theme-icon"
                    size={25}
                    onClick={() => {
                        toggleTheme();
                    }}
                />
            )}
            <S.H1>MyWallet</S.H1>
            <S.Form onSubmit={handleSubmit}>
                <S.Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <S.Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <S.Button type="submit">
                    {loading ? <ThreeDots color="#fff" /> : 'Entrar'}
                </S.Button>
                <h2 className="link" onClick={() => navigate('/signup')}>
                    Primeira vez? Cadastre-se!
                </h2>
            </S.Form>
        </S.LoginWrapper>
    );
};

export default Login;
