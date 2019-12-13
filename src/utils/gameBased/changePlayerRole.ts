import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

function changePlayerRole(playersInTheGame: Map<Player, Status>, player: Player, newRole: Role): void {
    playersInTheGame.set(
        player,
        new Status(newRole)
    );
}

export default changePlayerRole;
