import React from "react";

import {APIStatus, createPlayer} from "../utils/databaseAPIHandler";

import UpdateParentI from "./updateParentInterface";

interface StateI {
    playerName: String;
    processingStatus: APIStatus;
}

class AddPlayerForm extends React.Component<UpdateParentI, StateI> {
    state = {playerName: "", processingStatus: APIStatus.NothingExpected};

    render() {
        return(
            <React.Fragment>
                <input type="text" value={this.state.playerName} onChange={(ev: React.FormEvent<HTMLInputElement>) => this.setState({playerName: ev.currentTarget.value, processingStatus: APIStatus.NothingExpected})} />
                <button onClick={() => this.callCreateAPI()}>Erstellen</button><br/><br/>
                {this.displayPlayerCreationFeedback()}
            </React.Fragment>
        )
    }

    private async callCreateAPI() {
        this.setState({processingStatus: APIStatus.Processing});
        const newStatus: APIStatus = await createPlayer(this.state.playerName);
        this.setState({processingStatus: newStatus});
    }


    private displayPlayerCreationFeedback(): JSX.Element {
        return <React.Fragment>{this.state.processingStatus}</React.Fragment>;
    }

}

export default AddPlayerForm;
