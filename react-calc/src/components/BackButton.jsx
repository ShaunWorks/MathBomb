import React from 'react';
import './BackButton.css';

export const BackButton = props => (
    <div className="back-btn" onClick={props.removeLastInput}>
        {props.children}
    </div>
)