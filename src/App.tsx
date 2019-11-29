import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navigation from "./components/navigation";
import Welcome from "./components/welcome";
import PlayerAdmin from "./components/playerAdmin";

const App: React.FC = () => {

  return (
    <div className="App">
        <Router>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/players" component={PlayerAdmin} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
