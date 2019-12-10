import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getAlivePlayers from "../../utils/gameBased/getAlivePlayers";
import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";
import setToArray from "../../utils/setToArray";

class HexeUsesPotions extends React.Component<GamePhasePropsI> {

    render() {

        // Needs to implement the use of the two hexe variables
        return <div>
            {renderPlayerList(
                setToArray(this.props.diesTonight),
                "Will she save one who is die?",
                (player: Player) => {
                    const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                    diesTonight.delete(player);
                    this.props.parentSetState({diesTonight, hexeGoodPotionAvailable: false});
                }
            )}

            {renderPlayerList(
                difference(
                    getAlivePlayers(this.props.playersInTheGame),
                    setToArray(this.props.diesTonight).concat(getAlivePlayersOfRole(this.props.playersInTheGame, Role.HX))
                ),
                "Or is she out kill as well? .. or perhaps both?",
                (player: Player) => {
                    const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                    diesTonight.add(player);
                    this.props.parentSetState({diesTonight, hexeBadPotionAvailable: false});
                }
            )}
            <br />
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>
    }

}

export default HexeUsesPotions;
