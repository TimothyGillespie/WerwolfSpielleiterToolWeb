<?php

header("Access-Control-Allow-Origin: *");

$action = $_POST["action"];

$playername = $_POST["newPlayerName"];
$playerID = $_POST["playerID"];


if($action == "create" and $playername == "") {
	echo "Should not be empty.";
	break;
} elseif ($action == "delete" and $playerID < 0) {
	echo "Player IDs cannot be negative.";
	break;
}




$con = mysqli_connect("dbAddress", "dbUser", "userPwd", "tablename");

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

if($action == "create") {
	$stmt = $con->prepare("INSERT INTO players (name) VALUES (?)");
	$stmt->bind_param('s', $playername);
} else if($action == "delete") {
	$stmt = $con->prepare("DELETE FROM players WHERE playerID=?");
	$stmt->bind_param('i', $playerID);
} else if($action == "fetch") {

	$SQL = "SELECT * FROM players ORDER BY playerID ASC;";
	$i = 0;
	$result = $con->query($SQL);
	$output = array(array());

	//CSV Head
	echo "playerID,name\n";

	while($row = $result->fetch_assoc()) {
		echo $row["playerID"];
		echo ",";
		echo $row["name"];
		echo "\n";
		$i++;
	}

	break;


} else {
	break;
}


if ($stmt->execute() === TRUE) {
    echo "Success!";
} else {
    echo "Error:". $con->error;
}


?>
