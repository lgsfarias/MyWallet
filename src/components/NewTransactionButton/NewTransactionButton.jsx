import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import Container from './style';

const NewTransactionButton = (props) => {
    const { type } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/newtransaction/${type}`);
    };

    return (
        <Container onClick={handleClick}>
            {type === 'entrada' ? (
                <AiOutlinePlusCircle size={25} />
            ) : (
                <AiOutlineMinusCircle size={25} />
            )}
            <h1>{type === 'entrada' ? 'Nova entrada' : 'Nova saída'}</h1>
        </Container>
    );
};

export default NewTransactionButton;
