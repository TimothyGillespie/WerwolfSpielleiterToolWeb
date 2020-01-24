import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";
import Status from "../../classes/status";

import getAlivePlayersOfRole from "./getAlivePlayersOfRole";
import getAliveRoles from "./getAliveRoles";

//// TODO: setze richtige ROllen!!!

// Rollen, die Übersprungen werden
const spoilSkipable:Set<Role> = new Set([Role.A]);

//Rollen nach Config im Spiel
const rolesInTheGame:Set<Role> = new Set([Role.DB]);

function generalSkip (playersInTheGame : Map<Player, Status>, possibleRoles : Set <Role>, nextPhase:()=>void, role: Role) : JSX.Element {
    if (rolesInTheGame.has(role)) {
      if (getAlivePlayersOfRole(playersInTheGame, role).length > 0) { //Rolle ist noch am Leben?
        //normal anzeigen!
        return <React.Fragment/>;
      } else {
        //Rolle ist tot
        if (spoilSkipable.has(role)){
          //Rolle kann übersprungen werden
          nextPhase();
          return <React.Fragment/>;
        } else {
          // Rolle sollte vielleicht nicht übersprungen werden. könnte ja Doppelgängerin im spiel sein!
          if (getAliveRoles(playersInTheGame).has(Role.D)){
            //Doppelgängerin lebt noch! könnt also spoilern
            return <input type = "button" onClick = {() => nextPhase()}>weiter</input>;
          } else {
            nextPhase();
            return <React.Fragment/>;
          }
        }
      }
    } else {
      // Die Rolle gibts es garnicht im Spiel!
      nextPhase();
      return <React.Fragment/>;
    }
  return <React.Fragment/>;
}
export default generalSkip;
