import React, { Component } from 'react';
import './App.css';
import { Button } from './components/Button'
import { Input } from './components/Input'
import { ClearButton } from './components/ClearButton'
import { BackButton } from './components/BackButton'
import * as math from 'mathjs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      evaluation: {
        containsOperator: false,
        endsWithNumber: false
      }
    }
  }

  addToInput = val => {
    const input = this.state.input;
    if((input !== '' && !isNaN(input.slice(-1))) || !isNaN(val))
    this.setState({ input: this.state.input + val });
  }

  handleEqual = () => {
    //if(this.checkEval())
    this.setState({ input: math.eval(this.state.input) });
  }

  checkEval = () => {
    const input = this.state.input;

    if (input.includes('+'))
      this.setState(prevState => ({
        evaluation: {
          ...prevState.evaluation,
          containsOperator: true
        }
      }), () => {
        if (!isNaN(input.slice(-1)))
          this.setState(prevState => ({
            evaluation: {
              ...prevState.evaluation, endsWithNumber: true
            }
          }),
            this.handleEqual());
        else
          console.log('error: doesnt end with number');
      });
    else
      console.log('error: needs to include an operator')
  }

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input}></Input>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.checkEval()}>=</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: '' })}>Clear</ClearButton>
            <BackButton removeLastInput={() => this.setState({ input: this.state.input.substring(0, this.state.input.length - 1) })}>←</BackButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
