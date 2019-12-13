import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";

class AlteVettelChasesOff extends React.Component<GamePhasePropsI> {

    render() {
        return <div>
            Wenn wird die alte Vettel für die Nacht vertreiben?
            <br />
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>;

    }

}

export default AlteVettelChasesOff;
