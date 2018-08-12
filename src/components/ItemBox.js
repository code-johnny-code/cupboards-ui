import React, { Component } from 'react';
import '../css/itemBox.css';

class ItemBox extends Component {
    render() {
        return (
            <div className={ 'container' }>
                <div className={ 'numberLoc' }>
                    <p className={ 'quantity' }>{ this.props.quantity }</p>
                    <p className={ 'exp' }>{ this.props.expiration }</p>
                    <p className={ 'location' }>{ this.props.location }</p>
                </div>
                <img className={ 'itemImg' } src={this.props.img_url} alt={this.props.name}/>
                <div>
                    <p>{ this.props.name }</p>
                    <button onClick={ () => {this.props.handleOpenModal(this.props)} } >BUTTON FOR SOMETHING</button>
                </div>
                <div className={ 'retailerBox' }>
                    <img className={ 'retailerLogo' } src={this.props.retailerLogo} alt={this.props.retailer} /> 
                </div>
            </div>
        );
    }
};

export default ItemBox;