import React, { Component } from 'react';
import Quagga from 'quagga';
import '../css/Scanner.css';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this._onDetected = this._onDetected.bind(this);
    }

    componentDidMount() {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        height: 480,
                        facingMode: 'environment', // or user
                    },
                },
                locator: {
                    patchSize: 'medium',
                    halfSample: true,
                },
                numOfWorkers: 2,
                decoder: {
                    readers: ['upc_reader'],
                },
                locate: true
            },
            function(err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected(result) {
        Quagga.stop();
        this.props.onDetected(result);
    }

    render() {
        return (
            <div className={ 'scanner' }>
                <button onClick={this._onDetected}>CANCEL</button>
                <div id="interactive" className="viewport" />
                <canvas className="drawingBuffer"></canvas>
            </div>
    )
    }
}