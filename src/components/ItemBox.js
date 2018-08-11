import React, { Component } from 'react';
import '../css/itemBox.css';

class ItemBox extends Component {
    render() {
        return (
            <div className={ 'container' }>
                <img src={this.props.img_url} alt={this.props.name}/>
                <p>{ this.props.name }</p>
            </div>
        );
    }
};

export default ItemBox;