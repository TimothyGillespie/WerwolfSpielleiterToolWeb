import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Player from "./classes/player";
import Status from "./classes/status";

import GamePhasePropsI from "./components/gamePhases/gamePhaseInterface";


import Navigation from "./components/navigation";
import Welcome from "./components/welcome";
import PlayerAdmin from "./components/playerAdmin";
import Game from "./components/game/game";

import {fetchPlayers} from "./utils/databaseAPIHandler";

interface MasterState {
    registeredPlayers: Player[];
    playersInTheGame: Map<Player, Status>;
    upcomingGamePhases: React.ComponentType<GamePhasePropsI>[];

}

class App extends React.Component<{}, MasterState> {

    state = {
        registeredPlayers: [],
        playersInTheGame: new Map<Player, Status>(),
        upcomingGamePhases: [],

        // Game variables
        turnCounter: 0,
        liebende: [],
        mussRaus: null,
        protectedThisNight: null,
        priesterProtected: null,
        prinz: null,
        unruheGestifted: false,

        rostigeLanzeRevengeNextNight: false,
        harterBurscheDiesNextNight: false,
        aussaetzigerGetsRoleNextNight: false,
        oldmanDiedOnce: false,

        // Hexentränke
        hexeGoodPotionAvailable: false,
        hexeBadPotionAvailable: false,

        //Magiertränke
        magierGoodPotionAvailable: false,
        magierBadPotionAvailable: false,
    }

    async componentDidMount() {
        await this.fetchPlayers();
    }

    render() {

      return (
        <div className="App">
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/players">
                        <PlayerAdmin fetchPlayers={() => this.fetchPlayers()} parentSetState = {(newState: any) => this.setState(newState)} {...this.state} />
                    </Route>
                    <Route path="/game">
                        <Game parentSetState={(newState: any) => this.setState(newState)} nextPhase={() => this.nextPhase()} {...this.state}/>
                    </Route>
                </Switch>
            </Router>
        </div>
      );
  }

  private async fetchPlayers() {
      const registeredPlayersJSON: any = await fetchPlayers();
      const registeredPlayers: Player[] = [];
      registeredPlayersJSON.forEach((player: any) =>  {
          registeredPlayers.push(new Player(player));
      });

      this.setState({registeredPlayers});
  }

  private nextPhase(): void {
      const cut: React.ComponentType<GamePhasePropsI>[] = this.state.upcomingGamePhases.slice(1);
      this.setState({upcomingGamePhases: cut});
  }

}

export default App;
