import TransitMap from '../components/TransitMap';
import UserForm from '../components/UserForm'
import React from 'react';
import FairfaxConnectorService from '../services/FairfaxConnectorService';

class MapPage extends React.Component<{}, {vehicles: any, route: string, center: any, zoom: number, shape: []}> {
  constructor(props: any) {
    super(props);
    this.state = { vehicles: [], route: '', center: {latitude: 38.863902, longitude: -77.243399}, zoom: 12, shape: [] }
    this.whenSubmit = this.whenSubmit.bind(this);
  }

  calculateCenter(vehicles: any[]) {
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

  whenSubmit = async (route: any) => {
    const vehicles = await FairfaxConnectorService.fetchVehicles(route)
    const shape = await FairfaxConnectorService.fetchRouteShape(route)

    const center = (vehicles.length === 0) ? {latitude: 38.863902, longitude: -77.243399} : this.calculateCenter(vehicles)
    const zoom = (vehicles.length === 0) ? 12 : 14
    this.setState({
      center: center,
      zoom: zoom,
      route: route,
      vehicles: vehicles,
      shape: shape
    })
  }

  render() {
    return (
      <>
        <UserForm whenSubmit={this.whenSubmit} /><br />
        <TransitMap vehicles={this.state.vehicles} center={this.state.center} zoom={this.state.zoom} route={this.state.route} shape={this.state.shape} />
      </>
    )
  };
}

export default MapPage;