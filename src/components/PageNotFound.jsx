import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <PageNotFoundContainer>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <button
                onClick={() => {
                    navigate('/');
                }}
            >
                Voltar para o início
            </button>
        </PageNotFoundContainer>
    );
};

export default PageNotFound;

const PageNotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #8c11be;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 130px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }

    h2 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 24px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 24px;
    }

    button {
        width: 260px;
        height: 58px;
        border: none;
        border-radius: 5px;
        background-color: #a328d6;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
`;
