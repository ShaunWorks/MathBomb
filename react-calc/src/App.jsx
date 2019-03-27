import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import { BackButton } from "./components/BackButton";
import * as math from "mathjs";

export class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey = e => {
    if (e.key === '.' || !isNaN(e.key) || this.operators.some(operator => e.key.includes(operator)))
      this.addToInput(e.key);
    else if (e.key === 'Enter' || e.key === '=')
      this.handleEqual();
    else if (e.key === 'c')
      this.clearInput();
  }

  constructor(props) {
    super(props);

    this.operators = ['+', '-', '*', '/'];
    this.state = {
      input: ''
    };
  }

  clearInput = () => this.setState({ input: "" })
  removeLastInput = () => this.setState({input: this.state.input.substring(0,this.state.input.length - 1)})

  /**
   * Adds the selected button's value to the input.
   * Stops operators and decimal points from being added if
   * the input is empty or the last input is not a number.
   */
  addToInput = val => {
    const input = this.state.input;
    if ((input !== "" && !isNaN((input).slice(-1))) || !isNaN(val))
      this.setState({ input: this.state.input + val });
  };

  // if checkEval() returns true, evaluate the input and set the input state.
  handleEqual = () => {
    if (this.checkEval()) 
      this.setState({ input: String(Math.round((math.eval(this.state.input) + 0.00001) * 100) / 100) });
  };

  // returns if the input includes an operator and that it ends with a number
  checkEval = () => {
    const input = this.state.input;
    if (this.operators.some(operator => input.includes(operator)))
      if (!isNaN(input.slice(-1))) 
        return true;
      else console.log("error: doesnt end with number");
    else console.log("error: needs to include an operator");

    return false;
  };

  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} />
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
            <Button handleClick={this.handleEqual}>=</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={this.clearInput}>
              Clear
            </ClearButton>
            <BackButton handleBack={this.removeLastInput}>
              ←
            </BackButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
