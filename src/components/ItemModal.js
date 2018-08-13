import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Scanner from './Scanner';

class ItemModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          upc: '',
          scanning: false
        }
    
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
    }

    _scan() {
        this.setState({ scanning: !this.state.scanning });
      }
    
    _onDetected(results) {
        this.setState({ scanning: !this.state.scanning });
        this.setState({ upc: results.codeResult.code });
    }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                <button onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                <p>{ this.state.upc }</p>
                <button onClick={ () => {this.props.handleAddItem('test item')} } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;