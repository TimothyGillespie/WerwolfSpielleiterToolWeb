import React from "react";

import Player from "../classes/player";

import AddPlayerForm from "./addPlayerForm";

import {deletePlayer} from "../utils/databaseAPIHandler";

interface Props {
    registeredPlayers: Player[];
    playersInTheGame: Player[];
    parentSetState(newState: any): void;
}

class PlayerAdmin extends React.Component<Props, {}> {

    render() {

        return <React.Fragment>
            {this.renderPlayersNotInTheGame()}

            {this.renderPlayerlistInTheGame()}

            <AddPlayerForm parentSetState={(newState) => this.setState(newState)}/>
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
            playerList.push(<tr key = {player.getID()} ><td className="playerEntry" onClick={() => this.tableClickHandler(player.getID())}>{player.getName()}</td></tr>);
        });

        return <table>
            <thead>
                <tr><th>Nicht teilnehmende Spieler</th></tr>
            </thead>
            <tbody>
                {playerList}
            </tbody>
        </table>;
    }

    private tableClickHandler(playerID: number): void {
        deletePlayer(playerID);
        const registeredPlayers = this.props.registeredPlayers.filter((player: Player) => player.getID() !== playerID);
        this.props.parentSetState({registeredPlayers: registeredPlayers});
    }

}



export default PlayerAdmin;
