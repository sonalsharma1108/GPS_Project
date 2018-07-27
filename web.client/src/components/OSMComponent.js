import React from 'react';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';

export default class OSMComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            zoom: 4,
            polyline: [[51.505, 10.09]]
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/getdata')
            .then(response => response.json())
            .then((data) => {

                let dataArr = new Array();

                data.map(function (cordinate) {
                    dataArr.push([cordinate.Lat, cordinate.Lng])
                });

                this.setState({ polyline: dataArr });
            })
    }

    render() {
        const position = [12.9716, 77.5946];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.state.polyline.map((cordinate) => (
                    <Marker position={cordinate} />
                ))
                }
                <Polyline color="lime" positions={this.state.polyline}
                />
            </Map>
        );
    }
}