import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const NewTransactionButton = (props) => {
    const { type } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/newtransaction/${type}`);
    };

    return (
        <ButtonContainer onClick={handleClick}>
            {type === 'entrada' ? (
                <AiOutlinePlusCircle size={25} />
            ) : (
                <AiOutlineMinusCircle size={25} />
            )}
            <h1>{type === 'entrada' ? 'Nova entrada' : 'Nova saída'}</h1>
        </ButtonContainer>
    );
};

export default NewTransactionButton;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    background-color: #a328d6;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    height: 100%;

    h1 {
        font-size: 17px;
        line-height: 20px;
        width: 40%;
    }
`;
