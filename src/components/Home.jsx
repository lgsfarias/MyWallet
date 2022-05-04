import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import UserContext from '../contexts/UserContext';
import NewTransactionButton from './NewTransactionButton';

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <HomeContainer>
            <header>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine
                    className="logout"
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/');
                    }}
                />
            </header>
            <Main>
                <h1>Não há registros de entrada ou saída</h1>
            </Main>
            <footer>
                <NewTransactionButton className="btn" type="entrada" />
                <NewTransactionButton className="btn" type="saída" />
            </footer>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 25px;
    width: 100vw;
    height: 100vh;
    background-color: #8c11be;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;

        h1 {
            font-size: 26px;
            line-height: 31px;
            font-weight: bold;
            color: #fff;
        }

        .logout {
            cursor: pointer;
            color: #fff;
            font-size: 25px;
        }
    }

    footer {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        align-items: center;
        padding: 15px 25px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
    }
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% - 50px);
    position: fixed;
    top: 80px;
    bottom: 150px;
    background-color: #fff;
    border-radius: 5px;

    h1 {
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        margin: 0 50px;
    }
`;
