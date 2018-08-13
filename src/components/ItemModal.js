import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ItemModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          upc: {} 
        }
    }

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                <button onClick={ () => {this.props.handleAddItem('test item')} } >Add item</button>
                <button onClick={ this.props.handleCloseModal } >Cancel</button>
            </ReactModal>
        );
    }
};

export default ItemModal;