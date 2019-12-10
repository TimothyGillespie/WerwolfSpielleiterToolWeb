// This is pretty much a slightly changed version of the Hexe

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

class MagierUsesPotions extends React.Component<GamePhasePropsI> {

    render() {
        return <div>
            {this.renderPotionUsageOptions()}
            <br />
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>
    }


    private renderPotionUsageOptions(): JSX.Element[] {
        const output: JSX.Element[] = [];

        if(this.props.magierGoodPotionAvailable) {
            output.push(
                renderPlayerList(
                    setToArray(this.props.diesTonight),
                    "Will he save one who is die?",
                    (player: Player) => {
                        const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                        diesTonight.delete(player);
                        this.props.parentSetState({diesTonight, magierGoodPotionAvailable: false});
                    }
                )
            );
        } else {
            output.push(<div>(Der Magier hat seinen guten Trank schon genutzt.)</div>);
        }

        if(this.props.magierBadPotionAvailable) {
            output.push(
                renderPlayerList(
                    difference(
                        getAlivePlayers(this.props.playersInTheGame),
                        setToArray(this.props.diesTonight).concat(getAlivePlayersOfRole(this.props.playersInTheGame, Role.HX))
                    ),
                    "Or is he out kill as well?",
                    (player: Player) => {
                        const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                        diesTonight.add(player);
                        this.props.parentSetState({diesTonight, magierBadPotionAvailable: false});
                    }
                )
            );
        } else {
            output.push(<div>(Der Magier hat seinen tödlichen Trank schon genutzt.)</div>);
        }


        return output;
    }

}

export default MagierUsesPotions;
