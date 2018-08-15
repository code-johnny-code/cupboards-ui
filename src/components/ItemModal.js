import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Scanner from './Scanner';
import Sound from 'react-sound';
import fetch from 'node-fetch';
import Select from 'react-select'

class ItemModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          upc: '',
          scanning: false,
          blip: false,
          itemName: '',
          itemImg: '',
          price: '',
          quantity: 1,
          expiration: '',
          location: 'upstairs',
          retailer: '',
          category: ''
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleAddItem = this._handleAddItem.bind(this);
    }

    _scan() {
        this.setState({
            scanning: !this.state.scanning,
            blip: false 
        });
      }
    
    _onDetected(results) {
        this.setState({ 
            scanning: !this.state.scanning,
            upc: results.codeResult.code,
            blip: true
        });
        const upc = results.codeResult.code.toString();
        //TODO Check for and retrieve data (name, image, retailer, category) for item if upc exists in cupboards database
        const { REACT_APP_LOOKUP_URL, REACT_APP_LOOKUP_KEY } = process.env;
        fetch(`${REACT_APP_LOOKUP_URL}/${REACT_APP_LOOKUP_KEY}/${upc}`)
        .then(res => res.json())
        .catch(error => error)
        .then(res => this.setState({
            upc: upc,
            itemName: res.items[0].name,
            price: `$${res.items[0].salePrice.toFixed(2)}`,
            itemImg: res.items[0].thumbnailImage
        }))
    }

    _handleChange(event, type) {
        switch (type) {
            case 'itemName':
                this.setState({itemName: event.value})
            case 'price':
                this.setState({price: event.value})
            case 'quantity':
                this.setState({quantity: event.value})
            case 'expiration':
                this.setState({expiration: event.value})
            case 'location':
                this.setState({location: event})
            case 'retailer':
                this.setState({retailer: event})
            case 'category':
                this.setState({category: event})
            
        }
      }

      _handleAddItem () {
          //TODO: Send item info to /add endpoint to create new item. Check that list refreshes with new item.
        this.setState({ showModal: false });
      }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                {this.state.blip ? <Sound url="blip.mp3" playStatus={ Sound.status.PLAYING } /> : null}
                <button><img src="scan.png" alt="Scan button" onClick={ this._scan } /></button>
                <p>{ this.state.upc }</p>
                { this.state.itemImg ? <img src={ this.state.itemImg } alt={ this.state.itemName } /> : null }
                <div>
                    <label>
                        Name:
                        <input type="text" placeholder={ 'Name' } value={ this.state.itemName } onChange={ (newName) => this._handleChange(newName, 'itemName') } />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" placeholder={ 'Price' } value={ this.state.price } onChange={ (newPrice) => this._handleChange(newPrice, 'price') } />
                    </label>
                </div>
                <div>
                    <label>
                        Quantity:
                        <input type="number" value={ this.state.quantity } onChange={ (newQuantity) => this._handleChange(newQuantity, 'quantity') } />
                    </label>
                </div>
                <div>
                    <label>
                        Expiration:
                        <input type="text" value={ this.state.expiration } onChange={ (newExpiration) => this._handleChange(newExpiration, 'expiration') } />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <Select options={[
                            { value: 'upstairs', label: 'Upstairs' },
                            { value: 'downstairs', label: 'Downstairs' },
                            { value: 'deepFreeze', label: 'Deep Freeze' }
                        ]} isSearchable={false} onChange={ (locationValue) => this._handleChange(locationValue, 'location') }/>
                    </label>
                </div>
                <div>
                    <label>
                        Preferred Retailer:
                        <Select options={[
                            { value: 'target', label: 'Target' },
                            { value: 'walmart', label: 'Walmart' },
                            { value: 'aldi', label: 'Aldi' },
                            { value: 'costco', label: 'Costco' },
                        ]} isSearchable={false} onChange={ (retailerValue) => this._handleChange(retailerValue, 'retailer') }/>
                    </label>
                </div>
                <div>
                    <label>
                        Category:
                        <Select options={[
                            { value: 'groceries', label: 'Groceries' },
                            { value: 'supplies', label: 'House supplies' }
                        ]} isSearchable={false} onChange={ (categoryValue) => this._handleChange(categoryValue, 'category') }/>
                    </label>
                </div>
                <button onClick={ this._handleAddItem } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;