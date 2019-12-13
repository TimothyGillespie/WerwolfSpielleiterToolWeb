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
        return <div>
            {this.renderGoodPotionUsageOptions()}
            <br />
            {this.renderBadPotionUsageOptions()}
            <br />
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>
    }


    private renderGoodPotionUsageOptions(): JSX.Element {
        if(this.props.hexeGoodPotionAvailable) {
            return renderPlayerList(
                setToArray(this.props.diesTonight),
                "Will she save one who is die?",
                (player: Player) => {
                    const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                    diesTonight.delete(player);
                    this.props.parentSetState({diesTonight, hexeGoodPotionAvailable: false});
                }
            );
        }


        return <div>(Die Hexe hat ihren guten Trank schon genutzt.)</div>;
    }


    private renderBadPotionUsageOptions(): JSX.Element {
        if(this.props.hexeBadPotionAvailable) {
            return renderPlayerList(
                difference(
                    getAlivePlayers(this.props.playersInTheGame),
                    setToArray(this.props.diesTonight).concat(getAlivePlayersOfRole(this.props.playersInTheGame, Role.HX))
                ),
                "Or is she out kill as well?",
                (player: Player) => {
                    const diesTonight: Set<Player> = new Set<Player>(this.props.diesTonight);
                    diesTonight.add(player);
                    this.props.parentSetState({diesTonight, hexeBadPotionAvailable: false});
                }
            )
        }

        return <div>(Die Hexe hat ihren tödlichen Trank schon genutzt.)</div>;

    }

}

export default HexeUsesPotions;
