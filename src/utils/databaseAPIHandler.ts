const apiAddress: string = "https://userpages.uni-koblenz.de/~tigill/interfaces/werwolfAPI.php";

// These don't decode the status from the API itself, but the handler status. Should maybe be changed though.
enum APIStatus {
    // Special cases
    NothingExpected = "",
    Processing = "Working ...",
    UnexpectedBehavior = "An unexpected behavior occured.",

    // Success
    SuccessfullyAdded = "The player has been added successfully!",
    SuccessfullyRemoved = "The player has been successfully removed!",

    // Adding player errors
    DuplicateError = "This player already exists.",
    EmptyInputError = "You need to enter a name.",

    // Deleting player errors
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
    });

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

async function deletePlayer(playerID: number): Promise<APIStatus> {

    if(playerID < 0) {
        return APIStatus.NegativeIDError;
    }

    const body = "action=delete&playerID=" + playerID;

    const response = await fetch(apiAddress, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        "method": "POST",
        body
    });

    const responseText: String = await response.text();

    switch(responseText) {
        case "Success!": {
            return APIStatus.SuccessfullyRemoved;
        }
        case "Player IDs cannot be negative.": {
            return APIStatus.NegativeIDError;
        }
        default: {
            return APIStatus.UnexpectedBehavior;
        }
    }


}

// This would be handy if it could return a JSON later.
async function fetchPlayers(): Promise<JSON> {

    const body = "action=fetch";

    const response = await fetch(apiAddress, {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        "method": "POST",
        body
    });

    const csv: string = await response.text();

    return csvToJSON(csv);
}

// This doesn't work as inteded yet it seems.
// Source: http://techslides.com/convert-csv-to-json-in-javascript
function csvToJSON(csv: string): JSON {

  var lines = csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj: any = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  return JSON.parse(JSON.stringify(result));
}


export {APIStatus, createPlayer, deletePlayer, fetchPlayers};
