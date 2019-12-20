import React from "react";

import UpdateParentI from "./updateParentInterface";

import Player from "../classes/player";
import Status from "../classes/status";
import Role from "../classes/role";

import getRolesInTheGame from "../utils/gameBased/getRolesInTheGame";

interface PropsI extends UpdateParentI {
  possibleRoles : Set<Role>;
  playersInTheGame : Map<Player, Status>;
}

class Settings extends React.Component<PropsI, {}> {
  render(){

    return <div>
      <button onClick = {()=> this.assignDynamically()}>Automatisch</button> <br/>
      {this.renderCheckboxes()}
    </div>;
  }

  private renderCheckboxes() : JSX.Element[]  {
    const listOfCheckboxes : JSX.Element[] = [];
    for(let item in Role) {
      listOfCheckboxes.push(
        <div>
          <input
            type = "checkbox"
            //@ts-ignore
            onChange={() => this.changeHandler(Role[item])}
            //@ts-ignore
            checked={this.props.possibleRoles.has(Role[item])}
          /> {item}
        </div>
      );
    }

    return listOfCheckboxes;
  }

  private changeHandler(role : Role) : void {
    const copy = new Set<Role>(this.props.possibleRoles);
    if(copy.has(role)) {
      copy.delete(role);
    } else {
      copy.add(role);
    }
    this.props.parentSetState({possibleRoles: copy});
  }

  private assignDynamically() : void {
    const automation: Set<Role> = getRolesInTheGame(this.props.playersInTheGame);
    this.props.parentSetState({possibleRoles: automation});
  }

}

export default Settings;
