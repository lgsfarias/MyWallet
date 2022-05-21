import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import * as S from './styles/elements/Base';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <S.Reset />
        <S.Base />
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
