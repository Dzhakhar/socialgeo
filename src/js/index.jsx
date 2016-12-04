import React from "react";
import ReactDOM from "react-dom";
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import {SocketProvider} from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect("ws://" + window.location.host);

const coords = {
    lat: 43.2220,
    lng: 76.8512
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: []
        }

        this.onMapCreated = this.onMapCreated.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        socket.on('new::user', (msg)=> {
            alert("New user");
            let tmp = this.state.markers;
            tmp.push(msg);
            this.setState({
                markers: tmp
            })
        });
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onDragEnd(e) {
        console.log('onDragEnd', e);
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    onClick(e) {
        console.log('onClick', e);
    }

    renderMarkers() {
        if (this.state.markers.length > 0) {
            return this.state.markers.map((item, i)=> {
                return <Marker
                    lat={item.ll[0]}
                    lng={item.ll[1]}
                />
            })
        }

        return false;
    }

    render() {
        return <Gmaps
            width={'100%'}
            height={'100%'}
            lat={coords.lat}
            lng={coords.lng}
            zoom={2}
            loadingMessage={'Be happy'}
            params={{v: '3.exp', key: 'AIzaSyCEaDfgxjvxDMIIhcuWmsOQOiwceNMhhG0'}}
            onMapCreated={this.onMapCreated}
            styles={[
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#263c3f'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#6b9a76'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#1f2835'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#f3d19c'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#2f3948'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#515c6d'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                },
                {
                    featureType: "administrative.country",
                    elementType: "geometry.fill",
                    stylers: [{color: "#FFFFFF"}]
                }
            ]}>
            {this.renderMarkers()}
            <InfoWindow
                lat={coords.lat + 4}
                lng={coords.lng + 4}
                content={'Hello, React :)'}
                onCloseClick={this.onCloseClick}/>
            <Circle
                lat={coords.lat}
                lng={coords.lng}
                radius={10000}
                onClick={this.onClick}/>
        </Gmaps>
    }
}

ReactDOM.render(<div><App/></div>, document.getElementById("app"));