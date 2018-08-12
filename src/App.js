import React, { Component } from 'react';
import ReactModal from 'react-modal';
import logo from './logo.svg';
import './App.css';
import Items from './components/Items';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    this.retrieveItems();
  }

  handleOpenModal () {
    this.setState({ showModal: true });
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
        <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cupboards</h1>
        </header>
        <Items items={ this.state.items } openModal={ this.handleOpenModal } />
      </div>
    );
  }
}

export default App;
