import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

//// TODO: setze richtige ROllen!!!
const nonSpoilSkipable:Set<Role> = new Set([Role.DB]);

function generalSkip (plyersInTheGame : Map<Player, Status>, possibleRoles : Set <Role>, nextPhase:()=>void, role: Role) : JSX.Element {
  if (nonSpoilSkipable.has(role)) {
    //// TODO: 
    return <React.Fragment/>;
  } else {
    nextPhase();
    return <React.Fragment/>;
  }
}
export default generalSkip;
