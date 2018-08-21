import React, { Component } from 'react';
import ItemBox from './ItemBox'
import 'core-js/es6/map';

class Items extends Component {
    
    render() {
        const listItems = this.props.items.sort(function (a, b) {
            return new Date(a.expiration) - new Date(b.expiration);
          }).map((link) => {
            let retailerLogo = '';
            switch(link.retailer.value) {
                case 'target':
                    retailerLogo = 'logo_target.png';
                    break;
                case 'walmart':
                    retailerLogo = 'logo_walmart.png';
                    break;
                case 'aldi':
                    retailerLogo = 'logo_aldi.png';
                    break;
                case 'costco':
                    retailerLogo = 'logo_costco.png';
                    break;
                default:
                    retailerLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Antu_amarok_cart_view.svg'
            }
            return <ItemBox 
            key={link._id}
            item_Id={link._id} 
            handleOpenModal={ this.props.handleOpenModal }
            upc={link.upc}
            minimum={link.minimum}
            img_url={link.img_url} 
            name={link.name} 
            quantity={link.quantity}
            location={link.location}
            expiration={link.expiration}
            retailer={link.retailer}
            retailerLogo={retailerLogo}
            itemPrice={link.price} 
            category={link.category} 
            bestBy={link.bestBy}
            onList={link.onList}/>
        });
        return (
            listItems
        );
    }
};

export default Items;