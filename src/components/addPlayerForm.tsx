import React from "react";

import {APIStatus, createPlayer} from "../utils/databaseAPIHandler";

import UpdateParentI from "./updateParentInterface";

interface PropsI extends UpdateParentI {
    fetchPlayers(): void;
}

interface StateI {
    playerName: String;
    processingStatus: APIStatus;
    players: string;
}

class AddPlayerForm extends React.Component<PropsI, StateI> {

    constructor(props: any) {
        super(props);

        this.state = {playerName: "", processingStatus: APIStatus.NothingExpected, players: ""};

    }

    render() {
        return(
            <React.Fragment>
                <input type="text" value={String(this.state.playerName)} onChange={(ev: React.FormEvent<HTMLInputElement>) => this.setState({playerName: ev.currentTarget.value, processingStatus: APIStatus.NothingExpected})} />
                <button onClick={async () => {await this.callCreateAPI(); this.setState({playerName: ""})}}>Erstellen</button><br/><br/>
                {this.displayPlayerCreationFeedback()}
            </React.Fragment>
        )
    }

    private async callCreateAPI() {
        this.setState({processingStatus: APIStatus.Processing});
        const newStatus: APIStatus = await createPlayer(this.state.playerName);
        if(newStatus == APIStatus.SuccessfullyAdded) {
            this.props.fetchPlayers();
        }

        this.setState({processingStatus: newStatus});
    }


    private displayPlayerCreationFeedback(): JSX.Element {
        return <React.Fragment>{this.state.processingStatus}</React.Fragment>;
    }

}

export default AddPlayerForm;
