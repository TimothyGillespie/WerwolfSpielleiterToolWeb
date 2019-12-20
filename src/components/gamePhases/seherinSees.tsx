import React from "react";

import GamePhasePropsI from "./gamePhaseInterface";

import renderPlayerList from "../../utils/renderPlayerList";

import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";
import getAlivePlayers from "../../utils/gameBased/getAlivePlayers";
import getPlayersFaction from "../../utils/gameBased/getPlayersFaction";

import difference from "../../utils/arrayHandling/difference";

import Role from "../../classes/role";
import Player from "../../classes/player";

import "./seherinSees.css";

interface StateI {
    showRole: null | string;
}

class SeherinSees extends React.Component<GamePhasePropsI, StateI> {

    state = {showRole: null};
    private seherin: Player[] = getAlivePlayersOfRole(this.props.playersInTheGame, Role.S);

    render() {

        if(this.state.showRole)
            return <div>
                <div id="roleName">{this.state.showRole}</div>
                <button onClick={() => this.props.nextPhase()}>Weiter</button>
            </div>

        return <div>
            Die Seherin/Seherlehring darf sehen.
            {this.renderSeher()}
            {this.renderPlayersToSee()}
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>
    }


    private renderSeher(): JSX.Element {
        return renderPlayerList(
            this.seherin,
            "Die Seherin",
            () => {}
        );
    }

    private renderPlayersToSee(): JSX.Element {
        return renderPlayerList(
            difference(getAlivePlayers(this.props.playersInTheGame), this.seherin),
            "Wenn will die Seherin sehen?",
            (player: Player) => {
                const playersRole: string = getPlayersFaction(this.props.playersInTheGame, player)!;
                this.setState({showRole: playersRole});
            }
        );
    }
}

export default SeherinSees;
