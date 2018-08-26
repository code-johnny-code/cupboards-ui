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
        this._itemsByRetailer = this._itemsByRetailer.bind(this);
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

    _handleShoppingAdd() {

    }

    _itemsByRetailer(retailer) {
        return this.state.items.filter(item => item.retailer.value === retailer);
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
                                        <div>
                                            <p key={ item.name }>{ item.toGet }x { item.name }</p>
                                            <button>Remove</button>
                                        </div>
                                    )
                                }) }
                                <hr/>
                            </div>
                        )
                    }) }
                    <button onClick={ this._handleShoppingAdd } >Add</button>
                    <button onClick={ this.props.handleCloseShopping }>Close</button>
                    <button onClick={ window.print }>Print</button>
                </ReactModal>
        );
    }
};

export default ShoppingModal;