import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";


function getAliveWerwolves(playersInTheGame: Map<Player, Status>): Player[] {

    const result: Player[] = [];
    const werwolveRoles: Set<Role> = new Set<Role>();

    // Could possibly be externalized
    werwolveRoles.add(Role.W);
    werwolveRoles.add(Role.EW);
    werwolveRoles.add(Role.UW);
    werwolveRoles.add(Role.WJ);

    playersInTheGame.forEach((status : Status, player: Player) =>  {
        if(werwolveRoles.has(status.role) && status.alive)
            result.push(player);
    })


    return result;

}

export default getAliveWerwolves;
