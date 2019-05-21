import React, { Component } from "react";
import "./App.css";
import { AppBar } from "./components/AppBar"
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import { BackButton } from "./components/BackButton";
import { Bomb } from "./components/Bomb"
import * as math from "mathjs";

export class App extends Component {
  constructor(props) {
    super(props);

    this.operators = ['+', '-', '*', '/'];
    this.state = {
      input: '',
      bombs: [null, null, null],
      id: 0,
      score: 0,
      lives: 3
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
    setInterval(() => {
      this.createBomb()
    }, 5000);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey = e => {
    if (e.key === '.' || !isNaN(e.key) || this.isOperator(e.key))
      this.addToInput(e.key);
    else if (e.key === 'Enter' || e.key === '=')
      this.parseExpression();
    else if (e.key === 'c')
      this.clearInput();
    else if (e.key === 'Backspace')
      this.removeLastInput();
  }

  createBomb = () => {
    let b = this.state.bombs;
    for (let i = 0; i < b.length; i++) {
      if (!b[i]) {
        b[i] = {
          key: this.state.id,
          position: i,
          timer: 5 + Math.floor(Math.random() * 5),
          value: Math.floor(Math.random() * 10)
        }
        this.setState({ bombs: b })
        return;
      }
    }
  }

  removeBomb = index => {
    const arr = this.state.bombs;
    arr[index] = null;
    this.setState({ bombs: arr })
  }

  isOperator = val => this.operators.some(operator => val.includes(operator));

  clearInput = () => this.setState({ input: "" })
  removeLastInput = () => this.setState({ input: this.state.input.substring(0, this.state.input.length - 1) })

  // Adds the selected button's value to the input.
  // Stops operators and decimal points from being added if
  // the input is empty or the last input is not a number.
  addToInput = val => {
    const input = this.state.input;
    if ((input !== "" && !isNaN((input).slice(-1))) || !isNaN(val))
      this.setState({ input: this.state.input + val });
  };

  // evaluate the input return the result
  handleEqual = val => {
    const roundedVal = Math.round((math.eval(val) + 0.00001) * 100) / 100
    const arr = this.state.bombs.filter(element => element !== null);
    arr.filter(element => element.value === roundedVal)
      .map(element => this.handleScore(element.position))
    return String(roundedVal)
  };

  handleScore = position => {
    this.removeBomb(position);
    this.setState(prevState => ({score: prevState.score + 100}))
  }

  chain = 1;
  // returns if the input includes an operator and that it ends with a number
  checkEval = () => {
    const input = this.state.input;
    if (this.isOperator(input))
      if (!isNaN(input.slice(-1)))
        return true;
      else console.log("error: doesnt end with number");
    else console.log("error: needs to include an operator");

    return false;
  };

  parseExpression = () => {
    const input = this.state.input;
    let ops = 0;
    if (this.checkEval()) {
      // loops through each char in input and check if its an operator
      // loop starts at 1 to avoid intrepeting a negative sign as a minus operator
      for (let i = 1; i < input.length; i++) {
        if (this.isOperator(input.charAt(i)))
          ops++;
        if (ops === 2) {
          let result = this.handleEqual(input.slice(0, i));
          this.setState({ input: result + input.slice(i) });
          return setTimeout(() => this.parseExpression(), 1000)
        }
      }
      return this.setState({ input: this.handleEqual(input) });
    }
    return console.log("not valid to parse")
  }

  render() {
    return (
      <div className="app">
        <AppBar score={this.state.score} lives={this.state.lives} />
        <div className="game">
          <div className="bomb-wrapper">
            {this.state.bombs.map(bomb => {
              return (
                <div style={{ paddingLeft: 34, width: 50 }}>
                  {bomb ? <Bomb position={bomb.position} timer={bomb.timer} value={bomb.value} handleRemove={this.removeBomb} /> : null}
                </div>
              )
            })}
          </div>
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
              <Button handleClick={this.parseExpression}>=</Button>
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
      </div>
    );
  }
}


export default App;
