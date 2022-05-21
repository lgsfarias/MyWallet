import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { ThemeContext } from 'styled-components';

import Container from './style';

const SignUp = ({ toggleTheme }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { title: themeTitle } = useContext(ThemeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post('https://mywallet-project-api.herokuapp.com/signup', {
                name,
                email,
                password,
                confirmPassword,
            })
            .then((res) => {
                alert('Usuário criado com sucesso!');
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                alert(err.response.data);
            });
    };

    return (
        <Container>
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
            <h1>MyWallet</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
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
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                />
                <button type="submit">
                    {loading ? <ThreeDots color="#fff" /> : 'Cadastrar'}
                </button>
                <h2 className="link" onClick={() => navigate('/')}>
                    Já tem uma conta? Entre agora!
                </h2>
            </form>
        </Container>
    );
};

export default SignUp;
