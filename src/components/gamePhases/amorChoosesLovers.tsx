import React from "react";

import Player from "../../classes/player";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";


class AmorChoosesLovers extends React.Component<GamePhasePropsI, {}> {


    render() {
        if(this.props.liebende.length >= 2) {
            return <div>
                {renderPlayerList(this.props.liebende, "Die Liebenden", () => {})}
                <button onClick={() => this.props.nextPhase()}>Nächste Runde </button>
            </div>
        } else {
            return <div>{this.renderPlayersWithoutLiebende()}</div>
        }
    }

    private renderPlayersWithoutLiebende(): JSX.Element {
        const playersWithoutLiebende: Player[] = difference(mapKeysToArray(this.props.playersInTheGame), this.props.liebende);
        // fill the above variable
        const liebendeClone = this.props.liebende.slice();
        return renderPlayerList(
            playersWithoutLiebende,
            "Wähle die Liebenden Amor",
            (player: Player) => {
                liebendeClone.push(player);
                this.props.parentSetState({liebende: liebendeClone});
            }
        );
    }
}

export default AmorChoosesLovers;
