import React, { Component } from 'react';
import ReactModal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

class ShoppingModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }

        this._retrieveItems = this._retrieveItems.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
        this._retrieveItems();
    }

    _retrieveItems() {
        const { REACT_APP_SHOPLIST_URL } = process.env;
        const fetch = require('node-fetch');
        fetch(REACT_APP_SHOPLIST_URL)
        .then(res => res.json())
        .then(res => this.setState({ items: res }))
      }

    render() {
        const listItems = this.state.items.map((item) => {
            return (
                <p>{ item.toGet }x { item.name }</p>
            )
        })
        return (
                <ReactModal isOpen={ this.props.showModal }>
                    { listItems }
                    <button onClick={ this.props.handleCloseShopping }>Close</button>
                </ReactModal>
        );
    }
};

export default ShoppingModal;