import TransitMap from '../components/TransitMap';
import { Status } from "@googlemaps/react-wrapper";
import ReactDOM from 'react-dom';

const DashboardPage = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <TransitMap />
  );
};

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

async function fetchGtfsrtBuffer() {
  let response = await fetch('/gtfsrt/vehicles', {
    method: 'GET'
  });

  let buffer = new Uint8Array(await response.arrayBuffer());
  let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
  let entities = feed.entity;
  let coords: any[] = [];
  entities.forEach(function (entity: any) {
    if (entity.vehicle.trip.routeId === 'RIBS1') {
      let coord = { latitude: entity.vehicle.position.latitude, longitude: entity.vehicle.position.longitude };
      coords.push(coord)
    }
  });
  if(coords.length > 0) {
    ReactDOM.render(
      <TransitMap points={coords} />,
      document.getElementById("root")
    )
  }

  return entities;
}

fetchGtfsrtBuffer()
  .catch(error => console.error(error))
  .finally(() => { setTimeout(fetchGtfsrtBuffer, 30000) })

export default DashboardPage;