import React, { Component } from 'react';
import '../css/itemBox.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
                item_Id: this.props.item_Id,
                category: this.props.category
                })}>
                <div className={ 'numberLoc' }>
                    <p className={ 'quantity' }>{ this.props.quantity }</p>
                    { this.props.bestBy ? <p className={ 'bestBy' }>Best by</p> : <p className={ 'bestBy' }>Use by</p> }
                    <DatePicker className={'datepicker'} disabled={true} selected={ moment(this.props.expiration) }/>
                    <p className={ 'location' }>{ this.props.location.label }</p>
                </div>
                <div className={ 'centerElements' }>
                    <p>{ this.props.name }</p>
                    <img className={ 'itemImg' } src={this.props.img_url || 'placeholder.png'} alt={this.props.name}/>
                </div>
                <div className={ 'retailerBox' }>
                    <p className={ 'price' }>{ this.props.itemPrice } </p>
                    <img className={ 'retailerLogo' } src={this.props.retailerLogo} alt={this.props.retailer.value} /> 
                </div>
            </div>
        );
    }
};

export default ItemBox;