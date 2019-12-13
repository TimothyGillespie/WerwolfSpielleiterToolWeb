import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";


function getAlivePlayersOfRole(playersInTheGame: Map<Player, Status>, role: Role): Player[] {

    const result: Player[] = [];

    playersInTheGame.forEach((status : Status, player: Player) =>  {
        if(status.role === role && status.alive)
            result.push(player);
    })


    return result;

}

export default getAlivePlayersOfRole;
