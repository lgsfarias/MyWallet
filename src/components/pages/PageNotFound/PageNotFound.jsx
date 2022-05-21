import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Container from './style';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <button
                onClick={() => {
                    navigate('/');
                }}
            >
                Voltar para o início
            </button>
        </Container>
    );
};

export default PageNotFound;
