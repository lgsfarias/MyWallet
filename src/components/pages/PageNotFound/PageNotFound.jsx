import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './style';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <S.NotFoundWrapper>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <S.NotFoundButton
                onClick={() => {
                    navigate('/');
                }}
            >
                Voltar para o início
            </S.NotFoundButton>
        </S.NotFoundWrapper>
    );
};

export default PageNotFound;
