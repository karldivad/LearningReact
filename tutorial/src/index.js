import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Game} from './Game/Game.js';

ReactDOM.render(
    <Game
        rows={3}
        cols={3}
    />,
    document.getElementById('root')
);
