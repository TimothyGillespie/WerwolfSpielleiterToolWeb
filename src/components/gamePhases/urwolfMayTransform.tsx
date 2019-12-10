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

class UrwolfMayTransform extends React.Component<GamePhasePropsI> {

    render() {


        // Implement:
        // will it transform if leibwächter protects?
        // set variable to true meaning it transformed
        // Skip to next step if this variable is true
        // Yes and No button
        // It is possible for the werwolves to kill many players
        return <div>
            Will {getAlivePlayersOfRole(this.props.playersInTheGame, Role.UW)[0].getName()} transform the werwolves prey {this.props.diesTonight[0]}?

        </div>;
    }


}

export default UrwolfMayTransform;
