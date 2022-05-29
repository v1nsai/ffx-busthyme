import React from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

class TransitMap extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { vehicles: [] }
    this.getMarkers = this.getMarkers.bind(this);
  }

  getMarkers() {
    let marks: any[] = [];
    this.props.vehicles.forEach((vehicle: any) => {
      if (vehicle != null) {
        marks.push(
          <Marker position={[vehicle.latitude, vehicle.longitude]}>
            <Popup>
              vehicle ID: {vehicle.vehicleId}<br />
              route: {vehicle.route}<br />
              speed: {vehicle.speed}<br />
            </Popup>
          </Marker>
        );
      }
    })

    return marks;
  }

  render() {
    const center = (this.props.vehicles.length == 0) ? {latitude: 38.863902, longitude: -77.243399} : calculateCenter(this.props.vehicles)
    const zoom = (this.props.vehicles.length == 0) ? 12 : 14
    // const center = {latitude: 38, longitude: -77}
    return (
      <MapContainer center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom={true}>
        <ChangeView center={[center.latitude, center.longitude]} zoom={zoom} /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.getMarkers()}
      </MapContainer>
    );
  }
}

function ChangeView({center, zoom}: any) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function calculateCenter(vehicles: any[]) {
  let counter = 0
  let lat = 0
  let lon = 0
  vehicles.forEach((vehicle: any) => {
    lat = lat + vehicle.latitude
    lon = lon + vehicle.longitude
    counter = counter + 1
  })
  lat = lat / counter
  lon = lon / counter
  return {latitude: lat, longitude: lon}
}

function getRouteShape(route: string) {
  
}

export default TransitMap;