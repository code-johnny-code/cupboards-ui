import React, { Component } from 'react';
import ReactModal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'

const fetch = require('node-fetch');

class ShoppingModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            addingItem: false,
            name: '',
            toGet: 1,
            onList: true,
            retailer: {},
            deleted: true
        }

        this._retrieveItems = this._retrieveItems.bind(this);
        this._itemsByRetailer = this._itemsByRetailer.bind(this);
        this._clearShoppingList = this._clearShoppingList.bind(this);
        this._handleShoppingAddToggle = this._handleShoppingAddToggle.bind(this);
        this._handleShoppingAddSave = this._handleShoppingAddSave.bind(this);
        this._handleChange = this._handleChange.bind(this);
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

    _handleShoppingAddToggle() {
        this.setState({addingItem: !this.state.addingItem})
    }

    _handleShoppingAddSave() {
        const { REACT_APP_ADD_URL } = process.env;
        const { name, toGet, onList, retailer, deleted } = this.state;
        const data = { name, toGet, onList, retailer, deleted };
        fetch(REACT_APP_ADD_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            this._retrieveItems();
            this._handleShoppingAddToggle();
        })
    }

    _itemsByRetailer(retailer) {
        return this.state.items.filter(item => item.retailer.value === retailer);
    }

    _clearShoppingList() {
        const { REACT_APP_SHOPCLEAR_URL } = process.env;
        fetch(REACT_APP_SHOPCLEAR_URL)
        .then(() => this._retrieveItems())
    }

    _handleChange(event) {
        let source = (event.id || event.target.id || 'datepicker');
        let value;
        if (source === 'location' || source === 'retailer' || source === 'category') {
            value = event;
        }
        else if (event.target.type === 'checkbox'){
            source = 'bestBy';
            value = !this.state.bestBy;
        }
        else {
            value = event.value || event.target.value || '';
        }
        this.setState({[source]: value});
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
                { this.state.addingItem ? 
                    <div>
                        <input type="number" id='quantity' placeholder={ 'How many?' } value={ this.state.toGet } onChange={ this._handleChange } />
                        <input type="text" id='name' placeholder={ 'Name' } value={ this.state.name } onChange={ this._handleChange } />
                        <Select options={[
                                { id:'retailer', value: 'target', label: 'Target' },
                                { id:'retailer', value: 'walmart', label: 'Walmart' },
                                { id:'retailer', value: 'aldi', label: 'Aldi' },
                                { id:'retailer', value: 'costco', label: 'Costco' },
                                { id:'retailer', value: 'other', label: 'Other' }
                            ]} value={this.state.retailer} placeholder={'Retailer'} isSearchable={false} onChange={ this._handleChange }/>
                        <button onClick={ this._handleShoppingAddSave }>Save</button>
                        <button onClick={ this._handleShoppingAddToggle }>Cancel</button>
                    </div> : 
                    <div>
                        <button onClick={ this._handleShoppingAddToggle } >Add</button>
                        <button onClick={ this.props.handleCloseShopping }>Close</button>
                    </div> }
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