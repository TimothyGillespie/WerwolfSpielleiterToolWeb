import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";


class LeibwachterProtects extends React.Component<GamePhasePropsI, {}> {

    render() {
        return <div>
            Wenn wird der Leibwächter {(getAlivePlayersOfRole(this.props.playersInTheGame, Role.L)[0]).getName()} diese Nacht schützen?
            <br />
            {this.renderWhoCantBeProtected()}
            <br />
            <br />
            {renderPlayerList(
                difference(
                    mapKeysToArray(this.props.playersInTheGame),
                    //protectedThisNight is here now the last night
                    getAlivePlayersOfRole(this.props.playersInTheGame, Role.L).concat(this.props.protectedThisNight || [])
                ),
                "Wähle weise Leibwächter",
                (player: Player) => {
                    this.props.parentSetState({protectedThisNight: player});
                    this.props.nextPhase();
                }
            )}
        </div>
    }


    private renderWhoCantBeProtected(): JSX.Element {
        // In this situation it refers to last night
        if(this.props.protectedThisNight)
            return <div>Er hat letzte nacht {this.props.protectedThisNight} geschützt und kann diese Person nicht nochmal schützen.</div>; 

        return <React.Fragment></React.Fragment>;
    }

}

export default LeibwachterProtects;
