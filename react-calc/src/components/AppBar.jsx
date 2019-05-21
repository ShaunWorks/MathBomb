import React from 'react'
import './AppBar.css'

export function AppBar(props) {
    return (
        <div className="appbar">
            <div className="score">Score: {props.score}</div>
            <div className="lives">Lives: {props.lives}</div>
        </div>
    )
}