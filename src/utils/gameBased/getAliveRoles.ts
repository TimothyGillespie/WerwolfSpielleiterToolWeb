import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

function getAliveRoles(playersInTheGame: Map<Player, Status>): Set<Role>{

    const result: Set<Role> = new Set<Role>();

    playersInTheGame.forEach((status : Status, player: Player) =>  {
        if(status.alive)
            result.add(status.role);
    })


    return result;

}

export default getAliveRoles;
