import React from 'react';
import './BackButton.css';

export const BackButton = props => (
    <div className="back-btn" onClick={props.handleBack}>
        {props.children}
    </div>
)