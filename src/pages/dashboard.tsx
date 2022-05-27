import TransitMap from '../components/TransitMap';
import { Status } from "@googlemaps/react-wrapper";

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
  entities.forEach(function(entity: any) {
    if (entity.vehicle.trip.routeId === 'RIBS1') {
      console.log(entity.vehicle.position);
    }
  });

  return entities;
}

fetchGtfsrtBuffer()
    .then()
    .catch(error => console.error(error))
    .finally(() => {setTimeout(fetchGtfsrtBuffer, 30000)})

export default DashboardPage;