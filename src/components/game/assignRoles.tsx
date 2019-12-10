import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "../gamePhases/gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getPeopleOfRole from "../../utils/gameBased/getPeopleOfRole";
import changePlayerRole from "../../utils/gameBased/changePlayerRole";

interface StateI {
    selectedPlayer: Player | null;
}

class AssignRoles extends React.Component<GamePhasePropsI, StateI> {

    state = {selectedPlayer: null};

    render() {

        if(this.state.selectedPlayer)
            return <div>
                {this.renderRoleSelection()}
            </div>;
        else
            return <div>
                {this.renderRoleList()}
            </div>;
    }

    // Sadly there are issues with enums which I couldn't solve nicely now so it will show the name of the enum but not it's assigned string
    private renderRoleList(): JSX.Element[] {
        const listOfLists: JSX.Element[] = [];
        for(let item in Role) {
            listOfLists.push(
                renderPlayerList(
                    getPeopleOfRole(
                        this.props.playersInTheGame,
                        //@ts-ignore
                        Role[item]
                    ),
                    item,
                    (player: Player) => { this.setState({selectedPlayer: player}) })
                );
        }


        return listOfLists;
    }

    // same issues as with renderRoleList
    private renderRoleSelection(): JSX.Element[] {
        const listOfButtons: JSX.Element[] = [];
        for(let item in Role) {
            listOfButtons.push(
                <button

                    onClick= {() => {
                        //@ts-ignore
                        changePlayerRole(this.props.playersInTheGame, this.state.selectedPlayer!, Role[item]);
                        this.setState({selectedPlayer: null});
                        this.props.parentSetState({});

                        }
                    }
                >
                {item}
                </button>
            )
        }

        return listOfButtons;

    }

}

export default AssignRoles;
