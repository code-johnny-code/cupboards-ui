import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Items from './components/Items';
import ItemModal from './components/ItemModal';
import ShoppingModal from './components/ShoppingModal';
import Login from './components/Login';
const fetch = require('node-fetch');

class App extends Component {


  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      items: [],
      showModal: false,
      showShopping: false,
      showCreationModal: false,
      activeItem: {}
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.handleOpenShopping = this.handleOpenShopping.bind(this);
    this.handleCloseShopping = this.handleCloseShopping.bind(this);
  }

  componentWillMount() {
    this.setState({loggedIn: this.getCookie('loggedIn')})
    this.retrieveItems();
  }

  componentDidUpdate() {
    this.updateShopping();
  }

  getCookie(cookiename) {
    const cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

  handleOpenModal (item) {
    if (item) { this.setState({ activeItem: item }) };
    this.setState({ showModal: true});
  }

  handleCloseModal () {
    this.setState({activeItem: {}})
    this.setState({ showModal: false });
    this.retrieveItems();
  }

  handleOpenShopping () {
    this.setState({ showShopping: true });
  }

  handleCloseShopping () {
    this.setState({ showShopping: false });
    this.retrieveItems();
  }

  retrieveItems() {
    const { REACT_APP_LIST_URL } = process.env;
    fetch(REACT_APP_LIST_URL)
    .then(res => res.json())
    .then(res => this.setState({ items: res }))
  }

  updateShopping() {
    const { REACT_APP_SHOPMOD_URL } = process.env;
    this.state.items.forEach(item => {
      if (!item.onList && item.minimum && (item.quantity < item.minimum)) {
        const difference = Number(item.minimum) - Number(item.quantity);
        const data = { 'item_Id': item._id, 'onList': true, 'toGet': difference }
        fetch(REACT_APP_SHOPMOD_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(() => this.retrieveItems())
      }
    });
  }

  handleLogin() {
    document.cookie = "loggedIn=true"
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <div className="App"> 
        { this.state.loggedIn ? 
        <div>
          { this.state.showModal ? <ItemModal handleCloseModal={ this.handleCloseModal } showModal={ this.state.showModal } activeItem={ this.state.activeItem } /> : null }
          { this.state.showShopping ? <ShoppingModal handleCloseShopping={ this.handleCloseShopping } showModal={ this.state.showShopping } /> : null }
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Cupboards</h1>
            <button className={ 'header-button' } onClick={ this.handleOpenModal }>Add</button>
            <button className={ 'header-button' } onClick={ this.handleOpenShopping }>Shopping List</button>
          </header>
          <div className={ 'items' }>
            <Items items={ this.state.items } handleOpenModal={ this.handleOpenModal } />
          </div>
        </div>
          : <Login handleLogin={ this.handleLogin }/> }
      </div>
    );
  }
}

export default App;
