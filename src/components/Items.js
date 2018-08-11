import React, { Component } from 'react';
import ItemBox from './ItemBox'

class Items extends Component {
    
    render() {
        const listItems = this.props.items.map((link) => {
            return <ItemBox key={link._id} img_url={link.img_url} name={link.name} />
        });
        return (
            listItems
        );
    }
};

export default Items;