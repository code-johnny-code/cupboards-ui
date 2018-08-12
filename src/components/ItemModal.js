import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ItemModal extends Component {

    render() {
        return (
            <ReactModal isOpen={ this.props.showModal }>
                <button onClick={ this.props.handleCloseModal } >Close Modal</button>
                { this.props.item.retailer }
            </ReactModal>
        );
    }
};

export default ItemModal;