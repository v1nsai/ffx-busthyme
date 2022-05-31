class FairfaxConnectorService {
    static cors_proxy_url = 'https://http-cors-proxy.p.rapidapi.com/'
    static ffxBaseUrl = 'https://www.fairfaxcounty.gov'
    static vehiclesEndpoint = '/gtfsrt/vehicles'
    static patternsEndpoint = '/bustime/api/v3/getpatterns'
    static origin = window.location.origin ? window.location.origin : 'https://v1nsai.github.io/ffx-busthyme/'

    static fetchVehicles = async (route: string) => {
        const entities = await this.fetchGtfsrtFeedEntities(this.ffxBaseUrl + this.vehiclesEndpoint)
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
        // const test2 = [ // TODO remove test data here
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
        // return test2;
    }

    static async fetchRouteShape(route: string) {
        let url = `${this.ffxBaseUrl + this.patternsEndpoint}?rt=${route}&format=json&key=${process.env.REACT_APP_FAIRFAX_CONNECTOR_KEY}`
        // let response: any = await fetch(url).then(response => response.json())
        const options = {
            method: 'GET',
            headers: {
                origin: this.origin,
                'x-requested-with': '',
                'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_CORS_PROXY_API_KEY ? process.env.REACT_APP_CORS_PROXY_API_KEY : ''
            }
        };
        const response: any = await fetch(this.cors_proxy_url + url, options)
            .then(response => response.json())

        let polyline: any = []
        const ptr = await response['bustime-response']['ptr']
        if(ptr) {
            ptr.forEach((ptr: any) => {
                ptr.pt.forEach((pt: any) => {
                    polyline.push([pt.lat, pt.lon])
                })
            })
        }

        return polyline;
    }

    static async fetchGtfsrtFeedEntities(url: string) {
        // Disgusting not-typescript required for this damn lib to work
        var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

        // const response = await fetch(url, {
        //     method: 'GET'
        // })
        const options = {
            method: 'GET',
            headers: {
                origin: this.origin,
                'x-requested-with': '',
                'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_CORS_PROXY_API_KEY ? process.env.REACT_APP_CORS_PROXY_API_KEY : ''
            }
        };
        
        const response = await fetch(this.cors_proxy_url + url, options)

        const buffer = new Uint8Array(await response.arrayBuffer());
        const feed = await GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
        const entities = feed.entity;

        return entities;
    }
}

export default FairfaxConnectorService;