import React, { Component } from 'react';
import '../css/itemBox.css';

class ItemBox extends Component {
    render() {
        return (
            <div className={ 'container' } onClick={() => this.props.handleOpenModal({
                name: this.props.name,
                price: this.props.itemPrice,
                quantity: this.props.quantity,
                minimum: this.props.minimum,
                expiration: this.props.expiration,
                location: this.props.location,
                retailer: this.props.retailer,
                category: this.props.category,
                upc: this.props.upc,
                img_url: this.props.img_url,
                itemKey: this.props.itemKey
                })}>
                <div className={ 'numberLoc' }>
                    <p className={ 'quantity' }>{ this.props.quantity }</p>
                    <p className={ 'exp' }>{ this.props.expiration }</p>
                    <p className={ 'location' }>{ this.props.location }</p>
                </div>
                <img className={ 'itemImg' } src={this.props.img_url} alt={this.props.name}/>
                <div>
                    <p>{ this.props.name }</p>
                    <p className={ 'price' }>{ this.props.itemPrice } </p>
                </div>
                <div className={ 'retailerBox' }>
                    <img className={ 'retailerLogo' } src={this.props.retailerLogo} alt={this.props.retailer} /> 
                </div>
            </div>
        );
    }
};

export default ItemBox;