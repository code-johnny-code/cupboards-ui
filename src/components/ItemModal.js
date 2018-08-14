import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Scanner from './Scanner';
import Sound from 'react-sound';

class ItemModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          upc: '',
          scanning: false,
          blip: false,
          itemName: '',
          itemImg: '',
          price: ''
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
        this._handleChange = this._handleChange.bind(this);
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
        const { REACT_APP_LOOKUP_URL } = process.env;
        fetch(REACT_APP_LOOKUP_URL + upc)
        .then(res => res.json())
        .catch(error => error)
        .then(res => this.setState({
            upc: upc,
            itemName: res.items[0].title,
            price: res.items[0].offers[0].price,
            itemImg: res.items[0].images[0]
        }))
    }

    _handleChange(event, type) {
        switch (type) {
            case 'name':
                this.setState({itemName: event.target.value})
            case 'price':
                this.setState({price: event.target.value})
        }
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
                        <input type="text" placeholder={ 'Name' } value={ this.state.itemName } onChange={ () => this._handleChange(EventTarget, 'name') } />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="text" placeholder={ 'Price' } value={ this.state.price } onChange={ () => this._handleChange(EventTarget, 'price') } />
                    </label>
                </div>
                <button onClick={ () => {this.props.handleAddItem('test item')} } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;