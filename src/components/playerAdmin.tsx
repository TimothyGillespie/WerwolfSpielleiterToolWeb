import React from "react";

import Player from "../classes/player";

import AddPlayerForm from "./addPlayerForm";

import {deletePlayer} from "../utils/databaseAPIHandler";

interface Props {
    registeredPlayers: Player[];
    playersInTheGame: Player[];
    parentForceUpdate(): void;
}

class PlayerAdmin extends React.Component<Props, {}> {

    render() {

        return <React.Fragment>
            {this.renderPlayersNotInTheGame()}

            {this.renderPlayerlistInTheGame()}

            <AddPlayerForm updateParent={this.setState}/>
        </React.Fragment>
    }

    private renderPlayersNotInTheGame(): JSX.Element {


        return <div>{this.renderPlayerlist(this.props.registeredPlayers)}</div>;
    }

    private renderPlayerlistInTheGame(): JSX.Element {

        //List all players in the game. When clicked on it, will remove the player from the game.

        return <div></div>;
    }

    private renderPlayerlist(players: Player[]): JSX.Element {
        const playerList: JSX.Element[] = [];


        players.forEach((player: Player) => {
            playerList.push(<tr><td className="playerEntry" onClick={() => this.tableClickHandler(player.getID())}>{player.getName()}</td></tr>);
        });

        return <table>
            <th><td>Nicht teilnehmende Spieler</td></th>
            {playerList}
        </table>;
    }

    private tableClickHandler(playerID: number): void {
        deletePlayer(playerID);
        this.props.parentForceUpdate();
    }

}



export default PlayerAdmin;
