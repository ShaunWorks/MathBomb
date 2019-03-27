import React from 'react';
import image from '../images/bomb.png'
import './Bomb.css';

export const Bomb = props => (
    <div className="bomb">
        <img src={image} alt="bomb" />
    </div>
)