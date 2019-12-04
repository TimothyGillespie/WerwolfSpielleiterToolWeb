import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Player from "./classes/player";

import Navigation from "./components/navigation";
import Welcome from "./components/welcome";
import PlayerAdmin from "./components/playerAdmin";

import {fetchPlayers} from "./utils/databaseAPIHandler";

interface MasterState {
    registeredPlayers: Player[];
    playersInTheGame: Player[];

}

class App extends React.Component<{}, MasterState> {

    state = {
        registeredPlayers: [],
        playersInTheGame: [],
    }

    async componentDidMount() {
        const registeredPlayersJSON: any = await fetchPlayers();
        const registeredPlayers: Player[] = [];
        registeredPlayersJSON.forEach((player: any) =>  {
            registeredPlayers.push(new Player(player));
        });


        this.setState({registeredPlayers});
    }

    render() {

        console.log(this.state.registeredPlayers);
      return (
        <div className="App">
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/players">
                        <PlayerAdmin parentForceUpdate = {() => this.forceUpdate.bind(this)} {...this.state} />
                    </Route>
                </Switch>
            </Router>
        </div>
      );
  }
}

export default App;
