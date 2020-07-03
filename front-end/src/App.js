import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

//Routes
// ....
import routes from './config/routes';

//Components
// ....
import AdminHome from './pages/Admin';


function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouterWithSub key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

// Routes Config
// ....

function RouterWithSub(route) {
  return (
    <Route 
      path = {route.path}
      exact = {route.exact}
      render = {props => <route.component routes={route.routes} {...props}/>}
    />
  )
}

export default App;
