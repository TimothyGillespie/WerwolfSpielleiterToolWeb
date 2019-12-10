import React from "react";

import Player from "../classes/player";
import Role from "../classes/role";
import Status from "../classes/status";

import AddPlayerForm from "./addPlayerForm";

import {deletePlayer} from "../utils/databaseAPIHandler";
import cloneMap from "../utils/cloneMap";

import "./playerAdmin.css";

interface PropsI {
    registeredPlayers: Player[];
    playersInTheGame: Map<Player, Status>;
    parentSetState(newState: any): void;
    fetchPlayers(): void;
}

interface StateI {
    listPlayersInTheGame: Player[];
}

class PlayerAdmin extends React.Component<PropsI, StateI> {

    constructor(props: PropsI) {
        super(props);

        const listPlayersInTheGame: Player[] = [];
        this.props.playersInTheGame.forEach((_, player: Player) =>  listPlayersInTheGame.push(player));

        this.state = {listPlayersInTheGame};

    }

    render() {

        return <React.Fragment>
            {this.renderPlayersNotInTheGame()}

            {this.renderPlayerlistInTheGame()}

            <AddPlayerForm {... this.props}/>


            {this.renderPlayerlistDeletionPanel()}
        </React.Fragment>
    }

    // This should probably be replaced by a memoization technique as recommended by the react developers
    // The unsafeness of this life-cycle function requires the async function calls below
    UNSAFE_componentWillReceiveProps() {
        const listPlayersInTheGame: Player[] = [];
        this.props.playersInTheGame.forEach((_, player: Player) =>  listPlayersInTheGame.push(player));

        this.setState({listPlayersInTheGame});
    }

    private renderPlayersNotInTheGame(): JSX.Element {
        const playersInTheGameList: Player[] = [];

        this.props.playersInTheGame.forEach((_, player: Player) =>  playersInTheGameList.push(player));

        const notInTheGame: Player[] = this.props.registeredPlayers
            .filter((playerElement: Player) =>
                !this.state.listPlayersInTheGame
                    .find((playerElementInner: Player) => playerElementInner.getID() === playerElement.getID()));

        return <div>{this.renderPlayerlist(notInTheGame, "Nicht teilnehmende Spieler", (player: Player) => this.addToGame(player))}</div>;
    }

    private renderPlayerlistInTheGame(): JSX.Element {

        return <div>
            {this.renderPlayerlist(
                this.state.listPlayersInTheGame,
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

    private async removePlayerFromDatabase(player: Player): Promise<void> {
        deletePlayer(player.getID());
        const registeredPlayers = this.props.registeredPlayers.filter((playerElement: Player) => playerElement.getID() !== player.getID());
        const playersInTheGame = this.state.listPlayersInTheGame
          .filter((playerElement: Player) => playerElement.getID() !== player.getID())

        // I am not quiet sure on why it behaves this way, but the next await is necessary to gurantee a proper rendering.
        // It seems passing in the new value won't update the children. So it is waiting until the update is done and
        // triggers a refresh by doing an empty update.
        await this.props.parentSetState({registeredPlayers, playersInTheGame});
        this.props.parentSetState({});
    }

    private async removeFromGame(player:Player): Promise<void> {
        const clonedMap = cloneMap(this.props.playersInTheGame);
        clonedMap.delete(player);

        // See "removePlayerFromDatabase()"
        await this.props.parentSetState({playersInTheGame: clonedMap});
        this.props.parentSetState({});
    }

    private async addToGame(player:Player): Promise<void> {
        const playersInTheGame: Map<Player, Status> = new Map(this.props.playersInTheGame);
        playersInTheGame.set(player, new Status(Role.DB));

        // See "removePlayerFromDatabase()"
        await this.props.parentSetState({playersInTheGame});
        this.props.parentSetState({playersInTheGame});

        // Insider easter egg
        if(player.getName() === "Lars")
            alert("Ups, der ist schon tot.");
    }
}

export default PlayerAdmin;
