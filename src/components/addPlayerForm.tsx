import React from "react";

import UpdateParentI from "./updateParentInterface";

interface StateI {
    playerName: String;
    playerExistsAlready: boolean;
}

class AddPlayerForm extends React.Component<UpdateParentI, StateI> {
    state = {playerName: "", playerExistsAlready: false};

    render() {
        return(
            <React.Fragment>
                <input type="text" value={this.state.playerName} onChange={(ev: React.FormEvent<HTMLInputElement>) => this.setState({playerName: ev.currentTarget.value})} />
                <button onClick={(_: any) => this.createPlayer()}>Erstellen</button><br/><br/>
                {this.displayPlayerExistsError()}
            </React.Fragment>
        )
    }


    private createPlayer(): void {
        const playerName: String = this.state.playerName;

        //Check if playerName exists in database.

        //If yes display an error (by setting an error variable to true)
        this.setState({playerExistsAlready: true});
    }

    private displayPlayerExistsError(): JSX.Element {
        if(this.state.playerExistsAlready) {
            return <div className="errorMsg"> Player {this.state.playerName} exists already</div>;
        }

        // Empty return
        return <React.Fragment />;
    }

}

export default AddPlayerForm;
