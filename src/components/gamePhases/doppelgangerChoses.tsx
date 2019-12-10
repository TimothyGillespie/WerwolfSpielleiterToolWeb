import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getPeopleOfRole from "../../utils/gameBased/getPeopleOfRole";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";
import changePlayerRole from "../../utils/gameBased/changePlayerRole";

interface StateI {
    chose: boolean;
}

class DoppelgangerChoses extends React.Component<GamePhasePropsI, StateI> {

    state = {chose: false};

    render() {
        console.log(getPeopleOfRole(this.props.playersInTheGame, Role.D));
        if(this.state.chose) {
            return <div><button onClick={() => this.props.nextPhase()}>Weiter</button></div>;
        } else if(getPeopleOfRole(this.props.playersInTheGame, Role.D).length === 0){
            return <div>{this.renderPickDoppelganger()}</div>
        } else {
            return <div>{this.renderChoice()}</div>;
        }

    }


    private renderChoice(): JSX.Element {
        const choices: Player[] = difference(
            mapKeysToArray(this.props.playersInTheGame),
            getPeopleOfRole(this.props.playersInTheGame, Role.D)
        );

        return renderPlayerList(
            choices,
            "Wen wird der Doppelgänger kopieren?",
            (player: Player) => {
                this.props.parentSetState({doppelgangerCopies: player});
                this.setState({chose: true});
            }
        );

    }

    private renderPickDoppelganger(): JSX.Element {
        return renderPlayerList(
            // The role Dorfbewohner is the default one, so it can be assumed that people with no role are dorfbewohner
            getPeopleOfRole(this.props.playersInTheGame, Role.DB),
            "Wer ist der Doppelgänger?",
            (player: Player) => {
                changePlayerRole(this.props.playersInTheGame, player,  Role.D);
                this.props.parentSetState({});
            }
        );
    }

}

export default DoppelgangerChoses;
