import React from 'react';
import ReactDOM from 'react-dom';

import Status from "../../classes/status";
import Player from "../../classes/player";
import Role from "../../classes/role";

import GameStartScreen from "./gameStartScreen";

import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

interface PropsI extends GamePhasePropsI {
    parentSetState(newState: any): void;
    playersInTheGame: Map<Player, Status>;
    upcomingGamePhases: React.ComponentType<GamePhasePropsI>[];
}

class Game extends React.Component<PropsI, {}> {

    private currentPhase: React.ComponentType<GamePhasePropsI> = GameStartScreen;

    render() {

        const firstElement = this.props.upcomingGamePhases[0];

        if(firstElement) {
            this.currentPhase = this.props.upcomingGamePhases[0];
        }
        
        return <div>

        {< this.currentPhase {...this.props} />}

        </div>;
    }


}

export default Game;
