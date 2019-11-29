    import React from "react";

import Player from "../classes/player";

import AddPlayerForm from "./addPlayerForm";

interface Props {
    playersInTheGame: Player[];
    allPlayers: Player[];
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

        // Lists all players not in the game. When clicked on, it will add to the game


        return <div></div>;
    }

    private renderPlayerlistInTheGame(): JSX.Element {

        //List all players in the game. When clicked on it, will remove the player from the game.

        return <div></div>;
    }

}

export default PlayerAdmin;
