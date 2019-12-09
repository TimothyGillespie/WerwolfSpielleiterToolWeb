import React from 'react';
import ReactDOM from 'react-dom';

import Status from "../../classes/status";
import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

interface PropsI extends GamePhasePropsI {
    parentSetState(newState: any): void;
    playersInTheGame: Map<Player, Status>;
    upcomingGamePhases: React.ComponentType<GamePhasePropsI>;
}

class Game extends React.Component<PropsI, {}> {

    render() {
        return <div>

        {<this.props.upcomingGamePhases {...this.props} />}

        </div>;
    }


}

export default Game;
