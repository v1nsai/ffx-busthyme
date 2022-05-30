import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import FairfaxConnectorService from '../services/FairfaxConnectorService';

class TransitMap extends React.Component<{vehicles: any, center: any, zoom: any, route: any}, {}> {
  constructor(props: any) {
    super(props);
    this.putMarkers = this.putMarkers.bind(this);
    this.putPolygon = this.putPolygon.bind(this);
  }

  putMarkers() {
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

  putPolygon(route: string) {
    if(route != '') {
      const positions: any = FairfaxConnectorService.fetchRouteShape(route)
      return (
        <Polygon positions={positions} />
      )
    }
    else {
      return null;
    }
  }
  
  render() {
    const route = this.props.route ? this.props.route : ''
    const center = this.props.center ? this.props.center : {latitude: 38.863902, longitude: -77.243399}
    const zoom = this.props.zoom ? this.props.zoom : 12

    const markers = this.putMarkers()
    const routeShape = this.putPolygon(this.props.route)
    const markersAndRouteShape = [...markers, routeShape]
    return (
      <MapContainer center={[center.latitude, center.longitude]} zoom={zoom} scrollWheelZoom={true}>
        <ChangeView center={[center.latitude, center.longitude]} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersAndRouteShape}
      </MapContainer>
    );
  }
}

function ChangeView({center, zoom}: any) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default TransitMap;