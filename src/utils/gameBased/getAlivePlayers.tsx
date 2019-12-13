import Player from "../../classes/player";
import Status from "../../classes/status";


function getAlivePlayers(playersInTheGame: Map<Player, Status>): Player[] {

    const result: Player[] = [];

    playersInTheGame.forEach((status : Status, player: Player) =>  {
        if(status.alive)
            result.push(player);
    })


    return result;

}

export default getAlivePlayers;
