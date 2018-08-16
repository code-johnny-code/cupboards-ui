import React, { Component } from 'react';
import ItemBox from './ItemBox'
import 'core-js/es6/map';

class Items extends Component {
    
    render() {
        const listItems = this.props.items.map((link) => {
            let retailerLogo = '';
            switch(link.retailer) {
                case 'Target':
                    retailerLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/100px-Target_logo.svg.png';
                    break;
                case 'Walmart':
                    retailerLogo = 'http://thenewsafrica.com/wp-content/uploads/2018/07/walmart-logo-free-transparent-png-logos-walmart-logo-png-design-logo.jpg';
                    break;
                default:
                    retailerLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Antu_amarok_cart_view.svg'
            }
            return <ItemBox 
            key={link._id}
            itemKey={link._id} 
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
            itemPrice={link.price} />
        });
        return (
            listItems
        );
    }
};

export default Items;