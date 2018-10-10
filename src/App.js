import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    console.log("render called");

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 onClick={this.incrementCounter} className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
