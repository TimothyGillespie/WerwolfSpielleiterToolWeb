const apiAddress: string = "https://userpages.uni-koblenz.de/~tigill/interfaces/werwolfAPI.php";

// These don't decode the status from the API itself, but the handler status. Should maybe be changed though.
enum APIStatus {
    NothingExpected = "",
    Processing = "Working ...",
    DuplicateError = "This player already exists.",
    SuccessfullyAdded = "The player has been added successfully!",
    EmptyInputError = "You need to enter a name.",
    UnexpectedBehavior = "An unexpected behavior occured.",
    NegativeIDError = "The player ID cannot be negative."

}

async function createPlayer(newPlayerName: String): Promise<APIStatus> {

    if(newPlayerName == "") {
        return APIStatus.EmptyInputError;
    }

    const body = "action=create&newPlayerName=" + newPlayerName;

    const response = await fetch(apiAddress, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        "method": "POST",
        body
    })

    const responseText: String = await response.text();

    switch(responseText) {
        case "Success!": {
            return APIStatus.SuccessfullyAdded;
        }
        case "Should not be empty.": {
            return APIStatus.EmptyInputError;
        }
        default: {
            if(responseText.startsWith("Error:Duplicate entry"))
                return APIStatus.DuplicateError;

            return APIStatus.UnexpectedBehavior;

        }
    }


}

export {APIStatus, createPlayer};
