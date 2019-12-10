import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getPeopleOfRole from "../../utils/gameBased/getPeopleOfRole";
import changePlayerRole from "../../utils/gameBased/changePlayerRole";


class WerwolvesSeeEachOther extends React.Component<GamePhasePropsI> {


    render() {
        return <div>
            Die Werwölfe wachen auf.
            {this.renderPickWerwolves()}
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>;
    }

    private renderPickWerwolves(): JSX.Element {
        return renderPlayerList(
            getPeopleOfRole(this.props.playersInTheGame, Role.DB),
            "Wer ist ein Werwolf?",
            (player: Player) => {
                changePlayerRole(this.props.playersInTheGame, player, Role.W);
                this.props.parentSetState({});
            }
        );
    }
}

export default WerwolvesSeeEachOther;
