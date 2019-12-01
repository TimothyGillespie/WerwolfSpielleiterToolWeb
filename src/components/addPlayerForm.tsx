import React from "react";

import UpdateParentI from "./updateParentInterface";

enum APIStatus {
    NothingExpected = "",
    Processing = "Working ...",
    DuplicateError = "This player already exists",
    SuccessfullyAdded = "The player has been added successfully!",
    EmptyError = "You need to enter a name",
    UnexpectedBehavior = "An unexpected behavior occured.",

}

interface StateI {
    playerName: String;
    processingStatus: APIStatus;
}

class AddPlayerForm extends React.Component<UpdateParentI, StateI> {
    state = {playerName: "", processingStatus: APIStatus.NothingExpected};
    apiAddress: string = "https://userpages.uni-koblenz.de/~tigill/interfaces/werwolfAPI.php";

    render() {
        return(
            <React.Fragment>
                <input type="text" value={this.state.playerName} onChange={(ev: React.FormEvent<HTMLInputElement>) => this.setState({playerName: ev.currentTarget.value, processingStatus: APIStatus.NothingExpected})} />
                <button onClick={() => this.createPlayer()}>Erstellen</button><br/><br/>
                {this.displayPlayerCreationFeedback()}
            </React.Fragment>
        )
    }


    private async createPlayer(): Promise<void> {

        if(this.state.playerName == "") {
            this.setState({processingStatus: APIStatus.EmptyError});
            return;
        }

        const body = "newPlayerName=" + this.state.playerName;
        this.setState({processingStatus: APIStatus.Processing});

        const response = await fetch(this.apiAddress, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            "method": "POST",
            body
        })

        const responseText: String = await response.text();

        switch(responseText) {
            case "Success!": {
                this.setState({processingStatus: APIStatus.SuccessfullyAdded});
                break;
            }
            case "Should not be non-empty.": {
                this.setState({processingStatus: APIStatus.EmptyError})
                break;
            }
            default: {
                if(responseText.startsWith("Error:Duplicate entry"))
                    this.setState({processingStatus: APIStatus.DuplicateError});
                else
                    this.setState({processingStatus: APIStatus.UnexpectedBehavior});

                break;
            }
        }


    }

    private displayPlayerCreationFeedback(): JSX.Element {
        return <React.Fragment>{this.state.processingStatus}</React.Fragment>;
    }

}

export default AddPlayerForm;
