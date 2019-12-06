import React from "react";

import Player from "../classes/player";

import AddPlayerForm from "./addPlayerForm";

import {deletePlayer} from "../utils/databaseAPIHandler";

import "./playerAdmin.css";

interface Props {
    registeredPlayers: Player[];
    playersInTheGame: Player[];
    parentSetState(newState: any): void;
    fetchPlayers(): void;
}

class PlayerAdmin extends React.Component<Props, {}> {

    render() {

        return <React.Fragment>
            {this.renderPlayersNotInTheGame()}

            {this.renderPlayerlistInTheGame()}

            <AddPlayerForm {... this.props}/>


            {this.renderPlayerlistDeletionPanel()}
        </React.Fragment>
    }

    private renderPlayersNotInTheGame(): JSX.Element {

        const notInTheGame: Player[] = this.props.registeredPlayers
            .filter((playerElement: Player) =>
                !this.props.playersInTheGame
                    .find((playerElementInner => playerElementInner.getID() == playerElement.getID())));

        return <div>{this.renderPlayerlist(notInTheGame, "Nicht teilnehmende Spieler", (player: Player) => this.addToGame(player))}</div>;
    }

    private renderPlayerlistInTheGame(): JSX.Element {

        return <div>
            {this.renderPlayerlist(
                this.props.playersInTheGame,
                "Teilnehmende Spieler",
                (player:Player) =>
                    {this.removeFromGame(player)})}
        </div>;
    }

    private renderPlayerlistDeletionPanel(): JSX.Element {
        return <div>
            {this.renderPlayerlist(
                    this.props.registeredPlayers,
                    "Lösche Spieler von der Datenbank",
                    (player: Player) =>
                        {this.removePlayerFromDatabase(player)})}
        </div>;
    }

    private renderPlayerlist(players: Player[], heading: string, callback: (player: Player) => any): JSX.Element {
        const playerList: JSX.Element[] = [];


        players.forEach((player: Player) => {
            playerList.push(<tr key = {player.getID()} ><td className="playerEntry" onClick={() => callback(player)} > {player.getName()} </td></tr>);
        });

        return <table>
            <thead>
                <tr><th>{heading}</th></tr>
            </thead>
            <tbody>
                {playerList}
            </tbody>
        </table>;
    }

    private removePlayerFromDatabase(player: Player): void {
        deletePlayer(player.getID());
        const registeredPlayers = this.props.registeredPlayers.filter((playerElement: Player) => playerElement.getID() !== player.getID());
        const playersInTheGame = this.props.playersInTheGame
          .filter((playerElement: Player) => playerElement.getID() !== player.getID())

        this.props.parentSetState({registeredPlayers, playersInTheGame});
    }

    private removeFromGame(player:Player): void {
        const playersInTheGame = this.props.playersInTheGame.slice().filter((playerElement: Player) => playerElement.getID() !== player.getID());

        console.log(playersInTheGame);
        this.props.parentSetState({playersInTheGame: playersInTheGame});
    }

    private addToGame(player:Player): void {
        if(this.props.playersInTheGame.find((playerElement: Player) => playerElement.getID() === player.getID())) {
            return;
        }

        const playersInTheGame = this.props.playersInTheGame.slice();
        playersInTheGame.push(player);
        this.props.parentSetState({playersInTheGame});
    }
}



export default PlayerAdmin;
