import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

import getPlayersRole from "./getPlayersRole";

// A fraction is just a string with it's name. The map then maps to a set of Roles belonging to it's faction's name.
const factionMembership: Map<Set<Role>, string> = new Map<Set<Role>, string>();
const evil: Set<Role> = new Set<Role>([Role.W, Role.WJ, Role.EW, Role.UW]);

function getPlayersFaction(playersInTheGame: Map<Player, Status>, player: Player): string {
    const playerRole: Role | undefined = getPlayersRole(playersInTheGame, player);

    if(!playerRole) {
        console.log("Error in getPlayersFaction");
        return "An error occured.";
    }

    factionMembership.forEach((faction: string, memberRoles: Set<Role>) => {
        if(memberRoles.has(playerRole))
            return faction;
    });

    // Most characters are good so this will be the default faction. Otherwise many have to be mapped.
    return "Gut";

}

export default getPlayersFaction;
