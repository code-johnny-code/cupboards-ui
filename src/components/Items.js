import React, { Component } from 'react';
import ItemBox from './ItemBox'

class Items extends Component {
    
    render() {
        const listItems = this.props.items.map((link) => {
            let retailerLogo = '';
            switch(link.retailer) {
                case 'Target':
                    retailerLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/100px-Target_logo.svg.png';
                    break;
            }
            return <ItemBox 
            key={link._id} 
            img_url={link.img_url} 
            name={link.name} 
            quantity={link.quantity}
            location={link.location}
            expiration={link.expiration}
            retailer={link.retailer}
            retailerLogo={retailerLogo} />
        });
        return (
            listItems
        );
    }
};

export default Items;