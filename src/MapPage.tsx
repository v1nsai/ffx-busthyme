import TransitMap from './components/TransitMap';
import { Status } from "@googlemaps/react-wrapper";
import ReactDOM from 'react-dom';
import UserForm from './components/UserForm'
import React from 'react';
import { fetchGtfsrtBuffer } from './services/GtfsrtFeeds';

class MapPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { route: '' };
  }

  render() {
    return (
      <>
        <UserForm whenSubmit={fetchGtfsrtBuffer} /><br />
        <TransitMap />
      </>
    )
  };
}

export default MapPage;