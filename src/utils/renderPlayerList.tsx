import React from "react";

import Player from "../classes/player";

function renderPlayerList(players: Player[], heading: string, callback: (player: Player) => any): JSX.Element {
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

export default renderPlayerList;
