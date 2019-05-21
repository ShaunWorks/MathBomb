import React, { Component } from 'react';
import image from '../images/bomb.png'
import './Bomb.css';

export class Bomb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
      value: 0
    }
  }

  timer;

  componentDidMount() {
    this.timer = setInterval(this.decreaseTimer, 1500);
    this.setState({
      timer: this.props.timer,
      value: this.props.value
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if(this.state.timer === 0)
     this.props.handleRemove(this.props.position);
  }

  decreaseTimer = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}));
  }

  render() {
    return (
        <>
          <div className="value">{this.state.value}</div>
          <div className="timer">{Math.round(this.state.timer * 100) / 100}</div>
          <img src={image} alt="bomb" />
        </>
    )
  }
}
