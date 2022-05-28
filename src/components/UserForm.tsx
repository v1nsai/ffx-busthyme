import React from "react";
import ReactDOM from "react-dom";
import { fetchGtfsrtBuffer } from "../services/GtfsrtFeeds";

class UserForm extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { route: 'RIBS1' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const route = event.target.route;
    this.setState( {route: route} );
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const route = event.target.route.value;
    this.setState( { route: route } );
    this.props.whenSubmit(route);
    // fetchGtfsrtBuffer(route)
    //   .catch(error => console.error(error))
    //   .finally(() => { setTimeout(fetchGtfsrtBuffer, 30000) })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Route:
          <input type="text" name="route" value={this.state.route} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

// async function fetchGtfsrtBuffer(route: string) {
//   let response = await fetch('/gtfsrt/vehicles', {
//     method: 'GET'
//   });

//   let buffer = new Uint8Array(await response.arrayBuffer());
//   let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
//   let entities = feed.entity;
//   let vehicles: any[] = [];
//   entities.forEach(function (entity: any) {
//     if (entity.vehicle.trip.routeId === route) {
//       let vehicle = { 
//         latitude: entity.vehicle.position.latitude,
//         longitude: entity.vehicle.position.longitude,
//         speed: entity.vehicle.position.speed,
//         vehicleId: entity.vehicle.vehicle.id,
//         route: entity.vehicle.trip.routeId
//       };
//       vehicles.push(vehicle)
//     }
//   });
//   if(vehicles.length > 0) {
//     ReactDOM.render(
//       <TransitMap vehicles={vehicles} />,
//       document.getElementById("root")
//     )
//   }
// }

export default UserForm;