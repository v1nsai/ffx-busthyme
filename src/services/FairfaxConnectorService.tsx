import React from "react";

class FairfaxConnectorService {
    static fetchVehicles = async (route: string) => {
        const entities = await this.fetchGtfsrtFeedEntities('/gtfsrt/vehicles')
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

    static async fetchRouteShape(route: string) {
        // const api_key = process.env.FAIRFAX_CONNECTOR_KEY;
        // const response = await fetch('/bustime/api/v3/getpatterns' +
        // new URLSearchParams({
        //     rt: route,
        //     format: 'json',
        //     key: api_key
        // }))
    }

    static async fetchGtfsrtFeedEntities(url: string) {
        // Disgusting not-typescript required for this damn lib to work
        var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

        const response = await fetch(url, {
            method: 'GET'
        });

        const buffer = new Uint8Array(await response.arrayBuffer());
        const feed = await GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
        const entities = feed.entity;

        return entities;
    }
}

export default FairfaxConnectorService;