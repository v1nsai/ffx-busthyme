// OpenStreetMaps

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
    const center = (this.props.vehicles.length == 0) ? {latitude: 38.863902, longitude: -77.243399} : this.props.vehicles[0]
    const zoom = (this.props.vehicles.length == 0) ? 12 : 15
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

function ChangeView({center, zoom}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
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

export default TransitMap;

















// Google Maps

// import * as React from "react";
// import * as ReactDom from "react-dom";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { createCustomEqual } from "fast-equals";
// import { isLatLngLiteral } from "@googlemaps/typescript-guards";
// import google_api_key from "../constants/api_key";

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

// const TransitMap: React.VFC = () => {
//   const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
//   const [zoom, setZoom] = React.useState(3); // initial zoom
//   const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
//     lat: 0,
//     lng: 0,
//   });

//   const onClick = (e: google.maps.MapMouseEvent) => {
//     // avoid directly mutating state
//     setClicks([...clicks, e.latLng!]);
//   };

//   const onIdle = (m: google.maps.Map) => {
//     console.log("onIdle");
//     setZoom(m.getZoom()!);
//     setCenter(m.getCenter()!.toJSON());
//   };

//   const form = (
//     <div
//       style={{
//         padding: "1rem",
//         flexBasis: "250px",
//         height: "100%",
//         overflow: "auto",
//       }}
//     >
//       <label htmlFor="zoom">Zoom</label>
//       <input
//         type="number"
//         id="zoom"
//         name="zoom"
//         value={zoom}
//         onChange={(event) => setZoom(Number(event.target.value))}
//       />
//       <br />
//       <label htmlFor="lat">Latitude</label>
//       <input
//         type="number"
//         id="lat"
//         name="lat"
//         value={center.lat}
//         onChange={(event) =>
//           setCenter({ ...center, lat: Number(event.target.value) })
//         }
//       />
//       <br />
//       <label htmlFor="lng">Longitude</label>
//       <input
//         type="number"
//         id="lng"
//         name="lng"
//         value={center.lng}
//         onChange={(event) =>
//           setCenter({ ...center, lng: Number(event.target.value) })
//         }
//       />
//       <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
//       {clicks.map((latLng, i) => (
//         <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//       ))}
//       <button onClick={() => setClicks([])}>Clear</button>
//     </div>
//   );

//   return (
//     <div style={{ display: "flex", height: "100%" }}>
//       <Wrapper apiKey={google_api_key} render={render}>
//         <Map
//           center={center}
//           onClick={onClick}
//           onIdle={onIdle}
//           zoom={zoom}
//           style={{ flexGrow: "1", height: "100%" }}
//         >
//           {clicks.map((latLng, i) => (
//             <Marker key={i} position={latLng} />
//           ))}
//         </Map>
//       </Wrapper>
//       {/* Basic form for controlling center and zoom of map. */}
//       {form}
//     </div>
//   );
// };
// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   children?: React.ReactNode;
// }

// const Map: React.FC<MapProps> = ({
//   onClick,
//   onIdle,
//   children,
//   style,
//   ...options
// }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);

//   // because React does not do deep comparisons, a custom hook is used
//   // see discussion in https://github.com/googlemaps/js-samples/issues/946
//   useDeepCompareEffectForMaps(() => {
//     if (map) {
//       map.setOptions(options);
//     }
//   }, [map, options]);

//   React.useEffect(() => {
//     if (map) {
//       ["click", "idle"].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener("click", onClick);
//       }

//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   return (
//     <>
//       <div ref={ref} style={style} />
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           return React.cloneElement(child, { map });
//         }
//       })}
//     </>
//   );
// };

// const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
//   const [marker, setMarker] = React.useState<google.maps.Marker>();

//   React.useEffect(() => {
//     if (!marker) {
//       setMarker(new google.maps.Marker());
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options);
//     }
//   }, [marker, options]);

//   return null;
// };

// const deepCompareEqualsForMaps = createCustomEqual(
//   (deepEqual: any) => (a: any, b: any) => {
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }

//     // TODO extend to other types

//     // use fast-equals for other objects
//     return deepEqual(a, b);
//   }
// );

// function useDeepCompareMemoize(value: any) {
//   const ref = React.useRef();

//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value;
//   }

//   return ref.current;
// }

// function useDeepCompareEffectForMaps(
//   callback: React.EffectCallback,
//   dependencies: any[]
// ) {
//   React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

// // window.addEventListener("DOMContentLoaded", () => {
// //   ReactDom.render(<TransitMap />, document.getElementById("root"));
// // });

// export default TransitMap;