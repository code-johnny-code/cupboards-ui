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
          itemName: 'test'
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
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
    }

    _handleNameChange(event) {
        this.setState({itemName: event.target.value});
      }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                {this.state.blip ? <Sound url="blip.mp3" playStatus={ Sound.status.PLAYING } /> : null}
                <button onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                <p>{ this.state.upc }</p>
                <label>
                    Name:
                    <input type="text" value={this.state.itemName} onChange={this.handleNameChange} />
                </label>
                <button onClick={ () => {this.props.handleAddItem('test item')} } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;