import React from 'react';
import { useParams } from 'react-router-dom';

const NewTransaction = () => {
    const { type } = useParams();
    return (
        <>
            <h1>NewTransaction</h1>
            <h2>{type}</h2>
        </>
    );
};

export default NewTransaction;
