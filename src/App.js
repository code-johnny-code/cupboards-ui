import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './components/Items';
import ItemModal from './components//ItemModal';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      showModal: false,
      activeItem: {}
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    this.retrieveItems();
  }

  handleOpenModal (item) {
    this.setState({ showModal: true, activeItem: item });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  retrieveItems() {
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
        <ItemModal handleCloseModal={ this.handleCloseModal } showModal={ this.state.showModal } item={ this.state.activeItem }/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cupboards</h1>
        </header>
        <Items items={ this.state.items } handleOpenModal={ this.handleOpenModal } />
      </div>
    );
  }
}

export default App;
