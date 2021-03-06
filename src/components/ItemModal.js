import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Scanner from './Scanner';
import Sound from 'react-sound';
import fetch from 'node-fetch';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class ItemModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item_Id: '',
            upc: '',
            scanning: false,
            blip: false,
            name: '',
            img_url: '',
            price: '',
            quantity: 1,
            expiration: moment(),
            location: {},
            retailer: {},
            category: {},
            minimum: 0,
            activeItemKey: '',
            bestBy: false,
            onList: false,
            toGet: 1
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleAddItem = this._handleAddItem.bind(this);
        this._handleBlipEnd = this._handleBlipEnd.bind(this);
        this._handleExpiryChange = this._handleExpiryChange.bind(this);
        this._handleOnListChange = this._handleOnListChange.bind(this);
        this._UpcSearch = this._UpcSearch.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
        if (this.props.activeItem.name) {
            this.setState({...this.props.activeItem});
        }
    }

    _scan() {
        this.setState({
            scanning: !this.state.scanning,
            blip: false 
        });
      }

    _UpcSearch(upc) {
        const { REACT_APP_LOOKUP_URL, REACT_APP_LOOKUP_KEY } = process.env;
        fetch(`${REACT_APP_LOOKUP_URL}/${REACT_APP_LOOKUP_KEY}/${upc}`)
        .then(res => res.json())
        .catch(error => error)
        .then(res => {
            if (res.errors) {
                this.setState({
                    upc: upc,
                    name: 'Item not found at Walmart',
                    price: `No price data`,
                    img_url: ''
                })
            }
            else {
                this.setState({
                    upc: upc,
                    name: res.items[0].name,
                    price: `$${res.items[0].salePrice.toFixed(2)}`,
                    img_url: res.items[0].thumbnailImage
                })
            }
        })
    }
    
    _onDetected(results) {
        if (results.codeResult) {
            this.setState({ 
                scanning: false,
                upc: results.codeResult.code,
                blip: true
            });
            const upc = results.codeResult.code.toString();
            this._UpcSearch(upc);
        }
        this.setState({scanning: false})
    }

    _handleExpiryChange(date) {
        this.setState({
            expiration: date
        });
    }

    _handleOnListChange() {
        this.setState({onList: !this.state.onList});
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

      _handleBlipEnd() {
          this.setState({blip: false})
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
          })
      }

      _handleDelete(item_Id) {
          const { REACT_APP_DELETE_URL } = process.env;
          fetch(REACT_APP_DELETE_URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ item_Id })
          }).then(() => {
              this.props.handleCloseModal();
          })
      }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                {this.state.blip ? <Sound url="blip.mp3" playStatus={ Sound.status.PLAYING } onFinishedPlaying={ this._handleBlipEnd } /> : null}
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : 
                <div>
                    {!this.state.item_Id ? <button><img src="scan.png" alt="Scan button" onClick={ this._scan } /></button> : null}
                    <div>
                        <label>
                            UPC:
                            <input type="text" id="upc" value={ this.state.upc } onChange={ this._handleChange } />
                            <button onClick={ () => this._UpcSearch(this.state.upc) } >Search</button>
                        </label>
                    </div>
                    <img src={this.state.onList ? 'onListTrue.png' : 'onListFalse.png'} alt={ 'On list indicator' } onClick={this._handleOnListChange}/>

                    { this.state.img_url ? <img src={ this.state.img_url } alt={ this.state.name } /> : null }
                    { this.state.onList ? 
                    <div>
                        <label>
                            How many?:
                            <input type="number" id='toGet' value={ this.state.toGet } onChange={ this._handleChange } />
                        </label>
                    </div> : null }
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
                        </label>
                        <DatePicker disabledKeyboardNavigation shouldCloseOnSelect={true} selected={ moment(this.state.expiration) } onChange={ this._handleExpiryChange }/>
                        <label>
                            Best By 
                            <input
                                name="bestBy"
                                type="checkbox"
                                checked={this.state.bestBy}
                                onChange={this._handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Location:
                            <Select options={[
                                { id:'location', value: 'upstairs', label: 'Upstairs' },
                                { id:'location', value: 'downstairs', label: 'Downstairs' },
                                { id:'location', value: 'deepFreeze', label: 'Deep Freeze' }
                            ]} value={this.state.location} isSearchable={false} onChange={ this._handleChange }/>
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
                                { id:'retailer', value: 'other', label: 'Other' }
                            ]} value={this.state.retailer} isSearchable={false} onChange={ this._handleChange }/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Category:
                            <Select options={[
                                { id:'category', value: 'groceries', label: 'Groceries' },
                                { id:'category', value: 'supplies', label: 'House supplies' }
                            ]} value={this.state.category} isSearchable={false} onChange={ this._handleChange }/>
                        </label>
                    </div>
                    <button disabled={ !this.state.name } onClick={ this._handleAddItem } >{ this.state.item_Id ? 'Save changes' : 'Add item' }</button>
                    <button onClick={ this.props.handleCloseModal } >Cancel</button>
                    { this.state.item_Id ? <button onClick={ () => this._handleDelete(this.state.item_Id) }>Delete</button> : null }
                </div>}
            </ReactModal>
        );
    }
};

export default ItemModal;