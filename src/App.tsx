import { Redirect, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import {
  DashboardPage,
  CustomersPage,
  OrdersPage,
  InventoryPage,
} from "./pages";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={ROUTES.main} />} />
        <Route exact path={ROUTES.main} component={DashboardPage} />
        <Route exact path={ROUTES.orders} component={OrdersPage} />
        <Route exact path={ROUTES.customers} component={CustomersPage} />
        <Route exact path={ROUTES.inventory} component={InventoryPage} />
      </Switch>
    </Layout>
  );
}

var GtfsRealtimeBindings = require('gtfs-realtime-bindings');

async function fetchGtfsrt() {
  let response = await fetch('/gtfsrt/vehicles', {
    method: 'GET'
  });

  // console.log('response =')
  let buffer = await response.arrayBuffer();
  buffer = new Uint8Array(buffer);
  console.log('buffer = ')
  console.log(buffer instanceof Uint8Array || Array.isArray(buffer))
  console.log(buffer)
  var feed = await GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
  return feed;

    // .then(response => {
    //   console.log('body = ')
    //   console.log(response.blob())
    //   let feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(response);
    //   // feed.entity.forEach(function (entity: any) {
    //   //   if (entity.trip_update) {
    //   //     console.log(entity.trip_update);
    //   //   }
    //   // });
  
    //   return feed;
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
}

let feed = fetchGtfsrt()

export default App;
