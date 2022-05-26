from google.transit import gtfs_realtime_pb2
import requests

feed = gtfs_realtime_pb2.FeedMessage()
response = requests.get('https://www.fairfaxcounty.gov/gtfsrt/vehicles')
feed.ParseFromString(response.content)
for entity in feed.entity:
    if entity.vehicle.trip.route_id == 'RIBS1':
        print(entity.vehicle.position)
