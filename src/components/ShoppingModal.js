import React, { Component } from 'react';
import ReactModal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
const fetch = require('node-fetch');

class ShoppingModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: []
        }

        this._retrieveItems = this._retrieveItems.bind(this);
        this._itemsByRetailer = this._itemsByRetailer.bind(this);
        this._clearShoppingList = this._clearShoppingList.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
        this._retrieveItems();
    }

    _retrieveItems() {
        const { REACT_APP_SHOPLIST_URL } = process.env;
        fetch(REACT_APP_SHOPLIST_URL)
        .then(res => res.json())
        .then(res => this.setState({ items: res }))
      }

    //TODO Add an item to the shopping list that's not already in the inventory
    // _handleShoppingAdd() {}

    _itemsByRetailer(retailer) {
        return this.state.items.filter(item => item.retailer.value === retailer);
    }

    _clearShoppingList() {
        const { REACT_APP_SHOPCLEAR_URL } = process.env;
        fetch(REACT_APP_SHOPCLEAR_URL)
        .then(() => this._retrieveItems())
    }

    render() {
        const retailers = [...new Set(this.state.items.map(item => item.retailer.value))];
        return (
            <ReactModal isOpen={ this.props.showModal }>
                { retailers.map(retailer => {
                    return (
                        <div key={ retailer || 'unspecified' } >
                            <h2>{ retailer !== undefined ? retailer.charAt(0).toUpperCase() + retailer.slice(1) : 'No Retailer Specified' }</h2>
                            { this._itemsByRetailer(retailer).map(item => {
                                return (
                                    <div key={ retailer } >
                                        <p key={ item.name }>{ item.toGet }x { item.name }</p>
                                        {/* <button>Remove</button> */}
                                    </div>
                                )
                            }) }
                            <hr/>
                        </div>
                    )
                }) }
                {/* <button onClick={ this._handleShoppingAdd } >Add</button> */}
                <button onClick={ this.props.handleCloseShopping }>Close</button>
                { this.state.items.length ? 
                <div>
                    <button onClick={ this._clearShoppingList }>Clear List</button>
                    <button onClick={ window.print }>Print</button>
                </div>
                : null }
            </ReactModal>
        );
    }
};

export default ShoppingModal;