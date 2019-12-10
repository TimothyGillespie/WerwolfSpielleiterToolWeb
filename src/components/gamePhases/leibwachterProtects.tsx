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
            Wenn wird der Leibwächter {(getAlivePlayersOfRole(this.props.playersInTheGame, Role.L)[0]).getName()}?
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

}

export default LeibwachterProtects;
