import TransitMap from './components/TransitMap';
import { Status } from "@googlemaps/react-wrapper";
import ReactDOM from 'react-dom';
import UserForm from './components/UserForm'
import React from 'react';
import { fetchGtfsrtBuffer } from './services/GtfsrtFeeds';

class MapPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { route: '', vehicles: []};
    this.whenSubmit = this.whenSubmit.bind(this);
    // this.setStateSync = this.setStateSync.bind(this)
  }

  whenSubmit = async (route: any) => {
    // getVehicles(route, this)
    const vehicles = await fetchGtfsrtBuffer(route)
    this.setState({vehicles: vehicles}, () => {
      this.render()
    })
  }

  // setStateSync = (newState: any) => {
  //   return new Promise<void>(resolve => {
  //     this.setState(newState, () => resolve());
  // });
  // }

  render() {
    return (
      <>
        <UserForm whenSubmit={this.whenSubmit} /><br />
        <TransitMap vehicles={this.state.vehicles} />
      </>
    )
  };
}

// async function getVehicles(route: any, context: MapPage) {
//   const vehicles = await fetchGtfsrtBuffer(route)
//   await context.setStateSync({vehicles: vehicles})
//   context.render()
// }

export default MapPage;