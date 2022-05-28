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
  }

  whenSubmit(route: any) {
    fetchGtfsrtBuffer(route)
      .then(vehicles => this.setState( { vehicles: vehicles } ));
    // this.render();
  }

  render() {
    return (
      <>
        <UserForm whenSubmit={this.whenSubmit} /><br />
        <TransitMap vehicles={this.state.vehicles} />
      </>
    )
  };
}

export default MapPage;