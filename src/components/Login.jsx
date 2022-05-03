import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/login', { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <LoginContainer>
            <h1>MyWallet</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
                <h2 className="link" onClick={() => navigate('/signup')}>
                    Primeira vez? Cadastre-se!
                </h2>
            </form>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #8c11be;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        line-height: 50px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        padding: 0 24px;

        input {
            width: 100%;
            height: 58px;
            border: none;
            border-radius: 5px;
            padding: 0 16px;
            margin-bottom: 13px;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }

        button {
            width: 100%;
            height: 46px;
            border: none;
            border-radius: 5px;
            background-color: #a328d6;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 36px;

            &:hover,
            &:focus {
                opacity: 0.9;
            }
        }

        .link {
            font-size: 15px;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
        }
    }
`;
