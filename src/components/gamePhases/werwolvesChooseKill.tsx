import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";
import getAlivePlayers from "../../utils/gameBased/getAlivePlayers";
import getAliveWerwolves from "../../utils/gameBased/getAliveWerwolves";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";

class WerwolvesChooseKill extends React.Component<GamePhasePropsI> {

    render() {

        return <div>
            {renderPlayerList(
                getAliveWerwolves(this.props.playersInTheGame),
                "Diese Spieler dürfen sehen und wählen",
                // No function since this is purely for game master to check
                () =>  {}
            )}

            {renderPlayerList(
                difference(
                    getAlivePlayers(this.props.playersInTheGame),
                    getAliveWerwolves(this.props.playersInTheGame)
                ),
                "Wenn werden Sie wählen?",
                (player: Player) => {
                    const diesTonight = this.props.diesTonight.slice();
                    diesTonight.push(player);
                    this.props.parentSetState({diesTonight});
                    //Wolfsjungen dies check and mechanic implementation
                    this.props.nextPhase();
                }

            )}
        </div>;
    }


}

export default WerwolvesChooseKill;
