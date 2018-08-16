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
      showCreationModal: false,
      activeItem: {}
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);    
  }

  componentWillMount() {
    this.retrieveItems();
  }

  handleOpenModal (action, item) {
    if (item) { this.setState({ activeItem: item }) };
    this.setState({ showModal: true});
  }

  handleCloseModal () {
    this.setState({ showModal: false });
    this.retrieveItems();
  }

  retrieveItems() {
    const { REACT_APP_LIST_URL } = process.env;
    const fetch = require('node-fetch');
    fetch(REACT_APP_LIST_URL)
    .then(res => res.json())
    .then(res => this.setState({ items: res }))
  }

  render() {
    return (
      <div className="App">
        <ItemModal handleCloseModal={ this.handleCloseModal } showModal={ this.state.showModal } />
        <header className="App-header">
          <button onClick={ () => this.handleOpenModal('add') }>Add</button>
          <img src={logo} className="App-logo" alt="logo" />
          <button>Use</button>
          <h1 className="App-title">Welcome to Cupboards</h1>
        </header>
        <Items items={ this.state.items } handleOpenModal={ this.handleOpenModal } />
      </div>
    );
  }
}

export default App;
