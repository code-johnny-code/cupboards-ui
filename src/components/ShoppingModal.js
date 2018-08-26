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

    _itemsByRetailer(retailer) {
        return this.state.items.filter(item => item.retailer.value === retailer);
    }

    render() {
        const retailers = [...new Set(this.state.items.map(item => item.retailer.value))];
        retailers.forEach(retailer => {
            this._itemsByRetailer(retailer);
        })
        return (
                <ReactModal isOpen={ this.props.showModal }>
                    { retailers.map(retailer => {
                        return (
                            <div key={ retailer || 'unspecified' } >
                                { retailer !== undefined ? <h2>{ retailer.charAt(0).toUpperCase() + retailer.slice(1) }</h2> : 'No Retailer Specified'}
                                { this._itemsByRetailer(retailer).map(item => {
                                    return (
                                        <p key={ item.name }>{ item.toGet }x { item.name }</p>
                                    )
                                }) }
                                <hr/>
                            </div>
                        )
                    }) }
                    <button onClick={ this.props.handleCloseShopping }>Close</button>
                    <button onClick={ window.print }>Print</button>
                </ReactModal>
        );
    }
};

export default ShoppingModal;