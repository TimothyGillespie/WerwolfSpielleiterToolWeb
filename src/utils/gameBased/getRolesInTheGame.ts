import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

function getRolesInTheGame(playersInTheGame: Map<Player, Status>): Set<Role>{

    const result: Set<Role> = new Set<Role>();

    playersInTheGame.forEach((status : Status, player: Player) =>  {
      result.add(status.role);
    })


    return result;

}

export default getRolesInTheGame;
