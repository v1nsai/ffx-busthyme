import TransitMap from '../components/TransitMap';
import UserForm from '../components/UserForm'
import React from 'react';
import FairfaxConnectorService from '../services/FairfaxConnectorService';

class MapPage extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { route: '', vehicles: []};
    this.whenSubmit = this.whenSubmit.bind(this);
  }

  whenSubmit = async (route: any) => {
    const vehicles = await FairfaxConnectorService.fetchVehicles(route)
    this.setState({vehicles: vehicles})
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