import ReactDOM from "react-dom";
import TransitMap from "../components/TransitMap";

export async function fetchGtfsrtBuffer(route: string) {
    // Disgusting not-typescript required for this damn lib to work
    var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

    let response = await fetch('/gtfsrt/vehicles', {
        method: 'GET'
    });

    let buffer = new Uint8Array(await response.arrayBuffer());
    let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
    let entities = feed.entity;
    let vehicles: any[] = [];
    entities.forEach(function (entity: any) {
        if (entity.vehicle.trip.routeId === route) {
            let vehicle = {
                latitude: entity.vehicle.position.latitude,
                longitude: entity.vehicle.position.longitude,
                speed: entity.vehicle.position.speed,
                vehicleId: entity.vehicle.vehicle.id,
                route: entity.vehicle.trip.routeId
            };
            vehicles.push(vehicle)
        }
    });
    return vehicles;
    // const test = [ // TODO remove test data here
    //     {
    //         latitude: 38.941371,
    //         longitude: -77.364928,
    //         speed: 55,
    //         vehicleId: 1,
    //         route: 'RIBS1'
    //     },
    //     {
    //         latitude: 38.944895,
    //         longitude: -77.355177,
    //         speed: 55,
    //         vehicleId: 1,
    //         route: 'RIBS1'
    //     }
    // ]
    // return test;
}