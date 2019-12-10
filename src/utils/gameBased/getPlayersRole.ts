import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

function getPlayersRole(playersInTheGame: Map<Player, Status>, player: Player): Role | undefined {
    return playersInTheGame.get(player)?.role;
}

export default getPlayersRole;
