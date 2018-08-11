import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './components/Items';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this._retrieveItems();
  }

  _retrieveItems() {
    const { REACT_APP_LIST_URL } = process.env;
    const fetch = require('node-fetch');
    fetch(REACT_APP_LIST_URL)
    .then(res => {
      return res.json()
    })
    .then(res =>{
      this.setState({ items: res })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Items items={ this.state.items }/>
      </div>
    );
  }
}

export default App;
