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
          name: '',
          img_url: '',
          price: '',
          quantity: 1,
          expiration: '',
          location: 'upstairs',
          retailer: '',
          category: '',
          minimum: 0,
          activeItemKey: ''
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleAddItem = this._handleAddItem.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
        if (this.props.activeItem) {
            this.setState({
                upc: this.props.activeItem.upc,
                img_url: this.props.activeItem.img_url,
                name: this.props.activeItem.name,
                price: this.props.activeItem.price,
                quantity: this.props.activeItem.quantity,
                minimum: this.props.activeItem.minimum,
                expiration: this.props.activeItem.expiration,
                location: this.props.activeItem.location,
                retailer: this.props.activeItem.retailer,
                category: this.props.activeItem.category,
                activeItemKey: this.props.activeItem.itemKey
            })
        }
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
        //TODO Check for and retrieve data (name, image, retailer, category, minimum) for item if upc exists in cupboards database
        const { REACT_APP_LOOKUP_URL, REACT_APP_LOOKUP_KEY } = process.env;
        fetch(`${REACT_APP_LOOKUP_URL}/${REACT_APP_LOOKUP_KEY}/${upc}`)
        .then(res => res.json())
        .catch(error => error)
        .then(res => this.setState({
            upc: upc,
            name: res.items[0].name,
            price: `$${res.items[0].salePrice.toFixed(2)}`,
            img_url: res.items[0].thumbnailImage
        }))
    }

    _handleChange(event) {
        const source = event.id || event.target.id;
        switch (source) {
            case 'name':
                this.setState({name: event.target.value})
                break;
            case 'price':
                this.setState({price: event.target.value})
                break;
            case 'quantity':
                this.setState({quantity: event.target.value})
                break;
            case 'minimum':
                this.setState({minimum: event.target.value})
                break;
            case 'expiration':
                this.setState({expiration: event.target.value})
                break;
            case 'location':
                this.setState({location: event.value})
                break;
            case 'retailer':
                this.setState({retailer: event.value})
                break;
            case 'category':
                this.setState({category: event.value})
                break;
        }
      }

      _handleAddItem () {
          const { REACT_APP_ADD_URL } = process.env;
          const data = { ...this.state };
          fetch(REACT_APP_ADD_URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(() => {
            this.props.handleCloseModal();
            //TODO: Find better way of resetting state after each item addition
            this.setState({
                upc: '',
                scanning: false,
                blip: false,
                name: '',
                img_url: '',
                price: '',
                quantity: 1,
                expiration: '',
                location: 'upstairs',
                retailer: '',
                category: '',
                minimum: 0
              });
          })
      }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                {this.state.blip ? <Sound url="blip.mp3" playStatus={ Sound.status.PLAYING } /> : null}
                <button><img src="scan.png" alt="Scan button" onClick={ this._scan } /></button>
                <p>{ this.state.upc }</p>
                <p>{ this.state.activeItemKey }</p>
                { this.state.img_url ? <img src={ this.state.img_url } alt={ this.state.name } /> : null }
                <div>
                    <label>
                        Name:
                        <input type="text" id='name' placeholder={ 'Name' } value={ this.state.name } onChange={ this._handleChange } />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" id='price' placeholder={ 'Price' } value={ this.state.price } onChange={ this._handleChange } />
                    </label>
                </div>
                <div>
                    <label>
                        Quantity:
                        <input type="number" id='quantity' value={ this.state.quantity } onChange={ this._handleChange } />
                    </label>
                </div>
                <div>
                    <label>
                        Mininum on-hand Quantity:
                        <input type="number" id='minimum' value={ this.state.minimum } onChange={ this._handleChange } />
                    </label>
                </div>
                <div>
                    <label>
                        Expiration:
                        <input type="text" id='expiration' value={ this.state.expiration } onChange={ this._handleChange } />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <Select options={[
                            { id:'location', value: 'upstairs', label: 'Upstairs' },
                            { id:'location', value: 'downstairs', label: 'Downstairs' },
                            { id:'location', value: 'deepFreeze', label: 'Deep Freeze' }
                        ]} isSearchable={false} onChange={ this._handleChange }/>
                    </label>
                </div>
                <div>
                    <label>
                        Preferred Retailer:
                        <Select options={[
                            { id:'retailer', value: 'target', label: 'Target' },
                            { id:'retailer', value: 'walmart', label: 'Walmart' },
                            { id:'retailer', value: 'aldi', label: 'Aldi' },
                            { id:'retailer', value: 'costco', label: 'Costco' },
                        ]} isSearchable={false} onChange={ this._handleChange }/>
                    </label>
                </div>
                <div>
                    <label>
                        Category:
                        <Select options={[
                            { id:'category', value: 'groceries', label: 'Groceries' },
                            { id:'category', value: 'supplies', label: 'House supplies' }
                        ]} isSearchable={false} onChange={ this._handleChange }/>
                    </label>
                </div>
                <button onClick={ this._handleAddItem } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;